import { Router } from 'express';
import Document from '@/app/controllers/document.controller';

const route = Router();

route.get('/', Document.getAll);
route.get('/:id', Document.getById);
route.post('/', Document.create);
route.put('/:id', Document.update);
route.delete('/:id', Document.delete);

export default route;
