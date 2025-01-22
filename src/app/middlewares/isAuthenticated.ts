import jwt from '@/helpers/jwt';
import type { Response, NextFunction, Request } from 'express';
import type {} from /* AuthenticatedRequest, */ /* JwtPayloadUserReq */ '@/types/auth';
import jsonwebtoken, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET, NODE_ENV } from '@/constants';

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const expirationTime = Date.now() + 15 * 60 * 1000; // Expira en 15 minutos
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return void res.status(401).json({ message: 'Authentication token is missing' });
    }

    try {
        const decoded = jsonwebtoken.verify(token, JWT_SECRET);
        const { iat, exp, ...user } = decoded as JwtPayload;
        const newToken = await jwt(user, 'access');

        // req.user = { iat, exp, ...user };
        // req.tokenExpiration = expirationTime;

        res.cookie('authToken', newToken, {
            httpOnly: true,
            expires: new Date(expirationTime),
            secure: NODE_ENV === 'production',
            sameSite: 'strict',
        });

        res.setHeader('Authorization', `Bearer ${newToken}`);
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid or expired token' + err });
    }
};
