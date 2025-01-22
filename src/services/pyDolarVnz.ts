import createHttpClient from '@/helpers/clientHttp';

const urlBase = 'https://pydolarve.org';
const urlXtends = `${urlBase}/api/v1`;

export const client = createHttpClient(urlXtends);

interface CurrencyData {
    name: string;
    change: number;
    color: string;
    image: string;
    last_update: string;
    percent: number;
    price: number;
    price_old: number;
    symbol: string;
    title: string;
}
interface params {
    page: 'bcv' | 'alcambio' | 'criptodolar' | 'dolartody' | 'enparalelovzla' | 'italcambio';
    monitor: string;
    format_date: 'iso' | 'timestamp' | 'default';
    rounded_price: boolean;
}

export const queryValueCurrencies = (currency: 'dollar' | 'euro', params?: params) => {
    return client.get<CurrencyData>(`/${currency}`, {
        format_date: 'default',
        monitor: 'bcv',
        rounded_price: true,
        ...params,
    });
};
