import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { APP_SECRET, NODE_ENV } from '@/constants';

const TOKEN_SECRET = APP_SECRET;

const createCsrfToken = (): string => crypto.randomBytes(32).toString('hex');

const hashToken = (token: string): string => crypto.createHmac('sha256', TOKEN_SECRET).update(token).digest('hex');

const addCsrfCookies = (res: Response) => {
    const csrfToken = createCsrfToken();
    const csrfTokenHash = hashToken(csrfToken);

    res.cookie('s_tk', csrfTokenHash, {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
    });

    res.cookie('s_tkc', csrfToken, {
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
    });
};

interface CSRFOptions {
    excludedRoutes?: string[];
}

/**
 * Custom CSRF Middleware
 * @param options Opciones de configuración del middleware
 * @returns Middleware para Express
 */
const csrf = ({ excludedRoutes = [] }: CSRFOptions = {}) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        // if () {
        //     return void next();
        // }
        if (excludedRoutes.includes(req.path) || NODE_ENV === 'test') {
            return void next();
        }

        if (req.method === 'GET') {
            addCsrfCookies(res);
            return void next();
        }

        if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
            const csrfTokenClient = req.headers['x-csrf-token'] as string;
            const csrfTokenServer = req.cookies['s_tk'];

            if (!csrfTokenClient || !csrfTokenServer) {
                return void res.status(403).json({ error: 'Missing CSRF token' });
            }

            const csrfTokenClientHash = hashToken(csrfTokenClient);
            if (csrfTokenClientHash !== csrfTokenServer) {
                return void res.status(403).json({ error: 'Invalid CSRF token' });
            }

            addCsrfCookies(res);
            return void next();
        }

        next();
    };
};

export default csrf;
