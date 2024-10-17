import { Response } from 'express';
import CabinetHistory from '@/app/models/cabinetHistory';
import Admin from '@/app/models/admin'; // Importa el modelo Admin
import User from '@/app/models/user';
import { AuthenticatedRequest } from '@/types/auth';

class CabinetHistoryController {
    // Obtener todos los registros del historial
    async getAll(req: AuthenticatedRequest, res: Response) {
        try {
            const page = parseInt(req.query.page as string) || 1; // Página actual, por defecto 1
            const limit = parseInt(req.query.limit as string) || 10; // Límites por página, por defecto 10
            const offset = (page - 1) * limit; // Cálculo del offset

            const { count, rows } = await CabinetHistory.findAndCountAll({
                include: [
                    {
                        model: Admin, // Incluye el modelo Admin para obtener información del administrador
                        attributes: ['id', 'name'], // Asegúrate de que 'name' es un atributo válido
                    },
                ],
                limit,
                offset,
            });

            res.status(200).json({
                body: {
                    totalItems: count,
                    totalPages: Math.ceil(count / limit),
                    currentPage: page,
                    itemsPerPage: limit,
                    history: rows,
                },
                tokenExpiration: req.tokenExpiration,
            });
        } catch (error) {
            res.status(500).json({
                error: 'Error al obtener el historial de archiveros',
            });
        }
    }
    async getHistoryByCabinetId(req: AuthenticatedRequest, res: Response) {
        try {
            const cabinetId = req.params.cabinetId;
            console.log(cabinetId);
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const offset = (page - 1) * limit;

            const { count, rows } = await CabinetHistory.findAndCountAll({
                where: {
                    cabinet_id: cabinetId,
                },
                include: [
                    {
                        model: Admin, // Asegúrate de que el modelo Admin esté importado
                        include: [
                            {
                                model: User, // Incluir el modelo User
                                attributes: ['id', 'name'], // Obtener el id y el nombre del usuario
                            },
                        ],
                        attributes: ['id'], // Puedes ajustar qué atributos deseas del Admin
                    },
                ],
                limit,
                offset,
            });

            res.status(200).json({
                body: {
                    totalItems: count,
                    totalPages: Math.ceil(count / limit),
                    currentPage: page,
                    itemsPerPage: limit,
                    history: rows,
                },
                tokenExpiration: req.tokenExpiration,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: 'Error al obtener el historial del archivero',
            });
        }
    }

    // Obtener un registro del historial por su ID
    async getById(req: AuthenticatedRequest, res: Response) {
        try {
            const { id } = req.params;
            const historyEntry = await CabinetHistory.findByPk(id);
            if (!historyEntry) {
                return res
                    .status(404)
                    .json({ message: 'Registro de historial no encontrado' });
            }
            return res.status(200).json({
                body: historyEntry,
                tokenExpiration: req.tokenExpiration,
            });
        } catch (error) {
            res.status(500).json({
                error: 'Error al obtener el registro del historial',
            });
        }
    }

    // Crear un nuevo registro en el historial
    async create(req: AuthenticatedRequest, res: Response) {
        try {
            const { cabinet_id, action } = req.body;
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

            const historyEntry = await CabinetHistory.create({
                cabinet_id,
                action,
                admin_id: admin.dataValues.id, // Registrar el id del admin
            });

            res.status(201).json({
                body: historyEntry,
                tokenExpiration: req.tokenExpiration,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: 'Error al crear el registro del historial',
            });
        }
    }

    // Eliminar un registro del historial
    async delete(req: AuthenticatedRequest, res: Response) {
        try {
            const { id } = req.params;

            const historyEntry = await CabinetHistory.findByPk(id);

            if (!historyEntry) {
                return res
                    .status(404)
                    .json({ message: 'Registro de historial no encontrado' });
            }

            await historyEntry.destroy();
            res.status(200).json({
                message: 'Registro de historial eliminado',
                tokenExpiration: req.tokenExpiration,
            });
        } catch (error) {
            res.status(500).json({
                error: 'Error al eliminar el registro del historial',
            });
        }
    }
}

export default new CabinetHistoryController();
