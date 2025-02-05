import { Router } from 'express';
import Document from '@/app/controllers/document.controller';
import { isAuthenticated } from '../middlewares';

const route = Router();

route.get('/', isAuthenticated, Document.getAll);
route.get('/:id', isAuthenticated, Document.getById);
route.post('/', isAuthenticated, Document.create);
route.put('/:id', isAuthenticated, Document.update);
route.delete('/:id', isAuthenticated, Document.delete);

export default route;
