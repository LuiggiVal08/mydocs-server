import jwt from '@/helpers/jwt';
import { Response, NextFunction } from 'express';
import { AuthenticatedRequest, JwtPayloadUserReq } from '@/types/auth';
import jsonwebtoken from 'jsonwebtoken';

// Middleware para verificar si el usuario está autenticado
export const isAuthenticated = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    const token = req.cookies.authToken || req.headers['authorization'];
    if (!token) {
        console.log({ token });
        res.status(401).json({ message: 'Authentication token is missing' });
        return; // Solo coloca `return` para evitar continuar con el código
    }

    try {
        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET as string);

        if (typeof decoded !== 'object' || decoded === null) {
            console.log({ decoded });
            res.status(401).json({ message: 'Invalid token format' });
            return;
        }

        const expirationTime = Date.now() + 15 * 60 * 1000; // Expira en 15 minutos
        const { iat, exp, ...user } = decoded as JwtPayloadUserReq;

        req.user = { iat, exp, ...user };
        req.tokenExpiration = expirationTime;

        const newToken = await jwt({
            userId: req.user.userId,
            roleId: req.user.roleId,
        });

        res.cookie('authToken', newToken, {
            httpOnly: true,
            expires: new Date(expirationTime),
        });

        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid or expired token' + err });
    }
};
