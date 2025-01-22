import type { AuthenticatedRequest } from '@/types/auth';
import type { Response, NextFunction } from 'express';
import models from '@/app/models';

/**
 * Middleware para validar los roles de usuario.
 * @param allowedRoles - Array de roles permitidos.
 * @returns Middleware que valida los roles de usuario.
 */

const authorizeRoles =
    (allowedRoles: string[]) =>
    /**
     * Middleware para validar los roles de usuario.
     * @param {AuthenticatedRequest} req - Objeto de solicitud HTTP.
     * @param {Response} res - Objeto de respuesta HTTP.
     * @param {NextFunction} next - Función de middleware para pasar el control al siguiente middleware.
     */
    async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        try {
            const userRole = await models.Role.findByPk(req.user.roleId);
            const roleName = userRole.dataValues.name.toLocaleLowerCase();
            allowedRoles = allowedRoles.map((role) => role.toLowerCase());
            if (!allowedRoles.includes(roleName)) {
                res.status(403).json({ message: 'Acceso denegado: No tienes permiso para realizar esta acción' });
            }
            next();
        } catch (error) {
            res.status(500).json({ message: 'Error al validar el rol del usuario', error });
        }
    };
export default authorizeRoles;
