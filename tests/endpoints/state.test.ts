import request from 'supertest';
import { httpServer, app } from '@/app/app';
import models from '@/app/models';
import sequelize from '@/config/sequelize';

const api = request(app);

const initialStates = [
    {
        name: 'Trujillo',
    },
    {
        name: 'Carabobo',
    },
];

beforeAll(async () => {
    await sequelize.sync();
    await httpServer.close();
});
beforeEach(async () => {
    await models.State.destroy({ truncate: true, cascade: true });
    for (const state of initialStates) {
        await models.State.create(state);
    }
});

describe('GET /api/state', () => {
    it('states are return as json', async () => {
        await api
            .get('/api/state')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    it('returns the correct number of states', async () => {
        const response = await api.get('/api/state');
        const { body } = response;
        const { states, pagination } = body.data;
        expect(states).toHaveLength(initialStates.length);
        expect(pagination.totalItems).toBe(initialStates.length);
    });
});

describe('GET /api/state/:id', () => {
    it('state is return as json', async () => {
        const state = await models.State.findOne();
        await api
            .get(`/api/state/${state?.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    it('state not found', async () => {
        const stateId = '0';
        const response = await api.get(`/api/state/${stateId}`);
        const { body, status } = response;
        expect(status).toBe(404);
        expect(body).toEqual({ message: 'estado no encontrado' });
    });
});

describe('POST /api/state', () => {
    it('creates a new state', async () => {
        const newState = {
            name: 'Lara',
        };
        await api
            .post('/api/state')
            .send(newState)
            .expect(201)
            .expect('Content-Type', /application\/json/);
    });

    it('fails to create a new state', async () => {
        const newState = {
            name: '',
        };
        await api
            .post('/api/state')
            .send(newState)
            .expect(400)
            .expect('Content-Type', /application\/json/);
    });
});

describe('PUT /api/state/:id', () => {
    it('updates a state', async () => {
        const state = await models.State.findOne();
        const newState = {
            name: 'Barinas',
        };
        await api
            .put(`/api/state/${state?.id}`)
            .send(newState)
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    it('fails to update a state', async () => {
        const state = await models.State.findOne();
        const newState = {
            name: '',
        };
        await api
            .put(`/api/state/${state?.id}`)
            .send(newState)
            .expect(400)
            .expect('Content-Type', /application\/json/);
    });
});

describe('DELETE /api/state/:id', () => {
    it('deletes a state', async () => {
        const state = await models.State.findOne();
        await api
            .delete(`/api/state/${state?.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        const states = await models.State.findAll();
        expect(states).toHaveLength(initialStates.length - 1);

        const deletedState = await models.State.findByPk(state?.id);
        expect(deletedState).toBeNull();
    });

    it('fails to delete a state', async () => {
        const stateId = '01';
        await api
            .delete(`/api/state/${stateId}`)
            .expect(404)
            .expect('Content-Type', /application\/json/);
    });
});
afterEach(async () => {
    await models.State.destroy({ truncate: true, cascade: true });
});
afterAll(async () => {
    await httpServer.close();
});
