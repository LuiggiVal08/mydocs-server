import { Response } from 'express';
import Level from '@/app/models/level';
import Folder from '@/app/models/folder';
import { z } from 'zod';
import Cabinet from '../models/cabinet';
import { AuthenticatedRequest } from '@/types/auth';
// Esquema de validación para los parámetros y el cuerpo usando Zod
const paramsSchema = z.object({
    cabinet_id: z
        .string()
        .uuid({ message: 'El ID del cabinet debe ser un UUID válido' }),
});

const bodySchema = z.object({
    name: z.string().min(1, { message: 'El nombre es requerido' }),
    capacity: z
        .number()
        .positive({ message: 'La capacidad debe ser un número positivo' }),
    status: z.boolean({
        message: 'El estado es requerido y debe ser un booleano',
    }),
});
class LevelController {
    // Crear un nuevo nivel
    async createLevel(req: AuthenticatedRequest, res: Response) {
        try {
            // Validar los parámetros
            const { cabinet_id } = paramsSchema.parse(req.params);

            // Validar el cuerpo de la solicitud
            const { name, capacity, status } = bodySchema.parse(req.body);
            const cabinet = await Cabinet.findByPk(cabinet_id);

            if (!cabinet) {
                return res.status(404).json({
                    message: 'Archivo no encontrado',
                });
            }
            // Forzar el tipo de cabinet_id si TypeScript sigue generando un error
            const newLevel = await Level.create({
                cabinet_id: cabinet?.dataValues.id,
                name,
                capacity,
                status,
            });

            return res.status(201).json({
                message: 'Nivel creado exitosamente',
                body: newLevel,
                tokenExpiration: req.tokenExpiration,
            });
        } catch (error) {
            if (error instanceof z.ZodError) {
                // Manejar errores de validación de Zod
                return res.status(400).json({
                    message: 'Datos inválidos',
                    errors: error.errors,
                });
            }
            console.error('Error al crear el nivel:', error);
            return res
                .status(500)
                .json({ message: 'Error interno del servidor' });
        }
    }

    // Obtener todos los niveles con sus carpetas
    async getAllLevels(_req: AuthenticatedRequest, res: Response) {
        try {
            const levels = await Level.findAll({
                include: [Folder], // Incluye las carpetas relacionadas
            });
            return res
                .status(200)
                .json({ body: levels, tokenExpiration: _req.tokenExpiration });
        } catch (error) {
            console.error('Error al obtener niveles:', error);
            return res
                .status(500)
                .json({ message: 'Error interno del servidor' });
        }
    }

    // Buscar niveles por cabinet_id con sus carpetas
    async getLevelsByCabinetId(req: AuthenticatedRequest, res: Response) {
        const { cabinet_id } = req.params;

        try {
            const levels = await Level.findAll({
                where: { cabinet_id },
                include: [Folder], // Incluye las carpetas relacionadas
            });

            if (levels.length === 0) {
                return res.status(404).json({
                    message: 'No se encontraron niveles para este cabinet',
                });
            }

            return res
                .status(200)
                .json({ body: levels, tokenExpiration: req.tokenExpiration });
        } catch (error) {
            console.error('Error al buscar niveles:', error);
            return res
                .status(500)
                .json({ message: 'Error interno del servidor' });
        }
    }

    // Buscar un nivel por su propio id con sus carpetas
    async getLevelById(req: AuthenticatedRequest, res: Response) {
        const { id } = req.params;

        try {
            const level = await Level.findByPk(id, {
                include: [Folder], // Incluye las carpetas relacionadas
            });

            if (!level) {
                return res.status(404).json({ message: 'Nivel no encontrado' });
            }

            return res
                .status(200)
                .json({ body: level, tokenExpiration: req.tokenExpiration });
        } catch (error) {
            console.error('Error al buscar el nivel:', error);
            return res
                .status(500)
                .json({ message: 'Error interno del servidor' });
        }
    }

    // Editar un nivel
    async updateLevel(req: AuthenticatedRequest, res: Response) {
        const { id } = req.params;
        const { name, capacity, status } = req.body;

        try {
            const level = await Level.findByPk(id);

            if (!level) {
                return res.status(404).json({ message: 'Nivel no encontrado' });
            }

            level.dataValues.name = name || level.dataValues.name;
            level.dataValues.capacity = capacity || level.dataValues.capacity;
            level.dataValues.status = status || level.dataValues.status;

            await level.save();

            return res.status(200).json({
                message: 'Nivel actualizado exitosamente',
                body: level,
                tokenExpiration: req.tokenExpiration,
            });
        } catch (error) {
            console.error('Error al actualizar el nivel:', error);
            return res
                .status(500)
                .json({ message: 'Error interno del servidor' });
        }
    }

    // Eliminar un nivel
    async deleteLevel(req: AuthenticatedRequest, res: Response) {
        const { id } = req.params;

        try {
            const level = await Level.findByPk(id);

            if (!level) {
                return res.status(404).json({ message: 'Nivel no encontrado' });
            }

            await level.destroy();

            return res.status(200).json({
                message: 'Nivel eliminado exitosamente',
                tokenExpiration: req.tokenExpiration,
            });
        } catch (error) {
            console.error('Error al eliminar el nivel:', error);
            return res
                .status(500)
                .json({ message: 'Error interno del servidor' });
        }
    }
}

export default new LevelController();
