import express from 'express';
import LevelController from '@/app/controllers/level.controller';

const router = express.Router();

// Ruta para crear un nuevo nivel (cabinet_id desde params)
router.post('/cabinet/:cabinet_id', LevelController.createLevel);

// Ruta para obtener todos los niveles (incluye carpetas)
router.get('/', LevelController.getAllLevels);

// Ruta para obtener niveles por cabinet_id (incluye carpetas)
router.get('/cabinet/:cabinet_id', LevelController.getLevelsByCabinetId);

// Ruta para obtener un nivel por su id (incluye carpetas)
router.get('/:id', LevelController.getLevelById);

// Ruta para actualizar un nivel por su id
router.put('/:id', LevelController.updateLevel);

// Ruta para eliminar un nivel por su id
router.delete('/:id', LevelController.deleteLevel);

export default router;
