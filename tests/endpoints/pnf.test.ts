import request from 'supertest';
import { httpServer, app } from '@/app/app';
import models from '@/app/models';
import sequelize from '@/config/sequelize';

const api = request(app);

const initialPnfs = [
    {
        name: 'PNF 1',
        description: 'Description 1',
        periodicity: 'Annual',
        coreId: '', // Se llenará dinámicamente
    },
    {
        name: 'PNF 2',
        description: 'Description 2',
        periodicity: 'Biannual',
        coreId: '', // Se llenará dinámicamente
    },
];

beforeAll(async () => {
    await sequelize.sync();
    await httpServer.close();
});

beforeEach(async () => {
    await models.Pnf.destroy({ truncate: true, cascade: true });
    await models.Core.destroy({ truncate: true, cascade: true });

    // Crear núcleos para asociar
    const core = await models.Core.create({
        name: 'Core Test',
        email: 'core@test.com',
        phone: '123456789',
    });

    // Actualizar los coreId en los PNFs iniciales
    for (const pnf of initialPnfs) {
        pnf.coreId = core.dataValues?.id;
        await models.Pnf.create(pnf);
    }
});

describe('GET /api/pnf', () => {
    it('PNFs are returned as JSON', async () => {
        await api
            .get('/api/pnf')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    it('returns the correct number of PNFs', async () => {
        const response = await api.get('/api/pnf');
        const { pnfs, pagination } = response.body.data;
        expect(pnfs).toHaveLength(initialPnfs.length);
        expect(pagination.totalItems).toBe(initialPnfs.length);
    });
});

describe('GET /api/pnf/:id', () => {
    it('returns a PNF as JSON', async () => {
        const pnf = await models.Pnf.findOne();
        await api
            .get(`/api/pnf/${pnf?.dataValues.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    it('returns 404 for non-existent PNF', async () => {
        const response = await api.get('/api/pnf/0');
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('PNF no encontrado');
    });
});

describe('POST /api/pnf', () => {
    it('creates a new PNF', async () => {
        const core = await models.Core.findOne();
        const newPnf = {
            name: 'PNF 3',
            description: 'Description 3',
            periodicity: 'Quarterly',
            coreId: core?.dataValues.id,
        };

        await api
            .post('/api/pnf')
            .send(newPnf)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const pnfs = await models.Pnf.findAll();
        expect(pnfs).toHaveLength(initialPnfs.length + 1);
    });

    it('fails to create a PNF with invalid data', async () => {
        const invalidPnf = {
            name: '',
            description: 'Invalid Description',
            periodicity: 'None',
            coreId: 'nonexistent',
        };

        const response = await api.post('/api/pnf').send(invalidPnf).expect(400);
        expect(response.body.message).toBeDefined();
    });
});

describe('PUT /api/pnf/:id', () => {
    it('updates a PNF successfully', async () => {
        const core = await models.Core.findOne();
        const pnf = await models.Pnf.findOne();
        const updatedPnf = {
            name: 'Updated PNF',
            description: 'Updated Description',
            periodicity: 'Semester',
            coreId: core?.dataValues.id,
        };

        await api
            .put(`/api/pnf/${pnf?.dataValues.id}`)
            .send(updatedPnf)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        const updated = await models.Pnf.findByPk(pnf.id);
        expect(updated.dataValues.name).toBe(updatedPnf.name);
        expect(updated.dataValues.description).toBe(updatedPnf.description);
    });

    it('fails to update a PNF with invalid data', async () => {
        const pnf = await models.Pnf.findOne();
        const invalidData = { name: '' };

        const response = await api.put(`/api/pnf/${pnf?.dataValues.id}`).send(invalidData).expect(400);
        expect(response.body.message).toBeDefined();
    });

    it('returns 404 for non-existent PNF', async () => {
        const updatedPnf = {
            name: 'Non-existent PNF',
            description: 'Non-existent Description',
            periodicity: 'Monthly',
            coreId: '12345',
        };

        const response = await api.put('/api/pnf/0').send(updatedPnf).expect(404);
        expect(response.body.message).toBe('PNF no encontrado');
    });
});

describe('DELETE /api/pnf/:id', () => {
    it('deletes a PNF successfully', async () => {
        const pnf = await models.Pnf.findOne();

        await api
            .delete(`/api/pnf/${pnf.dataValues.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        const deletedPnf = await models.Pnf.findByPk(pnf.dataValues.id);
        expect(deletedPnf).toBeNull();

        const pnfs = await models.Pnf.findAll();
        expect(pnfs).toHaveLength(initialPnfs.length - 1);
    });

    it('fails to delete a non-existent PNF', async () => {
        await api
            .delete('/api/pnf/0')
            .expect(404)
            .expect('Content-Type', /application\/json/);
    });
});

afterEach(async () => {
    await models.Pnf.destroy({ truncate: true, cascade: true });
    await models.Core.destroy({ truncate: true, cascade: true });
});

afterAll(async () => {
    await httpServer.close();
});
