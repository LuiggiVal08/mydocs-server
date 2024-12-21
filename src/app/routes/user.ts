import express from 'express';
import User from '@/app/controllers/user';
const routes = express.Router();

routes.get('/', User.getAll);

export default routes;
