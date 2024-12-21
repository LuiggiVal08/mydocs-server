import logger from '@/config/logger';
import prisma from '@/config/prisma';
import { Request, Response } from 'express';

import { z } from 'zod';

const UserSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    username: z.string(),
    email: z.string().email(),
    avatar: z.string().optional(),
    gender: z.string(),
    dni: z.string(),
    address: z.string(),
    phone: z.string(),
    municipalityId: z
        .string()
        .uuid()
        .refine((val) => /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(val), {
            message: 'Invalid UUID format',
        }),
    password: z.string(),
});

class User {
    static async getAll(_req: Request, res: Response) {
        try {
            const users = await prisma.user.findMany();
            res.json({ users });
            return;
        } catch (error) {
            logger.error(`Error retrieving users: ${error}`);
            res.status(500).json({ error: 'Failed to retrieve users' });
        } finally {
            await prisma.$disconnect();
        }
    }
    static async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const user = await prisma.user.findUnique({ where: { id } });
            if (!user) {
                res.status(404).json({ message: 'Usuario no encontrado' });
                return;
            }
            res.status(200).json({ data: { student: user } });
        } catch (error) {
            logger.error(error);
            res.status(400).end();
        } finally {
            prisma.$disconnect;
        }
    }

    static async create(req: Request, res: Response) {
        try {
            const { body } = req;
            const parsed = UserSchema.safeParse(body);
            if (!parsed.success) {
                res.status(400).json({ message: parsed.error.message });
            }
            const municipioId = parsed.data.municipalityId;
            const municipio = await prisma.municipality.findUnique({ where: { id: municipioId } });
            if (!municipio) {
                res.status(404).json({ message: 'Municipio no encontrado' });
                return;
            }
            const newUser = await prisma.user.create({
                data: {
                    firstName: body.firstName,
                    lastName: body.lastName,
                    username: body.username,
                    email: body.email,
                    avatar: body.avatar,
                    gender: body.gender,
                    dni: body.dni,
                    address: body.address,
                    phone: body.phone,
                    municipalityId: body.municipalityId,
                    password: body.password,
                },
            });
            res.status(201).json({ data: newUser });
        } catch (error) {
            logger.error(`Error creating user: ${error}`);
            res.status(500).json({ error: 'Failed to create user' });
        } finally {
            await prisma.$disconnect();
        }
    }
}
export default User;
