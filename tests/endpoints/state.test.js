"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("@/index");
const prisma_1 = require("@/config/prisma");
const prisma = prisma_1.testPrisma;
const api = (0, supertest_1.default)(index_1.serverApp);
const initialStates = [
    {
        name: 'Trujillo',
    },
    {
        name: 'Carabobo',
    },
];
beforeAll(async () => {
    const server = await index_1.serverListen;
    server.close();
});
beforeEach(async () => {
    await prisma.state.deleteMany({});
    for (const state of initialStates) {
        await prisma.state.create({ data: state });
    }
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
        const state = await prisma.state.findFirst();
        await api
            .get(`/api/state/${state.id}`)
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
        const state = await prisma.state.findFirst();
        const newState = {
            name: 'Barinas',
        };
        await api
            .put(`/api/state/${state.id}`)
            .send(newState)
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });
    it('fails to update a state', async () => {
        const state = await prisma.state.findFirst();
        const newState = {
            name: '',
        };
        await api
            .put(`/api/state/${state.id}`)
            .send(newState)
            .expect(400)
            .expect('Content-Type', /application\/json/);
    });
});
describe('DELETE /api/state/:id', () => {
    it('deletes a state', async () => {
        const state = await prisma.state.findFirst();
        await api
            .delete(`/api/state/${state.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/);
        const states = await prisma.state.findMany();
        expect(states).toHaveLength(initialStates.length - 1);
        const deletedState = await prisma.state.findUnique({ where: { id: state.id } });
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
    await prisma.state.deleteMany();
});
afterAll(async () => {
    await prisma.$disconnect();
    const server = await index_1.serverListen;
    await server.close();
});
//# sourceMappingURL=state.test.js.map