import { Router } from 'express';
import State from '../controllers/state.controller';

const route = Router();

route.get('/', State.getAll);
route.get('/:id', State.getById);
route.post('/', State.create);
route.put('/:id', State.update);
route.delete('/:id', State.delete);

export default route;
