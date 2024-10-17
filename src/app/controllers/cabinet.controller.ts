import { Response } from 'express';
import Cabinet from '@/app/models/cabinet';
import CabinetHistory from '@/app/models/cabinetHistory';
import Admin from '@/app/models/admin'; // Importa el modelo Admin
import Level from '../models/level';
import Folder from '../models/folder';
import { AuthenticatedRequest } from '@/types/auth';
// import { create } from 'zustand';

// interface AuthenticatedRequest extends Request {
//     user?: {
//         userId: string; // UUID como string
//         roleId: number; // ID de rol como número
//         iat: number; // Timestamp de "issued at"
//         exp: number; // Timestamp de "expiration"
//     };
// }

class CabinetController {
    // Obtener todos los archiveros
    async getAll(req: AuthenticatedRequest, res: Response) {
        try {
            const page = parseInt(req.query.page as string) || 1; // Página actual, por defecto 1
            const limit = parseInt(req.query.limit as string) || 10; // Límites por página, por defecto 10
            const offset = (page - 1) * limit; // Cálculo del offset

            // Obtener todos los cabinets y sus niveles con paginación
            const { count, rows } = await Cabinet.findAndCountAll({
                include: [
                    {
                        model: Level,
                        include: [
                            {
                                model: Folder,
                                attributes: ['id'], // Solo nos interesa el ID para contar carpetas
                            },
                        ],
                    },
                ],
                limit,
                offset,
            });

            // Procesar los resultados para contar niveles y calcular ocupación
            const cabinetsWithLevels = rows.map((cabinet: any) => {
                const levels = cabinet.Levels;

                const numberOfLevels = levels.length;
                let totalCapacity = 0;
                let totalFolders = 0;

                levels.forEach((level: any) => {
                    totalCapacity += level.capacity; // Sumamos la capacidad de cada nivel
                    totalFolders += level.Folders.length; // Contamos cuántas carpetas hay en cada nivel
                });

                const remainingCapacity = totalCapacity - totalFolders;

                return {
                    id: cabinet.id,
                    name: cabinet.name,
                    location: cabinet.location,
                    status: cabinet.status,
                    numberOfLevels,
                    totalCapacity,
                    totalFolders,
                    remainingCapacity,
                };
            });

            // Enviar respuesta con paginación
            res.status(200).json({
                body: {
                    totalItems: count,
                    totalPages: Math.ceil(count / limit),
                    currentPage: page,
                    itemsPerPage: limit,
                    cabinets: cabinetsWithLevels,
                },
                tokenExpiration: req.tokenExpiration,
            });
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener los archiveros' });
        }
    }

    // Obtener un archivero por su ID
    async getById(req: AuthenticatedRequest, res: Response) {
        try {
            const { id } = req.params;

            // Buscar el cabinet por ID, incluyendo niveles y carpetas
            const cabinet = await Cabinet.findByPk(id, {
                include: [
                    {
                        model: Level,
                        include: [
                            {
                                model: Folder,
                                attributes: ['id'], // Solo obtenemos el ID para contar las carpetas
                            },
                        ],
                    },
                ],
            });

            if (!cabinet) {
                return res
                    .status(404)
                    .json({ message: 'Archivero no encontrado' });
            }

            // Procesar los datos del cabinet para calcular la capacidad y contar niveles/carpetas
            const levels = (cabinet.dataValues as any).Levels;

            const numberOfLevels = levels.length;
            let totalCapacity = 0;
            let totalFolders = 0;

            // Agregamos el conteo de carpetas en cada nivel
            const levelsWithFolderCount = levels.map((level: any) => {
                const folderCount = level.Folders.length;
                totalCapacity += level.capacity;
                totalFolders += folderCount;

                return {
                    ...level.dataValues,
                    cant: folderCount, // Agregamos la propiedad de conteo de carpetas
                };
            });

            const remainingCapacity = totalCapacity - totalFolders;

            // Devolver los detalles del cabinet junto con los cálculos adicionales y niveles con cantidad de carpetas
            return res.status(200).json({
                body: {
                    id: cabinet.dataValues.id,
                    name: cabinet.dataValues.name,
                    location: cabinet.dataValues.location,
                    status: cabinet.dataValues.status,
                    numberOfLevels,
                    totalCapacity,
                    totalFolders,
                    remainingCapacity,
                    levels: levelsWithFolderCount, // Devolvemos los niveles con conteo de carpetas
                },
                tokenExpiration: req.tokenExpiration,
            });
        } catch (error) {
            console.error('Error al obtener el archivero:', error);
            return res
                .status(500)
                .json({ error: 'Error al obtener el archivero' });
        }
    }

    // Crear un nuevo archivero
    async create(req: AuthenticatedRequest, res: Response) {
        try {
            const { name, status, location } = req.body;
            const userId = req.user?.userId; // Tomar el userId de req.user

            if (!userId) {
                return res
                    .status(403)
                    .json({ error: 'Usuario no autenticado' });
            }

            // Buscar el admin por el user_id
            const admin = await Admin.findOne({ where: { user_id: userId } });

            if (!admin) {
                return res
                    .status(403)
                    .json({ error: 'Administrador no encontrado' });
            }

            const cabinet = await Cabinet.create({ name, status, location });

            // Agregar entrada en el historial
            await CabinetHistory.create({
                cabinet_id: cabinet.dataValues.id,
                action: 'created',
                admin_id: admin.dataValues.id, // Registrar el id del admin
            });

            res.status(201).json({
                body: cabinet,
                tokenExpiration: req.tokenExpiration,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error al crear el archivero' });
        }
    }

    // Actualizar un archivero
    async update(req: AuthenticatedRequest, res: Response) {
        try {
            const { id } = req.params;
            const { name, status, location } = req.body;
            const userId = req.user?.userId; // Tomar el userId de req.user

            if (!userId) {
                return res
                    .status(403)
                    .json({ error: 'Usuario no autenticado' });
            }

            // Buscar el admin por el user_id
            const admin = await Admin.findOne({ where: { user_id: userId } });

            if (!admin) {
                return res
                    .status(403)
                    .json({ error: 'Administrador no encontrado' });
            }

            const cabinet = await Cabinet.findByPk(id);
            if (!cabinet) {
                return res
                    .status(404)
                    .json({ message: 'Archivero no encontrado' });
            }

            await cabinet.update({ name, status, location });

            // Registrar la acción en el historial
            await CabinetHistory.create({
                cabinet_id: cabinet.dataValues.id,
                action: 'updated',
                admin_id: admin.dataValues.id, // Registrar el id del admin
            });

            res.status(200).json({
                body: cabinet,
                tokenExpiration: req.tokenExpiration,
            });
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar el archivero' });
        }
    }

    // Eliminar un archivero
    async delete(req: AuthenticatedRequest, res: Response) {
        try {
            const { id } = req.params;
            const userId = req.user?.userId; // Tomar el userId de req.user

            if (!userId) {
                return res
                    .status(403)
                    .json({ error: 'Usuario no autenticado' });
            }

            // Buscar el admin por el user_id
            const admin = await Admin.findOne({ where: { user_id: userId } });

            if (!admin) {
                return res
                    .status(403)
                    .json({ error: 'Administrador no encontrado' });
            }

            const cabinet = await Cabinet.findByPk(id);

            if (!cabinet) {
                return res
                    .status(404)
                    .json({ message: 'Archivero no encontrado' });
            }

            // Verificar si los niveles del archivero tienen carpetas asociadas
            const levels = await Level.findAll({
                where: { cabinet_id: cabinet.dataValues.id },
            });

            // Verificar si hay algún nivel con carpetas
            for (const level of levels) {
                const folderCount = await Folder.count({
                    where: { level_id: level.dataValues.id },
                });
                if (folderCount > 0) {
                    return res.status(400).json({
                        message: `No se puede eliminar el archivero, el nivel ${level.dataValues.name} contiene carpetas.`,
                    });
                }
            }

            // Si no hay niveles con carpetas, eliminar los niveles asociados
            await Level.destroy({
                where: { cabinet_id: cabinet.dataValues.id },
            });

            // Proceder a eliminar el archivero
            const idCabinet = cabinet.dataValues.id;
            await cabinet.destroy();

            // Registrar la acción en el historial
            await CabinetHistory.create({
                cabinet_id: idCabinet,
                action: 'deleted',
                admin_id: admin.dataValues.id, // Registrar el id del admin
            });

            res.status(200).json({
                message: 'Archivero y niveles asociados eliminados',
                tokenExpiration: req.tokenExpiration,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: 'Error al eliminar el archivero y sus niveles',
            });
        }
    }
}

export default new CabinetController();
