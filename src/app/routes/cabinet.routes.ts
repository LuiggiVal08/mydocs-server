import { Router } from 'express';
import CabinetController from '@/app/controllers/cabinet.controller'; // Asegúrate de la ruta correcta
import { isAdmin, isAuthenticated } from '../middlewares';

const router = Router();

// Rutas para archiveros
router.get('/', isAuthenticated, isAdmin, CabinetController.getAll); // Obtener todos los archiveros
router.get('/:id', isAuthenticated, isAdmin, CabinetController.getById); // Obtener un archivero por ID
router.post('/', isAuthenticated, isAdmin, CabinetController.create); // Crear un nuevo archivero
router.put('/:id', isAuthenticated, isAdmin, CabinetController.update); // Actualizar un archivero
router.delete('/:id', isAuthenticated, isAdmin, CabinetController.delete); // Eliminar un archivero

export default router;
