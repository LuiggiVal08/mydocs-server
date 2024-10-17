import express, { Request, Response } from 'express';
import routerAdmin from './admin.routes';
import routerRole from './role.routes';
import routerExtension from './extension.routes';
import routerDocument from './document.routes';
import routerState from './state.routes';
import routerGender from './gender.routes';
import routerCabinet from './cabinet.routes';
import routerLevel from './level.routes';
import routerHistoryCabinet from './historyCabinet.routes';

const router = express.Router();

router.use('/admin/', routerAdmin);
router.use('/role/', routerRole);
router.use('/extension/', routerExtension);
router.use('/document/', routerDocument);
router.use('/state/', routerState);
router.use('/gender/', routerGender);
router.use('/cabinet/', routerCabinet);
router.use('/level/', routerLevel);
router.use('/cabinet-history/', routerHistoryCabinet);
router.use('/ping/', (_req, res) => {
    res.status(200).json({ ping: 'pong' });
});

router.use('*', (_req: Request, res: Response) => {
    res.status(404).json({ message: 'Recurso no encontrado' });
});

export default router;
