import jwt from '@/helpers/jwt';
import { Response, NextFunction } from 'express';
import { AuthenticatedRequest, JwtPayloadUserReq } from '@/types/auth';
import jsonwebtoken from 'jsonwebtoken';

// Middleware para verificar si el usuario está autenticado
export const isAuthenticated = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    // Obtener el token de las cookies o headers
    const token = req.cookies.authToken || req.headers['authorization'];

    console.log({ token, cookie: req.cookies });
    if (!token) {
        return res.status(401).json({ message: 'Authentication token is missing' });
    }

    try {
        // Verificar el token con la clave secreta
        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET as string);

        // Verificar si el token decodificado es un objeto
        if (typeof decoded !== 'object' && decoded === null) {
            return res.status(401).json({ message: 'Invalid token format' });
        }
        const expirationTime = Date.now() + 15 * 60 * 1000; // Expira en 15 minutos

        const { iat, exp, ...user } = decoded as JwtPayloadUserReq;

        // Asignar el usuario decodificado al request
        req.user = { iat, exp, ...user };
        req.tokenExpiration = expirationTime;

        if (!req.user) {
            return res.status(401).json({ message: 'Invalid token format' });
        }
        // Guardar la expiración en el request

        // Generar un nuevo token
        const newToken = await jwt({
            userId: req.user.userId,
            roleId: req.user.roleId,
        });

        // Establecer la cookie con el nuevo token
        res.cookie('authToken', newToken, {
            httpOnly: true,
            expires: new Date(expirationTime),
        });

        // Pasar al siguiente middleware o ruta
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};
