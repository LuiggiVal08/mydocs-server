import { Response } from 'express';
import Extension from '@/app/models/extension';
import logger from '@/config/logger';
import { z } from 'zod';
import { AuthenticatedRequest } from '@/types/auth';

// Esquema de validación para las extensiones
const extensionSchema = z.object({
    name: z
        .string()
        .nonempty('Nombre is required')
        .max(100, 'Name must be 100 characters or less'),
    format: z
        .string()
        .nonempty('Formato es requerido')
        .max(100, 'Name must be 100 characters or less'),
    definition: z
        .string()
        .nonempty('Definición es Requerido')
        .max(250, 'Name must be 250 characters or less'),
    //  z.string().nonempty('Type is required').max(50, 'Type must be 50 characters or less'),
});

export default class ExtensionCtrl {
    static async createExtension(req: AuthenticatedRequest, res: Response) {
        try {
            // Validar la solicitud con Zod
            const validationResult = extensionSchema.safeParse(req.body);
            console.log(req.body);
            if (!validationResult.success) {
                const errorMessages = validationResult.error.errors.map(
                    (err) => `${err.path[0]}: ${err.message}`,
                );
                return res
                    .status(400)
                    .json({ message: errorMessages.join(', ') });
            }

            const { name, format, definition } = validationResult.data;

            const extension = await Extension.create({
                name,
                format,
                definition,
            });

            res.status(201).json({
                body: extension,
                tokenExpiration: req.tokenExpiration,
            });
        } catch (error) {
            logger.error(`Error in createExtension: ${error}`);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    static async getAllExtensions(_req: AuthenticatedRequest, res: Response) {
        try {
            const extensions = await Extension.findAll();
            res.status(200).json({
                body: extensions,
                tokenExpiration: _req.tokenExpiration,
            });
        } catch (error) {
            logger.error(`Error in getAllExtensions: ${error}`);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    static async getExtensionById(req: AuthenticatedRequest, res: Response) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ message: 'ID is required' });
            }

            const extension = await Extension.findByPk(id);

            if (!extension) {
                return res.status(404).json({ message: 'Extension not found' });
            }

            res.status(200).json({
                body: extension,
                tokenExpiration: req.tokenExpiration,
            });
        } catch (error) {
            logger.error(`Error in getExtensionById: ${error}`);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    static async updateExtension(req: AuthenticatedRequest, res: Response) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ message: 'ID is required' });
            }

            // Validar la solicitud con Zod
            const validationResult = extensionSchema.safeParse(req.body);

            if (!validationResult.success) {
                const errorMessages = validationResult.error.errors.map(
                    (err) => `${err.path[0]}: ${err.message}`,
                );
                return res
                    .status(400)
                    .json({ message: errorMessages.join(', ') });
            }

            const { name, format, definition } = validationResult.data;

            const extension = await Extension.findByPk(id);

            if (!extension) {
                return res.status(404).json({ message: 'Extension not found' });
            }

            await extension.update({ name, format, definition });

            res.status(200).json({
                body: extension,
                tokenExpiration: req.tokenExpiration,
            });
        } catch (error) {
            logger.error(`Error in updateExtension: ${error}`);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    static async deleteExtension(req: AuthenticatedRequest, res: Response) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ message: 'ID is required' });
            }

            const extension = await Extension.findByPk(id);

            if (!extension) {
                return res.status(404).json({ message: 'Extension not found' });
            }

            await extension.destroy();

            res.status(204).send();
        } catch (error) {
            logger.error(`Error in deleteExtension: ${error}`);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}
