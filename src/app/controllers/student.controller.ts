import logger from '@/config/logger';
import prisma from '@/config/prisma';
import { Request, Response } from 'express';
import z from 'zod';

const schemaStudent = z.object({
    id: z.string().uuid(),
    usuarioId: z.string().uuid(),
    activo: z.boolean(),
});

class Student {
    static async getAll(_req: Request, res: Response) {
        try {
            const students = await prisma.estudiante.findMany();
            res.status(200).json({ data: { students } });
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
            const student = await prisma.estudiante.findUnique({ where: { id } });
            if (!student) {
                res.status(404).json({ message: 'student not found' });
                return;
            }
            res.status(200).json({ data: { student } });
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
            const parsed = schemaStudent.safeParse(body);
            if (!parsed.success) {
                res.status(400).json({ message: parsed.error.message });
                return;
            }
            const student = await prisma.estudiante.create({ data: body });
            res.status(201).json({ data: { student } });
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
            const parsed = schemaStudent.safeParse(body);
            if (!parsed.success) {
                res.status(400).json({ message: parsed.error.message });
                return;
            }
            const student = await prisma.estudiante.update({ where: { id }, data: body });
            res.status(200).json({ data: { student } });
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
            await prisma.estudiante.delete({ where: { id } });
            res.status(204).end();
        } catch (error) {
            logger.error(error);
            res.status(400).end();
        } finally {
            prisma.$disconnect;
        }
    }
}

export default Student;
