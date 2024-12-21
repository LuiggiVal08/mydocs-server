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
const MUNICIPALITIES = [
    {
        name: 'Municipio 1',
    },
    {
        name: 'Municipio 2',
    },
];
beforeAll(async () => {
    const server = await index_1.serverListen;
    await server.close();
});
beforeEach(async () => {
    await prisma.municipality.deleteMany();
    for (const municipality of MUNICIPALITIES) {
        let { body } = await api.get('/api/state');
        const states = body.data.states;
        let state;
        if (states.length > 0) {
            state = states[0];
        }
        else {
            state = await prisma.state.create({ data: { name: 'Estado 1' } });
        }
        await prisma.municipality.create({ data: { name: municipality.name, stateId: state.id } });
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
            expect(body.data.municipality).toHaveLength(MUNICIPALITIES.length);
        });
    });
    describe('GET /api/municipality/:id', () => {
        it('should return a municipality by id', async () => {
            const municipality = await prisma.municipality.findFirst();
            await api
                .get(`/api/municipality/${municipality.id}`)
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
            const state = await prisma.state.findFirst();
            const newMunicipality = { name: 'Municipio 3', stateId: state.id };
            await api
                .post('/api/municipality')
                .send(newMunicipality)
                .expect(201)
                .expect('Content-Type', /application\/json/);
            const response = await api.get('/api/municipality');
            const { body } = response;
            expect(body.data.municipality).toHaveLength(MUNICIPALITIES.length + 1);
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
            const municipality = await prisma.municipality.findFirst();
            const updatedMunicipality = { name: 'Municipio Actualizado', stateId: municipality.stateId };
            await api
                .put(`/api/municipality/${municipality.id}`)
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
            const municipality = await prisma.municipality.findFirst();
            const updatedMunicipality = { name: '', stateId: '' };
            const response = await api
                .put(`/api/municipality/${municipality.id}`)
                .send(updatedMunicipality)
                .expect(400)
                .expect('Content-Type', /application\/json/);
            expect(response.body).toHaveProperty('message');
        });
    });
    describe('DELETE /api/municipality/:id', () => {
        it('should delete a municipality', async () => {
            const municipality = await prisma.municipality.findFirst();
            await api
                .delete(`/api/municipality/${municipality.id}`)
                .expect(200)
                .expect('Content-Type', /application\/json/);
            const response = await api.get('/api/municipality');
            expect(response.body.data.municipality).toHaveLength(MUNICIPALITIES.length - 1);
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
    await prisma.$disconnect();
    const server = await index_1.serverListen;
    await server.close();
});
//# sourceMappingURL=municipality.test.js.map