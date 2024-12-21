import express, { Request, Response } from 'express';
import userRoutes from './user';
import stateRoutes from './state';
import municipalityRoutes from './municipality';

const router = express.Router();

router.use('/ping/', (_req, res) => {
    res.status(200).json({ ping: 'pong' });
});

router.use('/user', userRoutes);
router.use('/state', stateRoutes);
router.use('/municipality', municipalityRoutes);

router.use('/health', (_req: Request, res: Response) => {
    res.status(200).json({ status: 'UP' });
});

router.use('*', (_req: Request, res: Response) => {
    res.status(404).json({ message: 'Recurso no encontrado' });
});

export default router;
