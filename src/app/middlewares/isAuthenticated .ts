import jwt from '@/helpers/jwt';
import { Request, Response, NextFunction } from 'express';
import jsonwebtoken from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
    user?: any;
}

// Middleware para verificar si el usuario está autenticado
export const isAuthenticated = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
) => {
    const token = req.cookies.authToken || req.headers['authorization'];

    if (!token) {
        return res
            .status(401)
            .json({ message: 'Authentication token is missing' });
    }

    try {
        const decoded = jsonwebtoken.verify(
            token,
            process.env.JWT_SECRET as string,
        );
        // const { iat, exp, ...user } = decoded
        req.user = decoded;
        console.log(decoded)
        // req.user = user;
        // console.log(req.user)
        const newToken = await jwt({ userId: req.user.userId, roleId: req.user.roleId });
        res.cookie('authToken', newToken, {
            httpOnly: true,
            expires: new Date(Date.now() + 3 * 60 * 1000),
        });
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};
