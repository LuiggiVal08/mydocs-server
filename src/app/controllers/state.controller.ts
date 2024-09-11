import { Request, Response } from 'express';
import State from '@/app/models/state';
import Municipality from '@/app/models/municipality';
import dbConn from '@/config/dbConn';
import logger from '@/config/logger';
import { z } from 'zod';
// import app from './../app';

const stateSchema = z.object({
    name: z.string().min(1, 'Name is required').max(70),
});
const municipalitySchema = z.string().min(1, 'Municipality name is required');
const municipalitiesSchema = z.record(z.array(municipalitySchema));

type MunicipalitiesInput = z.infer<typeof municipalitiesSchema>;
export default class StateController {
    static async createState(req: Request, res: Response) {
        const t = await dbConn.transaction();
        try {
            const validationResult = stateSchema.safeParse(req.body);

            if (!validationResult.success) {
                const errorMessages = validationResult.error.errors.map(
                    (err) => {
                        return `${err.path[0]}: ${err.message}`;
                    },
                );
                return res.status(400).json({ message: errorMessages.join(', ') });
            }

            const { name } = validationResult.data;

            const createdState = await State.create({ name }, { transaction: t });
            await t.commit();

            res.status(201).json({ createdState });
        } catch (error) {
            await t.rollback();
            logger.error(`Error in createState: ${error}`);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    static async getState(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const state = await State.findByPk(id, {
                include: [{ model: Municipality }]
            });

            if (!state) {
                return res.status(404).json({ message: 'State not found' });
            }

            res.status(200).json({ state });
        } catch (error) {
            logger.error(`Error in getState: ${error}`);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    static async getAllStates(_req: Request, res: Response) {
        try {
            const states = await State.findAll({
                include: [{ model: Municipality }]
            });
            res.status(200).json(states);
        } catch (error) {
            logger.error(`Error in getAllStates: ${error}`);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    static async deleteState(req: Request, res: Response) {
        const t = await dbConn.transaction();
        try {
            const { id } = req.params;
            const state = await State.findByPk(id, { transaction: t });

            if (!state) {
                return res.status(404).json({ message: 'State not found' });
            }

            await Municipality.destroy({
                where: { state_id: id },
                transaction: t
            });

            await state.destroy({ transaction: t });
            await t.commit();
            res.status(204).send();
        } catch (error) {
            await t.rollback();
            logger.error(`Error in deleteState: ${error}`);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    static async bulkInsertMunicipalities(req: Request, res: Response) {
        const maxRetries = 3;
        let attempts = 0;

        while (attempts < maxRetries) {
            const t = await dbConn.transaction();
            try {
                const validationResult = municipalitiesSchema.safeParse(req.body);

                if (!validationResult.success) {
                    const errorMessages = validationResult.error.errors.map(
                        (err) => `${err.path[0]}: ${err.message}`
                    );
                    return res.status(400).json({ message: errorMessages.join(', ') });
                }

                const municipalities: MunicipalitiesInput = validationResult.data;

                const statePromises = Object.entries(municipalities).map(async ([stateName, municipalitiesList]) => {
                    if (!Array.isArray(municipalitiesList) || !municipalitiesList.every(item => typeof item === 'string')) {
                        throw new Error(`Invalid municipalities list for state: ${stateName}`);
                    }

                    const [state] = await State.findOrCreate({
                        where: { name: stateName },
                        defaults: { name: stateName },
                        transaction: t
                    });

                    const municipalityPromises = municipalitiesList.map((municipality: string) =>
                        Municipality.findOrCreate({
                            where: { name: municipality, state_id: state.dataValues.id },
                            defaults: { name: municipality, state_id: state.dataValues.id },
                            transaction: t
                        })
                    );

                    await Promise.all(municipalityPromises);
                });

                await Promise.all(statePromises);
                await t.commit();

                return res.status(201).json({ message: 'Municipalities added successfully' });
            } catch (error) {
                await t.rollback();

                let errorMessage = 'Internal Server Error';

                if (error instanceof Error) {
                    // Puedes acceder a error.message aquí
                    if (error.message.includes('SQLITE_BUSY') && attempts < maxRetries - 1) {
                        attempts++;
                        await new Promise(resolve => setTimeout(resolve, 1000)); // Esperar 1 segundo antes de reintentar
                    } else {
                        errorMessage = error.message;
                    }
                } else {
                    errorMessage = 'An unknown error occurred';
                }

                logger.error(`Error in bulkInsertMunicipalities: ${errorMessage}`);
                return res.status(500).json({ message: errorMessage });
            }
        }
    }

}
