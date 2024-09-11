import express from 'express';
import routerAdmin from './admin.routes';
import routerRole from './role.routes';
import routerExtension from './extension.routes';
import routerDocument from './document.routes';
import routerState from './state.routes';
import routerGender from './gender.routes';
const router = express.Router();

router.use('/admin/', routerAdmin);
router.use('/role/', routerRole);
router.use('/extension/', routerExtension);
router.use('/document/', routerDocument);
router.use('/state/', routerState);
router.use('/gender/', routerGender);
router.use('/ping/', (_req, res) => {
    res.status(200).json({ ping: 'pong' })
});

export default router;
