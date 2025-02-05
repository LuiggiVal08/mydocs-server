import { Router } from 'express';
import Building from '@/app/controllers/building.controller';
import { isAuthenticated } from '../middlewares';

const route = Router();

route.get('/', isAuthenticated, Building.getAll);
route.get('/:id', isAuthenticated, Building.getById);
route.post('/', isAuthenticated, Building.create);
route.put('/:id', isAuthenticated, Building.update);
route.delete('/:id', isAuthenticated, Building.delete);

export default route;
