import { Router } from 'express';
import Extension from '@/app/controllers/extension.controller';

const route = Router();

route.get('/', Extension.getAll);
route.get('/:id', Extension.getById);
route.post('/', Extension.create);
route.put('/:id', Extension.update);
route.delete('/:id', Extension.delete);

export default route;
