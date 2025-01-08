import logger from '@/config/logger';

import { Request, Response } from 'express';
import z from 'zod';
import models from '@/app/models';

const schemaStudent = z.object({
    usuarioId: z.string().uuid(),
    activo: z.boolean(),
});

class Student {
    static async getAll(_req: Request, res: Response) {
        try {
            const students = await models.Student.findAll({ include: { all: true } });
            res.status(200).json({ data: { students } });
        } catch (error) {
            logger.error(error);
            res.status(400).end();
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const student = await models.Student.findByPk(id);
            if (!student) {
                res.status(404).json({ message: 'Estudiante no encontrado' });
                return;
            }
            res.status(200).json({ data: { student } });
        } catch (error) {
            logger.error(error);
            res.status(400).end();
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
            const student = await models.Student.create(body);
            res.status(201).json({ data: { student } });
        } catch (error) {
            logger.error(error);
            res.status(400).end();
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const existStudent = await models.Student.findByPk(id);
            if (!existStudent) {
                res.status(404).json({ message: 'Estudiante no encontrado' });
                return;
            }
            const { body } = req;
            const parsed = schemaStudent.safeParse(body);
            if (!parsed.success) {
                res.status(400).json({ message: parsed.error.message });
                return;
            }
            const student = await models.Student.update(body, { where: { id } });
            res.status(200).json({ data: { student } });
        } catch (error) {
            logger.error(error);
            res.status(400).end();
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const existStudent = await models.Student.findByPk(id);
            if (!existStudent) {
                res.status(404).json({ message: 'Estudiante no encontrado' });
                return;
            }
            await models.Student.destroy({ where: { id } });
            res.status(204).end();
        } catch (error) {
            logger.error(error);
            res.status(400).end();
        }
    }
}

export default Student;
