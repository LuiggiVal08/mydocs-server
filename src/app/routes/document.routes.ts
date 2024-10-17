import express from 'express';
import DocumentController from '@/app/controllers/document.controller';
import { isAdmin, isAuthenticated } from '../middlewares';

const Router = express.Router();

Router.post('/', isAuthenticated, isAdmin, DocumentController.createDocument);
Router.get('/:id', isAuthenticated, isAdmin, DocumentController.getDocument);
Router.get('/', isAuthenticated, isAdmin, DocumentController.getAllDocuments);
Router.put('/:id', isAuthenticated, isAdmin, DocumentController.updateDocument);
Router.delete('/:id', isAuthenticated, isAdmin, DocumentController.deleteDocument);

export default Router;
