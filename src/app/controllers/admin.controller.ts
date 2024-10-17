import { Response, Request } from 'express';
import User, { UserInput } from '@/app/models/user';
import Role from '@/app/models/role';
import Admin from '@/app/models/admin';
import dbConn from '@/config/dbConn';
import jwt from '@/helpers/jwt';
import { compareSync } from 'bcryptjs';
import { z } from 'zod';
import logger from '@/config/logger';
import crypto from 'crypto';
import Address, { AddressInput } from '../models/address';
import { AuthenticatedRequest } from '@/types/auth';

const loginSchema = z.object({
    username: z
        .string()
        .min(4, {
            message: 'Username is required and must be at least 4 characters long',
        })
        .max(16, { message: 'Username must be at most 16 characters long' }),

    password: z
        .string()
        .min(4, {
            message: 'Password is required and must be at least 4 characters long',
        })
        .max(20, { message: 'Password must be at most 20 characters long' }),
});
export default class AdminCtrl {
    static async login(req: Request, res: Response) {
        try {
            const validationResult = loginSchema.safeParse(req.body);

            if (!validationResult.success) {
                const errorMessages = validationResult.error.errors.map((err) => `${err.path[0]}: ${err.message}`);
                return res.status(400).json({ message: errorMessages.join(', ') });
            }

            const { username, password } = validationResult.data;
            const user = await User.findOne({ where: { username } });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const isAdmin = await Admin.findOne({
                where: { user_id: user.dataValues.id },
                attributes: {
                    exclude: ['updatedAt', 'createdAt', 'user_id', 'token'],
                },
            });

            if (!isAdmin) {
                return res.status(403).json({ message: 'User is not an admin' });
            }
            if (!isAdmin.dataValues.status) {
                return res.status(403).json({
                    message: 'Access revoked by a superior administrator',
                });
            }
            if (!compareSync(password, user.dataValues.password)) {
                return res.status(401).json({ message: 'Incorrect password' });
            }

            const token = await jwt({
                userId: user.dataValues.id,
                roleId: isAdmin.dataValues.role,
            });
            const tokenExpiration = Date.now() + 15 * 60 * 1000; // 15 minutos
            res.cookie('authToken', token, {
                httpOnly: true,
                // sameSite: 'none',
                expires: new Date(tokenExpiration),
            });

            res.status(200).json({
                body: {
                    user: {
                        name: user.dataValues.name,
                        lastname: user.dataValues.lastname,
                        email: user.dataValues.email,
                        ...isAdmin.dataValues,
                    },
                    tokenExpiration,
                },
            });
        } catch (error) {
            logger.error(`Error in login: ${error}`);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    static async logout(_req: Request, res: Response) {
        try {
            // Limpiar la cookie que contiene el token
            res.clearCookie('authToken');

            // Responder con éxito
            res.status(200).json({ message: 'Logout successful' });
        } catch (error) {
            logger.error(`Error in logout: ${error}`);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    static async createAdmin(req: AuthenticatedRequest, res: Response) {
        const t = await dbConn.transaction();
        try {
            const { user, roleId, address }: { user: UserInput; roleId: number; address: AddressInput } = req.body;

            if (!user || !roleId || !address) {
                throw new Error('Invalid user, roleId, or address input');
            }

            // Crear o buscar dirección
            let addressCreate = await Address.findOne({
                where: {
                    address: address.address,
                    municipality_id: address.municipality_id,
                },
            });

            if (!addressCreate) {
                addressCreate = await Address.create(address, {
                    transaction: t,
                });
            }

            // Crear usuario con la dirección asociada
            const userCreate = await User.create(
                { ...user, address_id: addressCreate.dataValues.id },
                { transaction: t },
            );

            const role = await Role.findByPk(roleId, { transaction: t });

            if (role) {
                const token = crypto.randomBytes(32).toString('hex'); // Generar token

                await Admin.create(
                    {
                        user_id: userCreate.dataValues.id,
                        role: role.dataValues.id,
                        token, // Puedes guardar el token asociado al admin
                    },
                    { transaction: t },
                );

                await t.commit();
                res.status(201).json({
                    body: { token },
                    message: 'Token generado',
                    tokenExpiration: req.tokenExpiration,
                }); // Enviar token al cliente para completar el registro
            } else {
                await t.rollback();
                res.status(404).json({ message: 'Role not found' });
            }
        } catch (error) {
            await t.rollback();
            logger.error(`Error in createAdmin: ${error}`);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    static async registerAdmin(req: Request, res: Response) {
        try {
            const { username, email, token, password, confirmPassword } = req.body;

            if (password !== confirmPassword) {
                return res.status(400).json({ message: 'Passwords do not match' });
            }

            // Verificar el token
            const admin = await Admin.findOne({ where: { token } });

            if (!admin) {
                return res.status(400).json({ message: 'Invalid or expired token' });
            }

            // Actualizar usuario con nueva información
            const user = await User.findOne({
                where: { id: admin.dataValues.user_id },
            });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            user.dataValues.username = username;
            user.dataValues.email = email;
            user.dataValues.password = password; // Encriptar la nueva contraseña

            await user.save();

            // Opcional: eliminar el token o marcarlo como usado

            res.status(200).json({ message: 'Admin registered successfully' });
        } catch (error) {
            logger.error(`Error in registerAdmin: ${error}`);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    static async getAllAdmins(req: Request, res: Response) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;

            const offset = (page - 1) * limit;

            const allAdmins = await Admin.findAndCountAll({
                include: [{ model: User, attributes: { exclude: ['password'] } }, { model: Role }],
                limit: Number(limit),
                offset: Number(offset),
            });

            const totalPages = Math.ceil(allAdmins.count / limit);

            res.status(200).json({
                totalItems: allAdmins.count,
                totalPages,
                currentPage: page,
                admins: allAdmins.rows,
            });
        } catch (error) {
            logger.error(`Error in getAllAdmins: ${error}`);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    static async getAdminById(req: AuthenticatedRequest, res: Response) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ message: 'ID is required' });
            }

            const adminDetails = await Admin.findByPk(id, {
                attributes: {
                    exclude: ['updatedAt', 'createdAt', 'role', 'user_id'],
                },
                include: [
                    {
                        model: User,
                        attributes: {
                            exclude: ['password', 'updatedAt', 'createdAt'],
                        },
                    }, // Excluye el campo de la contraseña por seguridad
                    {
                        model: Role,
                        attributes: {
                            exclude: ['updatedAt', 'createdAt'],
                        },
                    },
                ],
            });

            if (adminDetails) {
                res.status(200).json({
                    body: adminDetails,
                    tokenExpiration: req.tokenExpiration,
                });
            } else {
                res.status(404).json({ message: 'Admin not found' });
            }
        } catch (error) {
            logger.error(`Error in getAdminById: ${error}`);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    static async updateAdmin(req: AuthenticatedRequest, res: Response) {
        const t = await dbConn.transaction();
        try {
            const { id } = req.params;
            const { user, rolId }: { user: UserInput; rolId: number } = req.body;

            if (!user || !rolId) {
                throw new Error('Invalid user or rolId input');
            }

            const admin = await Admin.findByPk(id, { transaction: t });

            if (!admin) {
                res.status(404).json({ message: 'Admin not found' });
                return;
            }

            await User.update(user, {
                where: { id: admin.dataValues.user_id },
                transaction: t,
            });
            const role = await Role.findByPk(rolId, { transaction: t });
            if (role) {
                const adminUpdate = await admin.update(
                    {
                        user_id: admin.dataValues.id,
                        role: role.dataValues.id,
                    },
                    { transaction: t },
                );
                await t.commit();
                res.status(200).json({
                    body: adminUpdate,
                    tokenExpiration: req.tokenExpiration,
                });
            } else {
                await t.rollback();
                res.status(404).json({ message: 'Role not found' });
            }
        } catch (error) {
            await t.rollback();
            logger.error(`Error in updateAdmin: ${error}`);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    static async deleteAdmin(req: AuthenticatedRequest, res: Response) {
        const t = await dbConn.transaction();
        try {
            const { id } = req.params;
            const admin = await Admin.findByPk(id, { transaction: t });
            if (!admin) {
                res.status(404).json({ message: 'Admin not found' });
                return;
            }
            await admin.destroy({ transaction: t });
            await t.commit();
            res.status(204).send();
        } catch (error) {
            await t.rollback();
            logger.error(`Error in deleteAdmin: ${error}`);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    static async registerDeveloper(req: Request, res: Response) {
        const t = await dbConn.transaction();
        try {
            const { name, lastname, username, email, password, confirmPassword } = req.body;

            // Validar que las contraseñas coincidan
            if (password !== confirmPassword) {
                return res.status(400).json({ message: 'Passwords do not match' });
            }

            // Validar si ya existe un desarrollador registrado
            const existingDeveloper = await Admin.findOne({
                where: { role: 'Developer' },
            });
            if (existingDeveloper) {
                return res.status(403).json({ message: 'Developer already registered' });
            }

            // Crear el usuario
            const user = await User.create(
                {
                    name,
                    lastname,
                    username,
                    email,
                    password, // La contraseña será encriptada en el hook beforeCreate de User
                    dni: 'N/A', // Valor predeterminado
                    phone: '0000000000', // Valor predeterminado
                    gender_id: 1, // Valor predeterminado
                },
                { transaction: t },
            );

            // Asignar rol de desarrollador
            const developerRole = await Role.findOne({
                where: { name: 'Developer' },
                transaction: t,
            });
            if (!developerRole) {
                await t.rollback();
                return res.status(404).json({ message: 'Developer role not found' });
            }
            const token = crypto.randomBytes(32).toString('hex');
            // Crear registro en la tabla Admin con el rol de desarrollador
            await Admin.create(
                {
                    user_id: user.dataValues.id,
                    role: developerRole.dataValues.id,
                    status: true,
                    token,
                },
                { transaction: t },
            );

            await t.commit();
            res.status(201).json({
                message: 'Developer registered successfully',
            });
        } catch (error) {
            await t.rollback();
            logger.error(`Error in registerDeveloper: ${error}`);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}
