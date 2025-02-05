import { Router } from 'express';
import Role from '../controllers/role.controller';

const route = Router();

route.get('/', Role.getAll);
route.get('/:id', Role.getById);
route.post('/', Role.create);
route.put('/:id', Role.update);
route.delete('/:id', Role.delete);

export default route;
