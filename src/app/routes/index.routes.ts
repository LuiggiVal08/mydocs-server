import express, { Request, Response } from 'express';
import userRoutes from './user.routes';
import stateRoutes from './state.routes';
import municipalityRoutes from './municipality.routes';

const router = express.Router();

router.use('/ping/', (_req, res) => {
    res.status(200).json({ ping: 'pong' });
});
router.use('/user', userRoutes);
router.use('/state', stateRoutes);
router.use('/municipality', municipalityRoutes);

router.get('/health', (_req, res) => {
    res.status(200).send('OK');
});
router.use('*', (_req: Request, res: Response) => {
    res.status(404).json({ message: 'Recurso no encontrado' });
});

export default router;
