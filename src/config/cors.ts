import { crossOrigin } from '@/constants';

export const corsConfig = {
    origin(requestOrigin: string, callback: (error: Error | null, allow?: boolean) => void) {
        const ACCEPTED_ORIGINS = crossOrigin;
        if (!requestOrigin || requestOrigin === 'file://' || requestOrigin === undefined) {
            return callback(null, true); // Permitir acceso
        } else if (ACCEPTED_ORIGINS.includes(requestOrigin)) {
            return callback(null, true); // Permitir acceso si el origen es aceptado
        } else {
            return callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};
