import logger from '@/config/logger';
import prisma from '@/config/prisma';
import { Request, Response } from 'express';
import z from 'zod';

const StateSchema = z.object({
    nombre: z.string().min(3),
});

class State {
    static async getAll(_req: Request, res: Response) {
        try {
            const states = await prisma.estado.findMany();
            res.status(200).json({ data: { states } });
        } catch (error) {
            logger.error(error);
            res.status(400).end();
        } finally {
            prisma.$disconnect;
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const state = await prisma.estado.findUnique({ where: { id } });
            if (!state) {
                res.status(404).json({ message: 'estado no encontrado' });
                return;
            }
            res.status(200).json({ data: { state } });
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
            const parsed = StateSchema.safeParse(body);
            if (!parsed.success) {
                res.status(400).json({ message: parsed.error.message });
                return;
            }
            const state = await prisma.estado.create({ data: body });
            res.status(201).json({ data: { state } });
        } catch (error) {
            logger.error(error);
            res.status(400).end();
        } finally {
            prisma.$disconnect;
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { body } = req;
            const parsed = StateSchema.safeParse(body);
            if (!parsed.success) {
                res.status(400).json({ message: parsed.error.message });
                return;
            }
            const state = await prisma.estado.update({ where: { id }, data: body });
            res.status(200).json({ data: state });
        } catch (error) {
            logger.error(error);
            res.status(400).end();
        } finally {
            prisma.$disconnect;
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const state = await prisma.estado.findUnique({ where: { id } });
            if (!state) {
                res.status(404).json({ message: 'Estado no encontrado' });
                return;
            }
            await prisma.estado.delete({ where: { id } });
            res.status(200).json({ message: 'Estado eliminado' });
        } catch (error) {
            logger.error(error);
            res.status(400).end();
        } finally {
            prisma.$disconnect;
        }
    }
}
export default State;
