import type { Request, Response } from 'express';
import z from 'zod';
import models from '@/app/models';
import logger from '@/config/logger';
import handdleErrorsController from '@/helpers/handdleErrorsController';

const schemaStudent = z.object({
    id: z.string().optional(),
    userId: z.string().uuid(),
    active: z.boolean(),
});

class Student {
    static async getAll(req: Request, res: Response): Promise<void> {
        try {
            const { page = 1, limit = 10 } = req.query;
            const pageNumber = parseInt(page as string, 10);
            const limitNumber = parseInt(limit as string, 10);
            const offset = (pageNumber - 1) * limitNumber;
            const { count, rows } = await models.Student.findAndCountAll({ limit: limitNumber, offset: offset });

            const totalPages = Math.ceil(count / limitNumber);
            res.status(200).json({
                data: {
                    students: rows,
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

    static async getById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const student = await models.Student.findByPk(id);
            if (!student) {
                return void res.status(404).json({ message: 'Estudiante no encontrado' });
            }

            res.status(200).json({ data: { student } });
        } catch (error) {
            return handdleErrorsController(error, res, req);
        }
    }

    static async create(req: Request, res: Response): Promise<void> {
        try {
            const { body } = req;
            const parsed = schemaStudent.safeParse(body);
            if (!parsed.success) {
                res.status(400).json({ message: parsed.error.message });
                return;
            }
            const user = await models.User.findByPk(parsed.data.userId);
            if (!user) {
                return void res.status(404).json({ message: 'Usuario no encontrado' });
            }
            const student = await models.Student.create(body);
            res.status(201).json({ data: { student } });
        } catch (error) {
            return handdleErrorsController(error, res, req);
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const { body } = req;
            const { id } = req.params;
            const student = await models.Student.findByPk(id);
            if (!student) {
                res.status(404).json({ message: 'Estudiante no encontrado' });
                return;
            }
            const parsed = schemaStudent.safeParse(body);
            if (!parsed.success) {
                logger.error(parsed.error);
                res.status(400).json({ message: parsed.error.message });
                return;
            }
            const updateStudent = {
                ...student.dataValues,
                ...parsed.data,
            };
            await student.update(updateStudent);
            res.status(200).json({ data: { student } });
        } catch (error) {
            return handdleErrorsController(error, res, req);
        }
    }

    static async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const student = await models.Student.findByPk(id);
            if (!student) {
                return void res.status(404).json({ message: 'Estudiante no encontrado' });
            }
            await student.destroy();
            res.status(200).json({ message: 'Estudiante eliminado' });
        } catch (error) {
            return handdleErrorsController(error, res, req);
        }
    }
}

export default Student;
