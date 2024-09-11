import express from 'express';
import ExtensionCtrl from '@/app/controllers/extension.controller';

const Router = express.Router();

Router.post('/', ExtensionCtrl.createExtension); // Crear nueva extensión
Router.get('/', ExtensionCtrl.getAllExtensions); // Obtener todas las extensiones
Router.get('/:id', ExtensionCtrl.getExtensionById); // Obtener una extensión por ID
Router.put('/:id', ExtensionCtrl.updateExtension); // Actualizar una extensión por ID
Router.delete('/:id', ExtensionCtrl.deleteExtension); // Eliminar una extensión por ID

export default Router;
