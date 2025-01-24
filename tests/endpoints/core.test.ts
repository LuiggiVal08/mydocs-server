import request from 'supertest';
import { httpServer, app } from '@/app/app';
import models from '@/app/models';
import sequelize from '@/config/sequelize';

const api = request(app);

const initialCores = [
    {
        name: 'Core 1',
        email: 'core1@example.com',
        phone: '1234567890',
    },
    {
        name: 'Core 2',
        email: 'core2@example.com',
        phone: '0987654321',
    },
];

beforeAll(async () => {
    await sequelize.sync();
    await httpServer.close();
});

beforeEach(async () => {
    await models.Core.destroy({ truncate: true, cascade: true });
    for (const core of initialCores) {
        await models.Core.create(core);
    }
});

describe('GET /api/core', () => {
    it('cores are returned as JSON', async () => {
        await api
            .get('/api/core')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    it('returns the correct number of cores', async () => {
        const response = await api.get('/api/core');
        const { cores, pagination } = response.body.data;
        expect(cores).toHaveLength(initialCores.length);
        expect(pagination.totalItems).toBe(initialCores.length);
    });
});

describe('GET /api/core/:id', () => {
    it('returns a core as JSON', async () => {
        const core = await models.Core.findOne();
        await api
            .get(`/api/core/${core?.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    it('returns 404 for non-existent core', async () => {
        const response = await api.get('/api/core/0');
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ message: 'Nucleo no encontrado' });
    });
});

describe('POST /api/core', () => {
    it('creates a new core', async () => {
        const newCore = {
            name: 'Core 3',
            email: 'core3@example.com',
            phone: '1122334455',
        };
        await api
            .post('/api/core')
            .send(newCore)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const cores = await models.Core.findAll();
        expect(cores).toHaveLength(initialCores.length + 1);
    });

    it('fails to create a core with invalid data', async () => {
        const invalidCore = {
            name: '',
            email: 'invalidemail',
            phone: '',
        };
        const response = await api.post('/api/core').send(invalidCore).expect(400);

        expect(response.body.message).toBeDefined();
    });
});

describe('PUT /api/core/:id', () => {
    it('updates a core successfully', async () => {
        const core = await models.Core.findOne();
        const updatedCore = {
            name: 'Updated Core',
            email: 'updated@example.com',
            phone: '5566778899',
        };

        await api
            .put(`/api/core/${core.dataValues?.id}`)
            .send(updatedCore)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        const updated = await models.Core.findByPk(core.dataValues?.id);
        expect(updated.dataValues?.name).toBe(updatedCore.name);
        expect(updated.dataValues?.email).toBe(updatedCore.email);
        expect(updated.dataValues?.phone).toBe(updatedCore.phone);
    });

    it('fails to update a core with invalid data', async () => {
        const core = await models.Core.findOne();
        const invalidData = {
            name: '',
        };

        const response = await api.put(`/api/core/${core.dataValues?.id}`).send(invalidData).expect(400);

        expect(response.body.message).toBeDefined();
    });

    it('returns 404 for non-existent core', async () => {
        const updatedCore = {
            name: 'Non-existent Core',
            email: 'nonexistent@example.com',
            phone: '0000000000',
        };

        const response = await api.put('/api/core/0').send(updatedCore).expect(404);

        expect(response.body.message).toBe('Nucleo no encontrado');
    });
});

describe('DELETE /api/core/:id', () => {
    it('deletes a core successfully', async () => {
        const core = await models.Core.findOne();

        await api
            .delete(`/api/core/${core.dataValues?.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        const deletedCore = await models.Core.findByPk(core.dataValues?.id);
        expect(deletedCore).toBeNull();

        const cores = await models.Core.findAll();
        expect(cores).toHaveLength(initialCores.length - 1);
    });

    it('fails to delete a non-existent core', async () => {
        await api
            .delete('/api/core/0')
            .expect(404)
            .expect('Content-Type', /application\/json/);
    });
});

afterEach(async () => {
    await models.Core.destroy({ truncate: true, cascade: true });
});

afterAll(async () => {
    await httpServer.close();
});
