import { Router } from 'express';
import StateController from '@/app/controllers/state.controller';

const router = Router();

// Rutas para el controlador de estados
router.post('/', StateController.createState); // Crear un nuevo estado
router.get('/:id', StateController.getState); // Obtener un estado por ID
router.get('/', StateController.getAllStates); // Obtener todos los estados
router.delete('/:id', StateController.deleteState); // Eliminar un estado por ID

// Ruta para insertar municipios en bloque
router.post('/municipalities/bulk', StateController.bulkInsertMunicipalities);

export default router;
