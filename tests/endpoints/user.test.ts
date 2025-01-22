import request from 'supertest';
import { httpServer, app } from '@/app/app';
import models from '@/app/models';
import sequelize from '@/config/sequelize';
import { UserCreationAttributes } from '@/app/models/User';

const api = request(app);

const initialUsers: UserCreationAttributes[] = [
    {
        municipalityId: '',
        dni: '12345678',
        name: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        email: 'johndoe@example.com',
        phone: '123456789',
        password: 'password123',
        address: '123 Main St',
        gender: 'Masculino',
        dateOfBirth: new Date(),
    },
    {
        municipalityId: '',
        dni: '87654321',
        name: 'Jane',
        lastName: 'Smith',
        username: 'janesmith',
        email: 'janesmith@example.com',
        phone: '987654321',
        password: 'password123',
        address: '456 Oak St',
        gender: 'Femenino',
        dateOfBirth: new Date(),
    },
];

beforeAll(async () => {
    await sequelize.sync();
    await httpServer.close();
});

beforeEach(async () => {
    await models.User.destroy({ truncate: true, cascade: true });
    await models.Municipality.destroy({ truncate: true, cascade: true });
    const state = await models.State.create({
        name: 'State test',
    });
    // Crear municipios para asociar
    const municipality = await models.Municipality.create({
        name: 'Municipality Test',
        stateId: state.dataValues.id,
    });

    // Actualizar los municipalityId en los usuarios iniciales
    for (const user of initialUsers) {
        user.municipalityId = municipality?.dataValues.id;
        await models.User.create(user);
    }
});

describe('GET /api/user', () => {
    it('users are returned as JSON', async () => {
        await api
            .get('/api/user')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    it('returns the correct number of users', async () => {
        const response = await api.get('/api/user');
        const { data } = response.body;
        expect(data.users).toHaveLength(initialUsers.length);
    });
});

describe('GET /api/user/:id', () => {
    it('returns a user as JSON', async () => {
        const user = await models.User.findOne();
        await api
            .get(`/api/user/${user?.dataValues.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    it('returns 404 for non-existent user', async () => {
        const response = await api.get('/api/user/0');
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Usuario no encontrado');
    });
});

describe('POST /api/user', () => {
    it('creates a new user', async () => {
        const municipality = await models.Municipality.findOne();

        const newUser: UserCreationAttributes = {
            dni: '123123123',
            name: 'New User',
            lastName: 'New LastName',
            username: 'newuser',
            email: 'newuser@example.com',
            phone: '123123123',
            password: 'password123',
            address: '123 New St',
            municipalityId: municipality?.dataValues.id,
            gender: 'Masculino',
            dateOfBirth: new Date('2002-10-08T00:00:00Z'),
        };

        await api
            .post('/api/user')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const users = await models.User.findAll();
        expect(users).toHaveLength(initialUsers.length + 1);
    });

    it('fails to create a user with invalid data', async () => {
        const municipality = await models.Municipality.findOne();
        const invalidUser = {
            municipalityId: municipality?.dataValues.id,
            dni: '',
            name: '',
            lastName: '',
            username: '',
            email: 'invalidemail',
            phone: '123123123',
            password: '123',
            address: 'Invalid Address',
            gender: 'Masculino',
        };

        const response = await api.post('/api/user').send(invalidUser).expect(400);
        expect(response.body.message).toBeDefined();
    });
});

describe('PUT /api/user/:id', () => {
    it('updates a user successfully', async () => {
        const user = await models.User.findOne();
        const updatedUser = {
            ...user.dataValues,
            name: 'Updated Name',
            lastName: 'Updated LastName',
            username: 'updateduser',
        };
        await api
            .put(`/api/user/${user?.dataValues.id}`)
            .send(updatedUser)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        const updated = await models.User.findByPk(user?.dataValues.id);
        expect(updated.dataValues.name).toBe(updatedUser.name);
        expect(updated.dataValues.lastName).toBe(updatedUser.lastName);
    });

    it('fails to update a user with invalid data', async () => {
        const user = await models.User.findOne();
        const invalidData = { name: '' };

        const response = await api.put(`/api/user/${user?.dataValues.id}`).send(invalidData).expect(400);
        expect(response.body.message).toBeDefined();
    });

    it('returns 404 for non-existent user', async () => {
        const updatedUser = {
            name: 'Non-existent User',
            lastName: 'Non-existent LastName',
            username: 'nonexistentuser',
        };

        const response = await api.put('/api/user/0').send(updatedUser).expect(404);
        expect(response.body.message).toBe('Usuario no encontrado');
    });
});

describe('DELETE /api/user/:id', () => {
    it('deletes a user successfully', async () => {
        const user = await models.User.findOne();

        await api
            .delete(`/api/user/${user?.dataValues.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        const deletedUser = await models.User.findByPk(user?.dataValues.id);
        expect(deletedUser).toBeNull();

        const users = await models.User.findAll();
        expect(users).toHaveLength(initialUsers.length - 1);
    });

    it('fails to delete a non-existent user', async () => {
        await api
            .delete('/api/user/0')
            .expect(404)
            .expect('Content-Type', /application\/json/);
    });
});

afterEach(async () => {
    await models.User.destroy({ truncate: true, cascade: true });
    await models.Municipality.destroy({ truncate: true, cascade: true });
});

afterAll(async () => {
    await httpServer.close();
});
