import request from 'supertest';
import { httpServer, app } from '@/app/app';
import models from '@/app/models';
import sequelize from '@/config/sequelize';
import { DocumentCreationAttributes } from '@/app/models/Document';

const api = request(app);

const initialDocuments: DocumentCreationAttributes[] = [
    {
        name: 'DNI',
        description: 'Documento Nacional de Identidad',
    },
    {
        name: 'Partida de Nacimiento',
        description: 'Documento que certifica el nacimiento de una persona',
    },
];

beforeAll(async () => {
    await sequelize.sync();
    await httpServer.close();
});
beforeEach(async () => {
    await models.Document.destroy({ truncate: true, cascade: true });
    for (const extension of initialDocuments) {
        await models.Document.create(extension);
    }
});

describe('GET /api/document', () => {
    it('states are return as json', async () => {
        await api
            .get('/api/document')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    it('there are two states', async () => {
        const response = await api.get('/api/document');
        const { body } = response;
        const { documents } = body.data;
        expect(documents).toHaveLength(initialDocuments.length);
    });
});

describe('GET /api/document/:id', () => {
    it('state is return as json', async () => {
        const extension = await models.Document.findOne();
        await api
            .get(`/api/document/${extension?.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    it('state not found', async () => {
        const stateId = '0';
        const response = await api.get(`/api/document/${stateId}`);
        const { body, status } = response;
        expect(status).toBe(404);
        expect(body).toEqual({ message: 'Documento no encontrado' });
    });
});

describe('POST /api/document', () => {
    it('creates a new state', async () => {
        const newDocument = {
            name: 'Pasaporte',
            description: 'Documento que permite viajar al extranjero',
        };
        await api
            .post('/api/document')
            .send(newDocument)
            .expect(201)
            .expect('Content-Type', /application\/json/);
    });

    it('fails to create a new state', async () => {
        const newDocument = {
            name: '',
        };
        await api
            .post('/api/document')
            .send(newDocument)
            .expect(400)
            .expect('Content-Type', /application\/json/);
    });
});

describe('PUT /api/document/:id', () => {
    it('updates a state', async () => {
        const state = await models.Document.findOne();
        const newDocument: DocumentCreationAttributes = {
            name: 'Pasaporte',
            description: 'Documento que permite viajar al extranjero',
        };
        await api
            .put(`/api/document/${state?.id}`)
            .send(newDocument)
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    it('fails to update a state', async () => {
        const state = await models.Document.findOne();
        const newState = {
            name: '',
        };
        await api
            .put(`/api/document/${state?.id}`)
            .send(newState)
            .expect(400)
            .expect('Content-Type', /application\/json/);
    });
    it('not found extension', async () => {
        const documentId = '0';
        const newDocument: DocumentCreationAttributes = {
            name: 'Notas certificadas',
            description: 'Documento que certifica las notas de un estudiante',
        };
        await api
            .put(`/api/document/${documentId}`)
            .send(newDocument)
            .expect(404)
            .expect('Content-Type', /application\/json/);
    });
});

describe('DELETE /api/document/:id', () => {
    it('deletes a state', async () => {
        const document = await models.Document.findOne();
        await api
            .delete(`/api/document/${document?.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        const documents = await models.Document.findAll();
        expect(documents).toHaveLength(initialDocuments.length - 1);

        const deletedDocument = await models.Document.findByPk(document?.id);
        expect(deletedDocument).toBeNull();
    });

    it('fails to delete a state', async () => {
        const documentId = '01';
        await api
            .delete(`/api/document/${documentId}`)
            .expect(404)
            .expect('Content-Type', /application\/json/);
    });
});
afterEach(async () => {
    await models.Document.destroy({ truncate: true, cascade: true });
});
afterAll(async () => {
    await httpServer.close();
});
