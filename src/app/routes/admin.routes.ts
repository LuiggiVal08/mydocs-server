import express from 'express';
import AdminCtrl from '@/app/controllers/admin.controller';
import { isAuthenticated, isAdmin } from '@/app/middlewares';

const Router = express.Router();

// Ruta de login
Router.post('/login', AdminCtrl.login);

// Ruta para cerrar la sesión
Router.get('/logout', AdminCtrl.logout);

// Ruta para crear un nuevo administrador
Router.post('/', isAuthenticated, isAdmin, AdminCtrl.createAdmin);

// Ruta para registrar un administrador usando el token
Router.post('/register', AdminCtrl.registerAdmin);

// Ruta para obtener todos los administradores
Router.get('/', isAuthenticated, isAdmin, AdminCtrl.getAllAdmins);

// Ruta para obtener detalles de un administrador por ID
Router.get('/:id', isAuthenticated, isAdmin, AdminCtrl.getAdminById);

// Ruta para actualizar la información de un administrador
Router.put('/:id', isAuthenticated, isAdmin, AdminCtrl.updateAdmin);

// Ruta para eliminar un administrador por ID
Router.delete('/:id', isAuthenticated, isAdmin, AdminCtrl.deleteAdmin);

// Ruta para registrar al desarrollador
Router.post('/register-developer', AdminCtrl.registerDeveloper);

export default Router;
