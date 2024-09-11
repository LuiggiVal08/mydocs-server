import express from 'express';
import DocumentController from '@/app/controllers/document.controller';

const Router = express.Router();

Router.post('/', DocumentController.createDocument);
Router.get('/:id', DocumentController.getDocument);
Router.get('/', DocumentController.getAllDocuments);
Router.put('/:id', DocumentController.updateDocument);
Router.delete('/:id', DocumentController.deleteDocument);

export default Router;
