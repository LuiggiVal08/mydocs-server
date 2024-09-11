import { Request, Response, NextFunction } from 'express';
import Admin from '../models/admin'; // Asegúrate de ajustar la ruta según tu estructura de proyecto
import User from '../models/user';

interface AuthenticatedRequest extends Request {
    user?: any;
}

// Middleware para verificar si el usuario es administrador
export const isAdmin = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
) => {
    try {
        if (!req.user) {
            return res
                .status(403)
                .json({ message: 'User information is missing' });
        }
        const user = await User.findOne({ where: { id: req.user.userId } });


        if (!user) {
            return res.status(403).json({ message: 'user not found' });
        } else {
            const admin = await Admin.findOne({ where: { user_id: user.dataValues.id } });
            if (!admin) {
                return res.status(403).json({ message: 'User is not an admin' });
            }
        }

        next();
    } catch (error) {
        console.error(`Error in isAdmin middleware: ${error}`);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
