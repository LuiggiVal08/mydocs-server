import { Request, Response } from 'express';
import models from '@/app/models';
import jwt from '@/helpers/jwt';
import jwtAuth from 'jsonwebtoken';
import { comparePassword } from '@/helpers/crypto';
import handdleErrorsController from '@/helpers/handdleErrorsController';
import { z } from 'zod';
import { JWT_SECRET, NODE_ENV } from '@/constants';
import logger from '@/config/logger';

const schemaLogin = z.object({
    username: z.string().min(4, { message: 'El nombre de usuario debe tener al menos 4 caracteres' }),
    password: z.string().min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
});

class Auth {
    static async loginAdmin(req: Request, res: Response): Promise<void> {
        const parsed = schemaLogin.safeParse(req.body);
        if (!parsed.success) {
            return void res.status(400).json({ message: parsed.error.message, error: parsed.error });
        }
        const { username, password } = parsed.data;

        try {
            const user = await models.User.findOne({
                where: { username },
                include: [{ model: models.Administrator, include: [models.Role] }],
            });

            if (!user || !user.dataValues.administrator) {
                return void res.status(401).json({ message: 'Credenciales incorrectas o no eres administrador' });
            }

            const valid = await comparePassword(password, user.password);
            if (!valid) {
                return void res.status(401).json({ message: 'Contraseña incorrecta' });
            }

            const tokenExpiration = Date.now() + 15 * 60 * 1000; // Expira en 15 minutos
            const token = await jwt({ id: user.id, role: user.dataValues.administrator.dataValues.role.id }, 'access');
            logger.info(`Token: ${token}`);
            await models.Session.create({ userId: user.id, ip: req.ip, device: req.headers['user-agent'] });

            res.cookie('token', token, {
                httpOnly: true,
                expires: new Date(tokenExpiration),
                secure: NODE_ENV === 'production',
                sameSite: 'strict',
            });
            return void res
                .status(200)
                .json({ message: 'Administrador autenticado', data: { tokenExpiration, token, user } });
        } catch (error) {
            handdleErrorsController(error, res, req);
        }
    }

    static async loginStudent(req: Request, res: Response): Promise<void> {
        const parsed = schemaLogin.safeParse(req.body);
        if (!parsed.success) {
            return void res.status(400).json({ message: parsed.error.message, error: parsed.error });
        }
        const { username, password } = parsed.data;

        try {
            const user = await models.User.findOne({
                where: { username },
                include: [{ model: models.Student }],
            });

            if (!user || !user.student) {
                return void res.status(401).json({ message: 'Credenciales incorrectas o no eres estudiante' });
            }

            const valid = await comparePassword(password, user.password);
            if (!valid) {
                return void res.status(401).json({ message: 'Contraseña incorrecta' });
            }

            const token = jwt({ id: user.id, role: 'student' }, 'access');
            await models.Session.create({
                userId: user.id,
                ip: req.ip,
                device: req.headers['user-agent'],
            });

            res.cookie('token', token, { httpOnly: true, maxAge: 15 * 60 * 1000 }); // 15 min para estudiantes
            return void res.status(200).json({ message: 'Estudiante autenticado', data: { token, user } });
        } catch (error) {
            handdleErrorsController(error, res, req);
        }
    }

    static async logout(req: Request, res: Response): Promise<void> {
        const token = req.cookies?.token;
        try {
            const { id } = jwtAuth.verify(token, JWT_SECRET) as { id: string };
            await models.Session.update({ status: false, end: new Date() }, { where: { userId: id } });
            if (!token) {
                return void res.status(401).json({ message: 'No hay token' });
            }
            res.clearCookie('token');
            return void res.status(200).json({ message: 'Token eliminado' });
        } catch (error) {
            logger.error(error);
            handdleErrorsController(error, res, req);
        }
    }
}
export default Auth;
