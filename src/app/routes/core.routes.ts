import { Router } from 'express';
import Core from '@/app/controllers/core.controller';
import { isAuthenticated } from '../middlewares';

const route = Router();

route.get('/', isAuthenticated, Core.getAll);
route.get('/:id', isAuthenticated, Core.getById);
route.post('/', isAuthenticated, Core.create);
route.put('/:id', isAuthenticated, Core.update);
route.delete('/:id', isAuthenticated, Core.delete);

export default route;
