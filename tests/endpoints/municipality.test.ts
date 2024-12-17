import request from 'supertest';
import { serverApp, serverListen } from '@/index';
import prisma from '@/config/prisma';

const api = request(serverApp);

const MUNICIPALITIES = [
    {
        nombre: 'Municipio 1',
    },
    {
        nombre: 'Municipio 2',
    },
];

beforeAll(async () => {
    const server = await serverListen;
    await server.close();
});

beforeEach(async () => {
    // await prisma.estado.deleteMany();
    // let states = await prisma.estado.findMany();
    let { body } = await api.get('/api/state');
    const states = body.data.states;
    console.log(body);
    let state;
    if (states.length > 0) {
        state = states[0];
    } else {
        state = await prisma.estado.create({ data: { nombre: 'Estado 1' } });
    }
    await prisma.municipio.deleteMany();
    for (const municipality of MUNICIPALITIES) {
        await prisma.municipio.create({ data: { nombre: municipality.nombre, estadoId: state.id } });
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
            const municipality = await prisma.municipio.findFirst();
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
            const state = await prisma.estado.findFirst();
            const newMunicipality = { nombre: 'Municipio 3', estadoId: state.id };
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
            const municipality = await prisma.municipio.findFirst();
            const updatedMunicipality = { nombre: 'Municipio Actualizado', estadoId: municipality.estadoId };
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
            const municipality = await prisma.municipio.findFirst();
            const updatedMunicipality = { nombre: '', estadoId: '' };
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
            const municipality = await prisma.municipio.findFirst();
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
    const server = await serverListen;
    await server.close();
});
