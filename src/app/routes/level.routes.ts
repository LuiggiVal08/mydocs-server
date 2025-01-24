import { Router } from 'express';
import Level from '@/app/controllers/level.controller';

const route = Router();

route.get('/', Level.getAll);
route.get('/:id', Level.getById);
route.post('/', Level.create);
route.put('/:id', Level.update);
route.delete('/:id', Level.delete);

export default route;
