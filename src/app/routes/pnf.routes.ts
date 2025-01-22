import { Router } from 'express';
import Pnf from '@/app/controllers/pnf.controller';

const route = Router();

route.get('/', Pnf.getAll);
route.get('/:id', Pnf.getById);
route.post('/', Pnf.create);
route.put('/:id', Pnf.update);
route.delete('/:id', Pnf.delete);

export default route;
