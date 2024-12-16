import request from 'supertest';
import { serverApp, serverListen } from '@/index';
import prisma from '@/config/prisma';

const api = request(serverApp);

const initialStates = [
    {
        nombre: 'Trujillo',
    },
    {
        nombre: 'Carabobo',
    },
];

beforeEach(async () => {
    await prisma.estado.deleteMany({});
    await Promise.all(
        initialStates.map(async (state) => {
            await prisma.estado.create({ data: state });
        }),
    );
});

describe('GET /api/state', () => {
    it('states are return as json', async () => {
        await api
            .get('/api/state')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    it('there are two states', async () => {
        const response = await api.get('/api/state');
        const { body } = response;
        const { states } = body.data;
        expect(states).toHaveLength(initialStates.length);
    });
});

describe('GET /api/state/:id', () => {
    it('state is return as json', async () => {
        const { body } = await api.get('/api/state');
        const stateId = body.data.states[0].id;
        await api
            .get(`/api/state/${stateId}`)
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
            nombre: 'Lara',
        };
        await api
            .post('/api/state')
            .send(newState)
            .expect(201)
            .expect('Content-Type', /application\/json/);
    });

    it('fails to create a new state', async () => {
        const newState = {
            nombre: '',
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
        const { body } = await api.get('/api/state');
        const stateId = body.data.states[0].id;
        const newState = {
            nombre: 'Barinas',
        };
        await api
            .put(`/api/state/${stateId}`)
            .send(newState)
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    it('fails to update a state', async () => {
        const { body } = await api.get('/api/state');
        const stateId = body.data.states[0].id;
        const newState = {
            nombre: '',
        };
        await api
            .put(`/api/state/${stateId}`)
            .send(newState)
            .expect(400)
            .expect('Content-Type', /application\/json/);
    });
});

describe('DELETE /api/state/:id', () => {
    it('deletes a state', async () => {
        const { body } = await api.get('/api/state');
        const stateId = body.data.states[0].id;
        await api
            .delete(`/api/state/${stateId}`)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        const response = await api.get('/api/state');

        expect(response.body.data.states).toHaveLength(initialStates.length - 1);

        const deletedState = await prisma.estado.findUnique({ where: { id: stateId } });
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

afterAll(async () => {
    prisma.$disconnect();
    const server = await serverListen;
    await server.close();
});
