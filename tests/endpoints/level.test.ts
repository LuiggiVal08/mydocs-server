import request from 'supertest';
import { httpServer, app } from '@/app/app';
import models from '@/app/models';
import sequelize from '@/config/sequelize';
import { LevelCreationAttributes } from '@/app/models/Level';

const api = request(app);

const initialLevels: LevelCreationAttributes[] = [
    {
        name: 'DNI',
        status: true,
        capacity: 100,
        fileCabinetId: '',
    },
    {
        name: 'Partida de Nacimiento',
        status: false,
        capacity: 100,
        fileCabinetId: '',
    },
];

beforeAll(async () => {
    await sequelize.sync();
    await httpServer.close();
});
beforeEach(async () => {
    await models.FileCabinet.destroy({ truncate: true, cascade: true });
    await models.Level.destroy({ truncate: true, cascade: true });

    const fileCabinet = await models.FileCabinet.create({
        name: 'Caja 1',
        status: 'Activo',
        location: 'Caja 1',
    });
    for (const cabinet of initialLevels) {
        cabinet.fileCabinetId = fileCabinet.id;
        await models.Level.create(cabinet);
    }
});

describe('GET /api/level', () => {
    it('file cabinets are return as json', async () => {
        await api
            .get('/api/level')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    it('returns the correct number of levels', async () => {
        const response = await api.get('/api/level');
        const { body } = response;
        const { levels, pagination } = body.data;
        expect(levels).toHaveLength(initialLevels.length);
        expect(pagination.totalItems).toBe(initialLevels.length);
    });
});

describe('GET /api/level/:id', () => {
    it('state is return as json', async () => {
        const level = await models.Level.findOne();
        await api
            .get(`/api/level/${level?.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    it('state not found', async () => {
        const levelId = '0';
        const response = await api.get(`/api/level/${levelId}`);
        const { body, status } = response;
        expect(status).toBe(404);
        expect(body).toEqual({ message: 'Nivel no encontrado' });
    });
});

describe('POST /api/level', () => {
    it('creates a new state', async () => {
        const fileCabinet = await models.FileCabinet.findOne();
        const newLevel: LevelCreationAttributes = {
            name: 'Pasaporte',
            status: false,
            capacity: 100,
            fileCabinetId: fileCabinet?.id,
        };
        await api
            .post('/api/level')
            .send(newLevel)
            .expect(201)
            .expect('Content-Type', /application\/json/);
    });

    it('fails to create a new state', async () => {
        const newLevel = {
            name: '',
        };
        await api
            .post('/api/level')
            .send(newLevel)
            .expect(400)
            .expect('Content-Type', /application\/json/);
    });
});

describe('PUT /api/level/:id', () => {
    it('updates a state', async () => {
        const fileCabinet = await models.FileCabinet.findOne();
        const level = await models.Level.findOne();
        const newLevel: LevelCreationAttributes = {
            name: 'Pasaporte',
            status: false,
            capacity: 100,
            fileCabinetId: fileCabinet?.id,
        };
        await api
            .put(`/api/level/${level?.id}`)
            .send(newLevel)
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    it('fails to update a state', async () => {
        const level = await models.Level.findOne();
        const newLevel = {
            name: '',
        };
        await api
            .put(`/api/level/${level?.id}`)
            .send(newLevel)
            .expect(400)
            .expect('Content-Type', /application\/json/);
    });
    it('not found extension', async () => {
        const fileCabinet = await models.FileCabinet.findOne();
        const levelId = '0';
        const newLevel: LevelCreationAttributes = {
            name: 'Notas certificadas',
            status: false,
            capacity: 100,
            fileCabinetId: fileCabinet?.id,
        };
        await api
            .put(`/api/level/${levelId}`)
            .send(newLevel)
            .expect(404)
            .expect('Content-Type', /application\/json/);
    });
});

describe('DELETE /api/level/:id', () => {
    it('deletes a state', async () => {
        const fileCabinet = await models.Level.findOne();
        await api
            .delete(`/api/level/${fileCabinet?.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        const levels = await models.Level.findAll();
        expect(levels).toHaveLength(initialLevels.length - 1);

        const deletedLevel = await models.Level.findByPk(fileCabinet?.id);
        expect(deletedLevel).toBeNull();
    });

    it('fails to delete a state', async () => {
        const levelId = '01';
        await api
            .delete(`/api/level/${levelId}`)
            .expect(404)
            .expect('Content-Type', /application\/json/);
    });
});
afterEach(async () => {
    await models.FileCabinet.destroy({ truncate: true, cascade: true });
    await models.Level.destroy({ truncate: true, cascade: true });
});
afterAll(async () => {
    await httpServer.close();
});
