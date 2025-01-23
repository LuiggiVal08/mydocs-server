import { Router } from 'express';
import FileCabinet from '@/app/controllers/fileCabinet.controller';

const route = Router();

route.get('/', FileCabinet.getAll);
route.get('/:id', FileCabinet.getById);
route.post('/', FileCabinet.create);
route.put('/:id', FileCabinet.update);
route.delete('/:id', FileCabinet.delete);

export default route;
