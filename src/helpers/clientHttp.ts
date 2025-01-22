type HttpResponse<T> = Promise<T>;

interface HttpClient {
    get<T>(endpoint: string, params?: Record<string, any>): HttpResponse<T>;
    post<T>(endpoint: string, body?: Record<string, any>): HttpResponse<T>;
    put<T>(endpoint: string, body?: Record<string, any>): HttpResponse<T>;
    delete<T>(endpoint: string): HttpResponse<T>;
    cancel: () => void;
}

type Interceptor = (config: RequestInit) => RequestInit | Promise<RequestInit>;

const handleResponse = async (response: Response) => {
    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: response.statusText }));
        throw new Error(error.message || `Error ${response.status}`);
    }
    return response.json();
};

const withTimeout = (promise: Promise<any>, timeout: number): Promise<any> => {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => reject(new Error('Request timed out')), timeout);
        promise
            .then(resolve)
            .catch(reject)
            .finally(() => clearTimeout(timer));
    });
};

const retryRequest = async (fn: () => Promise<any>, retries = 3, delay = 1000): Promise<any> => {
    try {
        return await fn();
    } catch (error) {
        if (retries <= 0) {
            throw error;
        }
        await new Promise((res) => setTimeout(res, delay));
        return retryRequest(fn, retries - 1, delay);
    }
};

const createHttpClient = (
    baseURL: string,
    defaultHeaders: Record<string, string> = {},
    interceptors: Interceptor[] = [],
    timeout = 5000,
): HttpClient => {
    const controller = new AbortController();

    const applyInterceptors = async (config: RequestInit): Promise<RequestInit> => {
        let modifiedConfig = { ...config };
        for (const interceptor of interceptors) {
            modifiedConfig = await interceptor(modifiedConfig);
        }
        return modifiedConfig;
    };

    const client = {
        async get<T>(endpoint: string, params: Record<string, any> = {}): HttpResponse<T> {
            const url = new URL(baseURL + endpoint);
            Object.entries(params).forEach(([key, value]) => {
                url.searchParams.append(key, String(value));
            });
            const config: RequestInit = {
                method: 'GET',
                headers: { ...defaultHeaders },
                signal: controller.signal,
            };
            const interceptedConfig = await applyInterceptors(config);

            return retryRequest(() =>
                withTimeout(fetch(url.toString(), interceptedConfig).then(handleResponse), timeout),
            );
        },

        async post<T>(endpoint: string, body: Record<string, any> = {}): HttpResponse<T> {
            const config: RequestInit = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...defaultHeaders,
                },
                body: JSON.stringify(body),
                signal: controller.signal,
            };
            const interceptedConfig = await applyInterceptors(config);

            return retryRequest(() =>
                withTimeout(fetch(baseURL + endpoint, interceptedConfig).then(handleResponse), timeout),
            );
        },

        async put<T>(endpoint: string, body: Record<string, any> = {}): HttpResponse<T> {
            const config: RequestInit = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    ...defaultHeaders,
                },
                body: JSON.stringify(body),
                signal: controller.signal,
            };
            const interceptedConfig = await applyInterceptors(config);

            return retryRequest(() =>
                withTimeout(fetch(baseURL + endpoint, interceptedConfig).then(handleResponse), timeout),
            );
        },

        async delete<T>(endpoint: string): HttpResponse<T> {
            const config: RequestInit = {
                method: 'DELETE',
                headers: { ...defaultHeaders },
                signal: controller.signal,
            };
            const interceptedConfig = await applyInterceptors(config);

            return retryRequest(() =>
                withTimeout(fetch(baseURL + endpoint, interceptedConfig).then(handleResponse), timeout),
            );
        },

        cancel() {
            controller.abort();
        },
    };

    return new Proxy(client, {
        get(target, prop: string) {
            if (!(prop in target)) {
                throw new Error(`Method ${prop} is not implemented`);
            }
            return target[prop as keyof HttpClient];
        },

        set() {
            throw new Error('HTTP Client methods cannot be modified');
        },
    });
};

export default createHttpClient;
