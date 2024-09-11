import { Request, Response } from 'express';
import Gender from '@/app/models/gender'; // Asegúrate de que la ruta sea correcta

class GenderController {
    // Crear un nuevo género
    static async createGender(req: Request, res: Response) {
        try {
            const { gender, description } = req.body;

            // Validar los datos de entrada
            if (!gender) {
                return res.status(400).json({ message: 'Gender is required' });
            }

            // Crear el género
            const newGender = await Gender.create({ gender, description });
            return res.status(201).json(newGender);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ message: 'Internal Server Error', error: error.message });
            }
            // Si no es un Error estándar, enviar un mensaje genérico
            return res.status(500).json({ message: 'Unknown error occurred' });
        }
    }

    // Obtener todos los géneros
    static async getAllGenders(_req: Request, res: Response) {
        try {
            const genders = await Gender.findAll();
            return res.status(200).json(genders);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ message: 'Internal Server Error', error: error.message });
            }
            // Si no es un Error estándar, enviar un mensaje genérico
            return res.status(500).json({ message: 'Unknown error occurred' });
        }
    }

    // Obtener un género por ID
    static async getGenderById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const gender = await Gender.findByPk(id);

            if (!gender) {
                return res.status(404).json({ message: 'Gender not found' });
            }

            return res.status(200).json(gender);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ message: 'Internal Server Error', error: error.message });
            }
            // Si no es un Error estándar, enviar un mensaje genérico
            return res.status(500).json({ message: 'Unknown error occurred' });
        }
    }

    // Actualizar un género por ID
    static async updateGender(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { gender, description } = req.body;

            const genderToUpdate = await Gender.findByPk(id);

            if (!genderToUpdate) {
                return res.status(404).json({ message: 'Gender not found' });
            }

            // Actualizar el género
            await genderToUpdate.update({ gender, description });
            return res.status(200).json(genderToUpdate);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ message: 'Internal Server Error', error: error.message });
            }
            // Si no es un Error estándar, enviar un mensaje genérico
            return res.status(500).json({ message: 'Unknown error occurred' });
        }
    }

    // Eliminar un género por ID
    static async deleteGender(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const genderToDelete = await Gender.findByPk(id);

            if (!genderToDelete) {
                return res.status(404).json({ message: 'Gender not found' });
            }

            // Eliminar el género
            await genderToDelete.destroy();
            return res.status(204).send(); // No Content
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ message: 'Internal Server Error', error: error.message });
            }
            // Si no es un Error estándar, enviar un mensaje genérico
            return res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
}

export default GenderController;
