import request from 'supertest';
import { httpServer, app } from '@/app/app';
import models from '@/app/models';
import sequelize from '@/config/sequelize';

const api = request(app);

const initialBuildings = [
    {
        name: 'Building 1',
        location: 'Location 1',
        coreId: '', // Se llenará dinámicamente
    },
    {
        name: 'Building 2',
        location: 'Location 2',
        coreId: '', // Se llenará dinámicamente
    },
];

beforeAll(async () => {
    await sequelize.sync();
    await httpServer.close();
});

beforeEach(async () => {
    await models.Building.destroy({ truncate: true, cascade: true });
    await models.Core.destroy({ truncate: true, cascade: true });

    // Crear núcleos para asociar
    const core = await models.Core.create({
        name: 'Core Test',
        email: 'core@test.com',
        phone: '123456789',
    });

    // Actualizar los coreId en los edificios iniciales
    for (const building of initialBuildings) {
        building.coreId = core?.dataValues.id;
        await models.Building.create(building);
    }
});

describe('GET /api/building', () => {
    it('buildings are returned as JSON', async () => {
        await api
            .get('/api/building')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    it('returns the correct number of buildings', async () => {
        const response = await api.get('/api/building');
        const { buildings } = response.body.data;
        expect(buildings).toHaveLength(initialBuildings.length);
    });
});

describe('GET /api/building/:id', () => {
    it('returns a building as JSON', async () => {
        const building = await models.Building.findOne();
        await api
            .get(`/api/building/${building?.dataValues.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    it('returns 404 for non-existent building', async () => {
        const response = await api.get('/api/building/0');
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Edificio');
    });
});

describe('POST /api/building', () => {
    it('creates a new building', async () => {
        const core = await models.Core.findOne();
        const newBuilding = {
            name: 'Building 3',
            location: 'Location 3',
            coreId: core?.dataValues.id,
        };

        await api
            .post('/api/building')
            .send(newBuilding)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const buildings = await models.Building.findAll();
        expect(buildings).toHaveLength(initialBuildings.length + 1);
    });

    it('fails to create a building with invalid data', async () => {
        const invalidBuilding = {
            name: '',
            location: 'Invalid Location',
            coreId: 'nonexistent',
        };

        const response = await api.post('/api/building').send(invalidBuilding).expect(400);
        expect(response.body.message).toBeDefined();
    });
});

describe('PUT /api/building/:id', () => {
    it('updates a building successfully', async () => {
        const building = await models.Building.findOne();
        const updatedBuilding = {
            name: 'Updated Building',
            location: 'Updated Location',
            coreId: building?.dataValues.coreId,
        };

        await api
            .put(`/api/building/${building?.dataValues.id}`)
            .send(updatedBuilding)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        const updated = await models.Building.findByPk(building?.dataValues.id);
        expect(updated.dataValues.name).toBe(updatedBuilding.name);
        expect(updated.dataValues.location).toBe(updatedBuilding.location);
    });

    it('fails to update a building with invalid data', async () => {
        const building = await models.Building.findOne();
        const invalidData = { name: '' };

        const response = await api.put(`/api/building/${building?.dataValues.id}`).send(invalidData).expect(400);
        expect(response.body.message).toBeDefined();
    });

    it('returns 404 for non-existent building', async () => {
        const updatedBuilding = {
            name: 'Non-existent Building',
            location: 'Non-existent Location',
            coreId: '12345',
        };

        const response = await api.put('/api/building/0').send(updatedBuilding).expect(404);
        expect(response.body.message).toBe('Edificio no encontrado');
    });
});

describe('DELETE /api/building/:id', () => {
    it('deletes a building successfully', async () => {
        const building = await models.Building.findOne();

        await api
            .delete(`/api/building/${building?.dataValues.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        const deletedBuilding = await models.Building.findByPk(building.id);
        expect(deletedBuilding).toBeNull();

        const buildings = await models.Building.findAll();
        expect(buildings).toHaveLength(initialBuildings.length - 1);
    });

    it('fails to delete a non-existent building', async () => {
        await api
            .delete('/api/building/0')
            .expect(404)
            .expect('Content-Type', /application\/json/);
    });
});

afterEach(async () => {
    await models.Building.destroy({ truncate: true, cascade: true });
    await models.Core.destroy({ truncate: true, cascade: true });
});

afterAll(async () => {
    await httpServer.close();
});
