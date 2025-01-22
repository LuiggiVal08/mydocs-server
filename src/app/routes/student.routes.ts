import { Router } from 'express';
import Student from '@/app/controllers/student.controller';
import User from '@/app/controllers/user.controller';

const route = Router();

route.get('/', Student.getAll);
route.get('/:id', Student.getById);
route.post('/', User.create, Student.create);
route.put('/:id', Student.update);
route.delete('/:id', Student.delete);

export default route;
