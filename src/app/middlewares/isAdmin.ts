import type { Response, NextFunction } from 'express';
import type { AuthenticatedRequest } from '@/types/auth';

// Middleware para verificar si el usuario es administrador
export const isAdmin = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            res.status(403).json({ message: 'User information is missing' });
        }
        // const user = await User.findOne({ where: { id: req.user.userId } }); // Verificar si el usuario existe en la base de datos

        // if (!user) {
        //     res.status(403).json({ message: 'user not found' });
        // } else {
        //     const admin = await Admin.findOne({
        //         where: { user_id: user.dataValues.id },
        //     });
        //     if (!admin) {
        //         res.status(403).json({ message: 'User is not an admin' });
        //     }
        // }

        next();
    } catch (error) {
        res.status(500).json({ message: `Internal Server Error ${error}` });
    }
};
