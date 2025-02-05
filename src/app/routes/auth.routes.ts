import { Router } from 'express';
import Auth from '@/app/controllers/auth.controller';

const route = Router();
const routeLogin = Router();

routeLogin.post('/admin', Auth.loginAdmin);
routeLogin.post('/student', Auth.loginStudent);

route.post('/logout', Auth.logout);
route.use('/login', routeLogin);

export default route;
