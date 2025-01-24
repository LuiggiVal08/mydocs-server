import request from 'supertest';
import { httpServer, app } from '@/app/app';
import models from '@/app/models';
import sequelize from '@/config/sequelize';
import { FileCabinetCreationAttributes } from '@/app/models/FileCabinet';

const api = request(app);

const initialFileCabinets: FileCabinetCreationAttributes[] = [
    {
        name: 'DNI',
        status: 'Activo',
        location: 'Caja 1',
    },
    {
        name: 'Partida de Nacimiento',
        status: 'Activo',
        location: 'Caja 1',
    },
];

beforeAll(async () => {
    await sequelize.sync();
    await httpServer.close();
});
beforeEach(async () => {
    await models.FileCabinet.destroy({ truncate: true, cascade: true });
    for (const cabinet of initialFileCabinets) {
        await models.FileCabinet.create(cabinet);
    }
});

describe('GET /api/file-cabinet', () => {
    it('file cabinets are return as json', async () => {
        await api
            .get('/api/file-cabinet')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    it('returns the correct number of cabinets', async () => {
        const response = await api.get('/api/file-cabinet');
        const { body } = response;
        const { fileCabinets, pagination } = body.data;
        expect(fileCabinets).toHaveLength(initialFileCabinets.length);
        expect(pagination.totalItems).toBe(initialFileCabinets.length);
    });
});

describe('GET /api/file-cabinet/:id', () => {
    it('cabinet is return as json', async () => {
        const fileCabinet = await models.FileCabinet.findOne();
        await api
            .get(`/api/file-cabinet/${fileCabinet?.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    it('cabinet not found', async () => {
        const fileCabinetId = '0';
        const response = await api.get(`/api/file-cabinet/${fileCabinetId}`);
        const { body, status } = response;
        expect(status).toBe(404);
        expect(body).toEqual({ message: 'Archivero no encontrado' });
    });
});

describe('POST /api/file-cabinet', () => {
    it('creates a new cabinet', async () => {
        const newFileCabinet = {
            name: 'Pasaporte',
            status: 'Activo',
            location: 'Caja 1',
        };
        await api
            .post('/api/file-cabinet')
            .send(newFileCabinet)
            .expect(201)
            .expect('Content-Type', /application\/json/);
    });

    it('fails to create a new cabinet', async () => {
        const newFileCabinet = {
            name: '',
        };
        await api
            .post('/api/file-cabinet')
            .send(newFileCabinet)
            .expect(400)
            .expect('Content-Type', /application\/json/);
    });
});

describe('PUT /api/file-cabinet/:id', () => {
    it('updates a cabinet', async () => {
        const fileCabinet = await models.FileCabinet.findOne();
        const newFileCabinet: FileCabinetCreationAttributes = {
            name: 'Pasaporte',
            status: 'Activo',
            location: 'Caja 1',
        };
        await api
            .put(`/api/file-cabinet/${fileCabinet?.id}`)
            .send(newFileCabinet)
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    it('fails to update a cabinet', async () => {
        const fileCabinet = await models.FileCabinet.findOne();
        const newFileCabinet = {
            name: '',
        };
        await api
            .put(`/api/file-cabinet/${fileCabinet?.id}`)
            .send(newFileCabinet)
            .expect(400)
            .expect('Content-Type', /application\/json/);
    });
    it('not found cabinet', async () => {
        const fileCabinetId = '0';
        const newFileCabinet: FileCabinetCreationAttributes = {
            name: 'Notas certificadas',
            status: 'Activo',
            location: 'Caja 1',
        };
        await api
            .put(`/api/file-cabinet/${fileCabinetId}`)
            .send(newFileCabinet)
            .expect(404)
            .expect('Content-Type', /application\/json/);
    });
});

describe('DELETE /api/file-cabinet/:id', () => {
    it('deletes a cabinet', async () => {
        const fileCabinet = await models.FileCabinet.findOne();
        await api
            .delete(`/api/file-cabinet/${fileCabinet?.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        const fileCabinets = await models.FileCabinet.findAll();
        expect(fileCabinets).toHaveLength(initialFileCabinets.length - 1);

        const deletedfileCabinet = await models.FileCabinet.findByPk(fileCabinet?.id);
        expect(deletedfileCabinet).toBeNull();
    });

    it('fails to delete a cabinet', async () => {
        const fileCabinetId = '01';
        await api
            .delete(`/api/file-cabinet/${fileCabinetId}`)
            .expect(404)
            .expect('Content-Type', /application\/json/);
    });
});
afterEach(async () => {
    await models.FileCabinet.destroy({ truncate: true, cascade: true });
});
afterAll(async () => {
    await httpServer.close();
});
