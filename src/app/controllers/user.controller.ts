import type { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import models from '@/app/models';
import handdleErrorsController from '@/helpers/handdleErrorsController';

const UserSchema = z.object({
    id: z.string().optional(),
    municipalityId: z.string(),
    dni: z.string(),
    name: z.string(),
    lastName: z.string(),
    username: z.string(),
    email: z.string().email(),
    phone: z.string(),
    password: z.string(),
    address: z.string(),
    gender: z.enum(['Masculino', 'Femenino']),
    dateOfBirth: z.date(),
    avatar: z.string().optional(),
});

class User {
    static async getAll(req: Request, res: Response) {
        try {
            const users = await models.User.findAll();
            res.status(200).json({ data: { users } });
        } catch (error) {
            return handdleErrorsController(error, res, req);
        }
    }
    static async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const user = await models.User.findByPk(id);
            if (!user) {
                res.status(404).json({ message: 'Usuario no encontrado' });
                return;
            }
            res.status(200).json({ data: { user } });
        } catch (error) {
            return handdleErrorsController(error, res, req);
        }
    }
    /**
     * Middleware para crear un nuevo usuario.
     * @param req - Objeto de solicitud HTTP.
     * @param res - Objeto de respuesta HTTP.
     * @param next - Función de middleware para pasar el control al siguiente middleware.
     */
    static async create(req: Request, res: Response, nex: NextFunction): Promise<void> {
        const { body } = req;

        const parsed = UserSchema.safeParse({ ...body, dateOfBirth: new Date(body.dateOfBirth) });
        if (!parsed.success) {
            return void res.status(400).json({ message: parsed.error.message });
        }

        try {
            const municipio = await models.Municipality.findByPk(parsed.data.municipalityId);
            if (!municipio) {
                return void res.status(404).json({ message: 'Municipio no encontrado' });
            }
            // const user = parsed.data;
            const { email, username, dni, phone, name, lastName, gender, address, password, dateOfBirth } = parsed.data;

            // Validación de duplicados
            const [emailExist, usernameExist, dniExist, phoneExist] = await Promise.all([
                models.User.findOne({ where: { email } }),
                models.User.findOne({ where: { username } }),
                models.User.findOne({ where: { dni } }),
                models.User.findOne({ where: { phone } }),
            ]);

            if (emailExist) {
                return void res.status(400).json({ message: 'El correo ya está en uso' });
            }
            if (usernameExist) {
                return void res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
            }
            if (dniExist) {
                return void res.status(400).json({ message: 'El DNI ya está en uso' });
            }
            if (phoneExist) {
                return void res.status(400).json({ message: 'El teléfono ya está en uso' });
            }
            const newUser = await models.User.create({
                name,
                lastName,
                username,
                email,
                gender,
                dni,
                address,
                phone,
                municipalityId: municipio.dataValues.id,
                password,
                dateOfBirth,
            });
            req.body.userId = newUser.dataValues.id;
            nex();
        } catch (error) {
            return handdleErrorsController(error, res, req);
        }
    }

    static async update(req: Request, res: Response): Promise<void> {
        try {
            const idUser = req.params.id;
            const { body } = req;
            const user = await models.User.findByPk(idUser);
            if (!user) {
                return void res.status(404).json({ message: 'Usuario no encontrado' });
            }
            const parsed = UserSchema.safeParse({ ...body, dateOfBirth: new Date(body.dateOfBirth) });
            if (!parsed.success) {
                return void res.status(400).json({ message: 'Datos inválidos', errors: parsed.error.format() });
            }
            const municipio = await models.Municipality.findByPk(parsed.data.municipalityId);
            if (!municipio) {
                res.status(404).json({ message: 'Municipio no encontrado' });
                return;
            }
            await user.update(parsed.data);
            res.status(200).json({ data: { user } });
        } catch (error) {
            return handdleErrorsController(error, res, req);
        }
    }
    static async delete(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const user = await models.User.findByPk(id);
            if (!user) {
                return void res.status(404).json({ message: 'Usuario no encontrado' });
            }
            await user.destroy();
            return void res.status(200).json({ message: 'Usuario eliminado' });
        } catch (error) {
            return handdleErrorsController(error, res, req);
        }
    }
}
export default User;
