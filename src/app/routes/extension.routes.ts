import express from 'express';
import ExtensionCtrl from '@/app/controllers/extension.controller';
import { isAdmin, isAuthenticated } from '../middlewares';

const Router = express.Router();

Router.post('/', isAuthenticated, isAdmin, ExtensionCtrl.createExtension); // Crear nueva extensión
Router.get('/', isAuthenticated, isAdmin, ExtensionCtrl.getAllExtensions); // Obtener todas las extensiones
Router.get('/:id', isAuthenticated, isAdmin, ExtensionCtrl.getExtensionById); // Obtener una extensión por ID
Router.put('/:id', isAuthenticated, isAdmin, ExtensionCtrl.updateExtension); // Actualizar una extensión por ID
Router.delete('/:id', isAuthenticated, isAdmin, ExtensionCtrl.deleteExtension); // Eliminar una extensión por ID

export default Router;
