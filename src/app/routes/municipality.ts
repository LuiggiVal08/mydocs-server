import { Router } from 'express';
import Municipality from '@/app/controllers/municipality';

const route = Router();

route.get('/', Municipality.getAll);
route.get('/:id', Municipality.getById);
route.post('/', Municipality.create);
route.put('/:id', Municipality.update);
route.delete('/:id', Municipality.delete);

export default route;
