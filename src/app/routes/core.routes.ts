import { Router } from 'express';
import Core from '@/app/controllers/core.controller';

const route = Router();

route.get('/', Core.getAll);
route.get('/:id', Core.getById);
route.post('/', Core.create);
route.put('/:id', Core.update);
route.delete('/:id', Core.delete);

export default route;
