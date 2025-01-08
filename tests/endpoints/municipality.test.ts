import request from 'supertest';
import { app, httpServer } from '@/app/app';
import models from '@/app/models';
import sequelize from '@/config/sequelize';

const api = request(app);

const MUNICIPALITIES = [
    {
        name: 'Municipio 1',
    },
    {
        name: 'Municipio 2',
    },
];

beforeAll(async () => {
    await sequelize.sync();
    await httpServer.close();
});

beforeEach(async () => {
    await models.Municipality?.destroy({ truncate: true, cascade: true });
    for (const municipality of MUNICIPALITIES) {
        let { body } = await api.get('/api/state');
        const states = body?.data.states;
        let state;
        if (states.length > 0) {
            state = states[0];
        } else {
            state = await models.State.create({ name: 'Estado 1' });
        }
        await models.Municipality?.create({ name: municipality?.name, stateId: state.id });
    }
});

describe('Municipality API', () => {
    describe('GET /api/municipality', () => {
        it('should return municipalities as json', async () => {
            await api
                .get('/api/municipality')
                .expect(200)
                .expect('Content-Type', /application\/json/);
        });

        it('should return two municipalities', async () => {
            const response = await api.get('/api/municipality');
            const { body } = response;
            expect(body?.data.municipality).toHaveLength(MUNICIPALITIES.length);
        });
    });

    describe('GET /api/municipality/:id', () => {
        it('should return a municipality by id', async () => {
            const municipality = await models.Municipality?.findOne();

            await api
                .get(`/api/municipality/${municipality?.id}`)
                .expect(200)
                .expect('Content-Type', /application\/json/);
        });

        it('should return 404 for a non-existent municipality', async () => {
            const municipalityId = '0';
            const response = await api.get(`/api/municipality/${municipalityId}`);
            expect(response.status).toBe(404);
            expect(response.body).toEqual({ message: 'municipio no encontrado' });
        });
    });

    describe('POST /api/municipality', () => {
        it('should create a new municipality', async () => {
            const state = await models.State.findOne();

            const newMunicipality = { name: 'Municipio 3', stateId: state?.dataValues.id };
            await api
                .post('/api/municipality')
                .send(newMunicipality)
                .expect(201)
                .expect('Content-Type', /application\/json/);

            const response = await api.get('/api/municipality');
            const { body } = response;
            expect(body?.data.municipality).toHaveLength(MUNICIPALITIES.length + 1);
        });

        it('should fail to create a municipality with invalid data', async () => {
            const newMunicipality = { nombre: '', estadoId: '' };
            const response = await api
                .post('/api/municipality')
                .send(newMunicipality)
                .expect(400)
                .expect('Content-Type', /application\/json/);
            expect(response.body).toHaveProperty('message');
        });
    });

    describe('PUT /api/municipality/:id', () => {
        it('should update an existing municipality', async () => {
            const municipality = await models.Municipality?.findOne();
            const updatedMunicipality = { name: 'Municipio Actualizado', stateId: municipality?.dataValues.stateId };
            await api
                .put(`/api/municipality/${municipality?.id}`)
                .send(updatedMunicipality)
                .expect(200)
                .expect('Content-Type', /application\/json/);
        });
        it('should return to update 404 for a non-existent municipality', async () => {
            const municipalityId = '0';
            const response = await api.put(`/api/municipality/${municipalityId}`);
            expect(response.status).toBe(404);
            expect(response.body).toEqual({ message: 'municipio no encontrado' });
        });
        it('should fail to update a municipality with invalid data', async () => {
            const municipality = await models.Municipality?.findOne();
            const updatedMunicipality = { name: '', stateId: '' };
            const response = await api
                .put(`/api/municipality/${municipality?.id}`)
                .send(updatedMunicipality)
                .expect(400)
                .expect('Content-Type', /application\/json/);
            expect(response.body).toHaveProperty('message');
        });
    });

    describe('DELETE /api/municipality/:id', () => {
        it('should delete a municipality', async () => {
            const municipality = await models.Municipality?.findOne();
            await api
                .delete(`/api/municipality/${municipality?.id}`)
                .expect(200)
                .expect('Content-Type', /application\/json/);

            const response = await api.get('/api/municipality');
            expect(response.body?.data.municipality).toHaveLength(MUNICIPALITIES.length - 1);
        });

        it('should fail to delete a non-existent municipality', async () => {
            const municipalityId = '01';
            const response = await api
                .delete(`/api/municipality/${municipalityId}`)
                .expect(404)
                .expect('Content-Type', /application\/json/);
            expect(response.body).toHaveProperty('message');
        });
    });
});

afterAll(async () => {
    await httpServer.close();
});
