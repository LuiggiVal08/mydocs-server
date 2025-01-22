import { Router } from 'express';
import Admin from '@/app/controllers/admin.controller';
import User from '@/app/controllers/user.controller';

const route = Router();

route.get('/', Admin.getAll);
route.get('/:id', Admin.getById);
route.post('/', User.create, Admin.create);
route.put('/:id', Admin.update);
route.delete('/:id', Admin.delete);

export default route;
