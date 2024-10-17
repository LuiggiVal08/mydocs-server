import { Router } from 'express';
import CabinetHistoryController from '@/app/controllers/historyCabinet.controller';
import { isAuthenticated, isAdmin } from '@/app/middlewares';

const router = Router();

// Obtener todos los registros del historial
router.get('/', isAuthenticated, isAdmin, CabinetHistoryController.getAll);

// Ruta para obtener el historial por el ID del archivero
router.get('/:cabinetId', CabinetHistoryController.getHistoryByCabinetId);

// Ruta para obtener un historial específico por ID
router.get('/item/:historyId', CabinetHistoryController.getById);

// Crear un nuevo registro en el historial
router.post('/', isAuthenticated, isAdmin, CabinetHistoryController.create); // Se requiere autenticación

// Eliminar un registro del historial
router.delete(
    '/:id',
    isAdmin,
    isAuthenticated,
    CabinetHistoryController.delete,
); // Se requiere autenticación

export default router;
