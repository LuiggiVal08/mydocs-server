import request from 'supertest';
import { httpServer, app } from '@/app/app';
import models from '@/app/models';
import sequelize from '@/config/sequelize';
import { ExtensionCreationAttributes } from '@/app/models/Extension';

const api = request(app);

const initialExtensions: ExtensionCreationAttributes[] = [
    {
        name: 'PDF',
    },
    {
        name: 'PNG',
    },
];

beforeAll(async () => {
    await sequelize.sync();
    await httpServer.close();
});
beforeEach(async () => {
    await models.Extension.destroy({ truncate: true, cascade: true });
    for (const extension of initialExtensions) {
        await models.Extension.create(extension);
    }
});

describe('GET /api/extension', () => {
    it('states are return as json', async () => {
        await api
            .get('/api/extension')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    it('returns the correct number of extensions', async () => {
        const response = await api.get('/api/extension');
        const { body } = response;
        const { extensions, pagination } = body.data;
        expect(extensions).toHaveLength(initialExtensions.length);
        expect(pagination.totalItems).toBe(initialExtensions.length);
    });
});

describe('GET /api/extension/:id', () => {
    it('state is return as json', async () => {
        const extension = await models.Extension.findOne();
        await api
            .get(`/api/extension/${extension?.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    it('state not found', async () => {
        const stateId = '0';
        const response = await api.get(`/api/extension/${stateId}`);
        const { body, status } = response;
        expect(status).toBe(404);
        expect(body).toEqual({ message: 'Extensión no encontrada' });
    });
});

describe('POST /api/extension', () => {
    it('creates a new state', async () => {
        const newState = {
            name: 'Lara',
        };
        await api
            .post('/api/extension')
            .send(newState)
            .expect(201)
            .expect('Content-Type', /application\/json/);
    });

    it('fails to create a new state', async () => {
        const newState = {
            name: '',
        };
        await api
            .post('/api/extension')
            .send(newState)
            .expect(400)
            .expect('Content-Type', /application\/json/);
    });
});

describe('PUT /api/extension/:id', () => {
    it('updates a state', async () => {
        const state = await models.Extension.findOne();
        const newState = {
            name: 'Barinas',
        };
        await api
            .put(`/api/extension/${state?.id}`)
            .send(newState)
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    it('fails to update a state', async () => {
        const state = await models.Extension.findOne();
        const newState = {
            name: '',
        };
        await api
            .put(`/api/extension/${state?.id}`)
            .send(newState)
            .expect(400)
            .expect('Content-Type', /application\/json/);
    });
    it('not found extension', async () => {
        const extensionId = '0';
        const newExtension: ExtensionCreationAttributes = {
            name: 'JPG',
        };
        await api
            .put(`/api/extension/${extensionId}`)
            .send(newExtension)
            .expect(404)
            .expect('Content-Type', /application\/json/);
    });
});

describe('DELETE /api/extension/:id', () => {
    it('deletes a state', async () => {
        const state = await models.Extension.findOne();
        await api
            .delete(`/api/extension/${state?.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        const extensions = await models.Extension.findAll();
        expect(extensions).toHaveLength(initialExtensions.length - 1);

        const deletedState = await models.Extension.findByPk(state?.id);
        expect(deletedState).toBeNull();
    });

    it('fails to delete a state', async () => {
        const stateId = '01';
        await api
            .delete(`/api/extension/${stateId}`)
            .expect(404)
            .expect('Content-Type', /application\/json/);
    });
});
afterEach(async () => {
    await models.Extension.destroy({ truncate: true, cascade: true });
});
afterAll(async () => {
    await httpServer.close();
});
