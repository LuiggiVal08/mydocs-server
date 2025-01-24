import request from 'supertest';
import { httpServer, app } from '@/app/app';
import models from '@/app/models';
import sequelize from '@/config/sequelize';
import { AdministratorCreationAttributes } from '@/app/models/Administrator';
import { UserCreationAttributes } from '@/app/models/User';

const api = request(app);

const initialAdmins: AdministratorCreationAttributes[] = [
    {
        userId: '',
        roleId: '',
        status: 'Activo',
    },
    {
        userId: '',
        roleId: '',
        status: 'Inactivo',
    },
];

beforeAll(async () => {
    await sequelize.sync();
    await httpServer.close();
});

beforeEach(async () => {
    await models.Administrator.destroy({ truncate: true, cascade: true });
    await models.User.destroy({ truncate: true, cascade: true });
    await models.Role.destroy({ truncate: true, cascade: true });
    await models.State.destroy({ truncate: true, cascade: true });
    const state = await models.State.create({ name: 'State Test' });
    const municipality = await models.Municipality.create({
        name: 'Municipality Test',
        stateId: state.dataValues.id,
    });
    // Datos iniciales
    const role = await models.Role.create({ name: 'admin' });
    const user1 = await models.User.create({
        dni: '12345678',
        name: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        email: 'johndoe@example.com',
        phone: '123456789',
        password: 'password123',
        gender: 'Masculino',
        dateOfBirth: new Date(),
        address: '123 Main St',
        municipalityId: municipality.dataValues.id,
    });
    const user2 = await models.User.create({
        dni: '87654321',
        name: 'Jane',
        lastName: 'Smith',
        username: 'janesmith',
        email: 'janesmith@example.com',
        phone: '987654321',
        password: 'password123',
        gender: 'Femenino',
        dateOfBirth: new Date(),
        address: '456 Oak St',
        municipalityId: municipality.dataValues.id,
    });

    initialAdmins[0].userId = user1?.dataValues.id;
    initialAdmins[0].roleId = role?.dataValues.id;
    initialAdmins[1].userId = user2?.dataValues.id;
    initialAdmins[1].roleId = role?.dataValues.id;

    await models.Administrator.bulkCreate(initialAdmins);
});

describe('GET /api/admin', () => {
    it('retrieves all admins as JSON', async () => {
        const response = await api
            .get('/api/admin')
            .expect(200)
            .expect('Content-Type', /application\/json/);
        expect(response.body.data.admins).toHaveLength(initialAdmins.length);
    });
    it('returns the correct number of admins', async () => {
        const response = await api.get('/api/admin');
        const { admins, pagination } = response.body.data;
        expect(admins).toHaveLength(initialAdmins.length);
        expect(pagination.totalItems).toBe(initialAdmins.length);
    });
});

describe('GET /api/admin/:id', () => {
    it('retrieves an admin by ID as JSON', async () => {
        const admin = await models.Administrator.findOne();
        const response = await api
            .get(`/api/admin/${admin.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        expect(response.body.data.admin.id).toBe(admin.id);
    });

    it('returns 404 for a non-existent admin', async () => {
        const response = await api.get('/api/admin/0').expect(404);
        expect(response.body.message).toBe('administrador no encontrado');
    });
});

describe('POST /api/admin', () => {
    it('creates a new admin', async () => {
        const role = await models.Role.findOne();
        const municipality = await models.Municipality.findOne();
        const user: UserCreationAttributes = {
            dni: '11223344',
            name: 'New',
            lastName: 'User',
            username: 'newuser',
            email: 'newuser@example.com',
            phone: '123123123',
            password: 'password123',
            address: '123 Main St',
            municipalityId: municipality.dataValues.id,
            gender: 'Masculino',
            dateOfBirth: new Date(),
        };

        const newAdmin = {
            ...user,
            roleId: role.dataValues.id,
            status: 'Activo',
        };

        const response = await api
            .post('/api/admin')
            .send(newAdmin)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        expect(response.body.data.admin).toBeDefined();
        // expect(response.body.data.admin.userId).toBe(newAdmin.userId);
    });

    it('fails to create an admin with invalid data', async () => {
        const invalidAdmin = {
            userId: '', // ID inválido
            roleId: '', // ID inválido
            status: 'InvalidStatus',
        };

        const response = await api.post('/api/admin').send(invalidAdmin).expect(400);
        expect(response.body.message).toBeDefined();
    });
});

describe('PUT /api/admin/:id', () => {
    it('updates an existing admin', async () => {
        const admin = await models.Administrator.findOne();
        const updatedData = { ...admin.dataValues, status: 'Inactivo' };

        await api
            .put(`/api/admin/${admin.id}`)
            .send(updatedData)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        const updatedAdmin = await models.Administrator.findByPk(admin.id);
        expect(updatedAdmin.status).toBe(updatedData.status);
    });

    it('returns 404 for a non-existent admin', async () => {
        const response = await api.put('/api/admin/0').send({ status: 'Inactivo' }).expect(404);
        expect(response.body.message).toBe('Administrator no encontrado');
    });
});

describe('DELETE /api/admin/:id', () => {
    it('deletes an admin successfully', async () => {
        const admin = await models.Administrator.findOne();

        await api.delete(`/api/admin/${admin.id}`).expect(200);

        const deletedAdmin = await models.Administrator.findByPk(admin.id);
        expect(deletedAdmin).toBeNull();
    });

    it('returns 404 for a non-existent admin', async () => {
        const response = await api.delete('/api/admin/0').expect(404);
        expect(response.body.message).toBe('Administrator no encontrado');
    });
});

afterEach(async () => {
    await models.Administrator.destroy({ truncate: true, cascade: true });
    await models.User.destroy({ truncate: true, cascade: true });
    await models.Role.destroy({ truncate: true, cascade: true });
});

afterAll(async () => {
    await sequelize.close();
});
