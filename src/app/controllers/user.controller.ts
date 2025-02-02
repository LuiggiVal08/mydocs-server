import type { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import models from '@/app/models';
import handdleErrorsController from '@/helpers/handdleErrorsController';
import crypto from 'node:crypto';
import transporter, { htmlContainer, htmlToken } from '@/config/nodemailer';
import { MailOptions } from 'nodemailer/lib/json-transport';
import { MAIL, NAME_APP } from '@/constants';
import { UserCreationAttributes } from '@/app/models/User';

const UserSchema = z.object({
    id: z.string().optional(),
    municipalityId: z.string(),
    dni: z.string(),
    name: z.string().min(3),
    lastName: z.string().min(3),
    username: z.string(),
    password: z.string().min(8).max(16),
    email: z.string().email(),
    phone: z.string(),
    address: z.string(),
    gender: z.enum(['Masculino', 'Femenino']),
    dateOfBirth: z.date(),
    avatar: z.string().optional(),
});

const UserCreateSchema = UserSchema.omit({ username: true, password: true });
const UserRegisterSchema = UserSchema.pick({ username: true, password: true }).extend({ token: z.string() });

class User {
    static async getAll(req: Request, res: Response) {
        try {
            const { page = 1, limit = 10 } = req.query;
            const pageNumber = parseInt(page as string, 10);
            const limitNumber = parseInt(limit as string, 10);
            const offset = (pageNumber - 1) * limitNumber;
            const { count, rows } = await models.User.findAndCountAll({ limit: limitNumber, offset: offset });

            const totalPages = Math.ceil(count / limitNumber);
            res.status(200).json({
                data: {
                    users: rows,
                    pagination: {
                        currentPage: pageNumber,
                        totalPages: totalPages,
                        totalItems: count,
                        itemsPerPage: limitNumber,
                    },
                },
            });
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

        const parsed = UserCreateSchema.safeParse({ ...body, dateOfBirth: new Date(body.dateOfBirth) });
        if (!parsed.success) {
            return void res.status(400).json({ message: parsed.error.message });
        }

        try {
            const municipio = await models.Municipality.findByPk(parsed.data.municipalityId);
            if (!municipio) {
                return void res.status(404).json({ message: 'Municipio no encontrado' });
            }

            const { email, dni, phone, name, lastName, gender, address, dateOfBirth } = parsed.data;

            const [emailExist, dniExist, phoneExist] = await Promise.all([
                models.User.findOne({ where: { email } }),
                models.User.findOne({ where: { dni } }),
                models.User.findOne({ where: { phone } }),
            ]);

            if (emailExist) {
                return void res.status(400).json({ message: 'El correo ya está en uso' });
            }
            if (dniExist) {
                return void res.status(400).json({ message: 'El DNI ya está en uso' });
            }
            if (phoneExist) {
                return void res.status(400).json({ message: 'El teléfono ya está en uso' });
            }

            const dataUser: UserCreationAttributes = {
                username: null,
                password: null,
                name,
                lastName,
                email,
                dni,
                gender,
                phone,
                address,
                municipalityId: municipio.dataValues.id,
                dateOfBirth,
            };

            const user = await models.User.create(dataUser);

            req.body.userId = user.dataValues.id;

            const token = crypto.randomBytes(4).toString('hex');

            await models.Token.create({
                token,
                userId: user.dataValues.id,
                expiration: new Date(Date.now() + 86400000),
            });
            try {
                const subject = 'Verificación de correo electrónico';

                const opotionMail: MailOptions = {
                    from: `${NAME_APP} <${MAIL.MAIL_FROM_EMAIL}>`,
                    to: user.dataValues.email,
                    priority: 'high',
                    subject,
                    html: htmlToken(user.dataValues.email, token, subject),
                };
                await transporter.sendMail(opotionMail);
            } catch (error) {
                return void res.status(500).json({ message: 'Error al enviar correo de verificación', error });
            }
            nex();
        } catch (error) {
            return handdleErrorsController(error, res, req);
        }
    }

    static async register(req: Request, res: Response): Promise<void> {
        const parsed = UserRegisterSchema.safeParse(req.body);
        if (!parsed.success) {
            return void res.status(400).json({ message: 'Datos inválidos', error: parsed.error.format() });
        }

        const { token, username, password } = parsed.data;

        try {
            const tokenEntry = await models.Token.findOne({
                where: { token, used: false },
                include: [models.User], // Incluye el usuario para evitar otra consulta
            });

            if (!tokenEntry || new Date(tokenEntry.expiration) < new Date()) {
                return void res.status(400).json({ message: 'Token inválido o expirado' });
            }

            if (!tokenEntry.dataValues.user) {
                return void res.status(404).json({ message: 'Usuario no encontrado' });
            }

            const usernameExist = await models.User.findOne({ where: { username } });
            if (usernameExist) {
                return void res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
            }

            await tokenEntry.update({ used: true });
            const user = await models.User.findOne({ where: { id: tokenEntry?.dataValues.user.id } });
            await user.update({ username, password });
            await user.save();
            const to = user?.dataValues.email;
            try {
                const subject = 'Bienvenido a MyDocs, registro exitoso';
                const opotionMail: MailOptions = {
                    from: `${NAME_APP} <${MAIL.MAIL_FROM_EMAIL}>`,
                    to,
                    subject,
                    priority: 'high',
                    html: htmlContainer(
                        `
                        <main style="font-size: 1rem">
                        <p>¡Bienvenido, ${username}!</p>
                        <p>Gracias por registrarte en nuestra plataforma. Estamos emocionados de tenerte a bordo.</p>
                        <p>Para empezar, asegúrate de completar tu perfil y explorar todas nuestras funciones.</p>
                        <p>Si no te registraste en nuestra plataforma, ignora este mensaje.</p>
                        </main>
                        `,
                        to,
                        subject,
                    ),
                };
                await transporter.sendMail(opotionMail);
            } catch (error) {
                return void res.status(500).json({ message: 'Error al enviar correo de Bienvenida', error });
            }

            return void res.status(200).json({ message: 'Registro completado correctamente' });
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
