import express, { type Request, type Response } from 'express';
import userRoutes from './user.routes';
import stateRoutes from './state.routes';
import municipalityRoutes from './municipality.routes';
import coreRoutes from './core.routes';
import buildingRoutes from './buildings.routes';
import pnfRoutes from './pnf.routes';
import studentRoutes from './student.routes';
import adminRoutes from './admin.routes';
import extensionRoutes from './extension.routes';
import documentRoutes from './document.routes';
import fileCabinetRoutes from './fileCabinet.routes';

const router = express.Router();

router.use('/admin', adminRoutes);
router.use('/building', buildingRoutes);
router.use('/core', coreRoutes);
router.use('/document', documentRoutes);
router.use('/extension', extensionRoutes);
router.use('/file-cabinet', fileCabinetRoutes);
router.use('/municipality', municipalityRoutes);
router.use('/student', studentRoutes);
router.use('/state', stateRoutes);
router.use('/user', userRoutes);
router.use('/pnf', pnfRoutes);

router.get('/health', (_req, res) => {
    res.status(200).json({
        status: 'ok',
        uptime: process.uptime(), // Tiempo que lleva tu app activa
        timestamp: Date.now(), // Hora actual
    });
});
router.use('*', (_req: Request, res: Response) => {
    res.status(404).json({ message: 'Recurso no encontrado' });
});

export default router;
