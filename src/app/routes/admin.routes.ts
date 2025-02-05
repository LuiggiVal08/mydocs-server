import { Router } from 'express';
import Admin from '@/app/controllers/admin.controller';
import User from '@/app/controllers/user.controller';
import { isAuthenticated } from '../middlewares';

const route = Router();

route.get('/', isAuthenticated, Admin.getAll);
route.get('/:id', isAuthenticated, Admin.getById);
route.post('/', [isAuthenticated, User.create], Admin.create);
route.post('/setup', Admin.setup);
route.put('/:id', isAuthenticated, Admin.update);
route.delete('/:id', isAuthenticated, Admin.delete);

export default route;
