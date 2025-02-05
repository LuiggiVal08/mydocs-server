import request from 'supertest';
import { httpServer, app } from '@/app/app';
import models from '@/app/models';
import sequelize from '@/config/sequelize';

const api = request(app);

const initialRoles = [
    {
        name: 'dev',
    },
    {
        name: 'secretary',
    },
];

beforeAll(async () => {
    await sequelize.sync();
    await httpServer.close();
});
beforeEach(async () => {
    await models.Role.destroy({ truncate: true, cascade: true });
    for (const role of initialRoles) {
        await models.Role.create(role);
    }
});

describe('GET /api/role', () => {
    it('roles are return as json', async () => {
        await api
            .get('/api/role')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    it('returns the correct number of roles', async () => {
        const response = await api.get('/api/role');
        const { body } = response;
        const { roles, pagination } = body.data;
        expect(roles).toHaveLength(initialRoles.length);
        expect(pagination.totalItems).toBe(initialRoles.length);
    });
});

describe('GET /api/role/:id', () => {
    it('role is return as json', async () => {
        const role = await models.Role.findOne();
        await api
            .get(`/api/role/${role?.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    it('state not found', async () => {
        const stateId = '0';
        const response = await api.get(`/api/role/${stateId}`);
        const { body, status } = response;
        expect(status).toBe(404);
        expect(body).toEqual({ message: 'Rol no encontrado' });
    });
});

describe('POST /api/role', () => {
    it('creates a new state', async () => {
        const newRole = {
            name: 'superadmin',
        };
        await api
            .post('/api/role')
            .send(newRole)
            .expect(201)
            .expect('Content-Type', /application\/json/);
    });

    it('fails to create a new role', async () => {
        const newRole = {
            name: '',
        };
        await api
            .post('/api/role')
            .send(newRole)
            .expect(400)
            .expect('Content-Type', /application\/json/);
    });
});

describe('PUT /api/role/:id', () => {
    it('updates a role', async () => {
        const role = await models.Role.findOne();
        const newRole = {
            name: 'superadmin',
        };
        await api
            .put(`/api/role/${role?.id}`)
            .send(newRole)
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    it('fails to update a role', async () => {
        const role = await models.Role.findOne();
        const newRole = {
            name: '',
        };
        await api
            .put(`/api/role/${role?.id}`)
            .send(newRole)
            .expect(400)
            .expect('Content-Type', /application\/json/);
    });
});

describe('DELETE /api/role/:id', () => {
    it('deletes a role', async () => {
        const role = await models.Role.findOne();
        await api
            .delete(`/api/role/${role?.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        const roles = await models.Role.findAll();
        expect(roles).toHaveLength(initialRoles.length - 1);

        const deletedRole = await models.Role.findByPk(role?.id);
        expect(deletedRole).toBeNull();
    });

    it('fails to delete a role', async () => {
        const roleId = '01';
        await api
            .delete(`/api/role/${roleId}`)
            .expect(404)
            .expect('Content-Type', /application\/json/);
    });
});

afterEach(async () => {
    await models.Role.destroy({ truncate: true, cascade: true });
});

afterAll(async () => {
    await httpServer.close();
});
