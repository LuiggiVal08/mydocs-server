import { Router } from 'express';
import Building from '@/app/controllers/building.controller';

const route = Router();

route.get('/', Building.getAll);
route.get('/:id', Building.getById);
route.post('/', Building.create);
route.put('/:id', Building.update);
route.delete('/:id', Building.delete);

export default route;
