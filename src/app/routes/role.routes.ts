import express from 'express';
import RoleCtrl from '@/app/controllers/role.controller';
import { isAuthenticated } from '../middlewares/isAuthenticated ';
import { isAdmin } from '../middlewares/isAdmin';

const Router = express.Router();

Router.post('/', RoleCtrl.createRole);
Router.get('/', isAuthenticated, isAdmin, RoleCtrl.getAllRoles);
Router.get('/:id', isAuthenticated, isAdmin, RoleCtrl.getRolesById);
Router.put('/:id', isAuthenticated, isAdmin, RoleCtrl.updateRole);
Router.delete('/:id', isAuthenticated, isAdmin, RoleCtrl.deleteRole);

export default Router;
