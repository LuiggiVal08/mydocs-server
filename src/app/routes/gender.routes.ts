import { Router } from 'express';
import GenderController from '@/app/controllers/gender.controller';

const router = Router();

// Crear un nuevo género
router.post('/', GenderController.createGender);

// Obtener todos los géneros
router.get('/', GenderController.getAllGenders);

// Obtener un género por ID
router.get('/:id', GenderController.getGenderById);

// Actualizar un género por ID
router.put('/:id', GenderController.updateGender);

// Eliminar un género por ID
router.delete('/:id', GenderController.deleteGender);

export default router;
