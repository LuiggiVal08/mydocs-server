import express from 'express';
import User from '../controllers/user.controller';
const routes = express.Router();

routes.get('/', User.getAll);

export default routes;
