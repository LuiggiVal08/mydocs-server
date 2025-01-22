import express from 'express';
import User from '../controllers/user.controller';
const routes = express.Router();

routes.get('/', User.getAll);
routes.get('/:id', User.getById);
routes.post('/', User.create, (req, res) => {
    res.status(201).json({ message: 'Usuario creado exitosamente', data: req.body });
});
routes.put('/:id', User.update);
routes.delete('/:id', User.delete);

export default routes;
