import request from 'supertest';
import { httpServer, app } from '@/app/app';
import models from '@/app/models';
import sequelize from '@/config/sequelize';
import { UserCreationAttributes } from '@/app/models/User';
import crypto from 'node:crypto';
const api = request(app);

const initialUsers: UserCreationAttributes[] = [
    {
        municipalityId: '',
        dni: '12345678',
        name: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        email: 'lucciano.angel@hotmail.com',
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
    await models.Token.destroy({ truncate: true, cascade: true });
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
        const userCreate = await models.User.create(user);
        const token = crypto.randomBytes(32).toString('hex');
        await models.Token.create({
            token,
            userId: userCreate.id,
            expiration: new Date(Date.now() + 86400000),
        });
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
        const { users, pagination } = response.body.data;
        expect(users).toHaveLength(initialUsers.length);
        expect(pagination.totalItems).toBe(initialUsers.length);
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
            email: 'luicciano.08.angel.2002@gmail.com',
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
            email: 'invalidemail',
            phone: '123123123',
            address: 'Invalid Address',
            gender: 'Masculino',
        };

        const response = await api.post('/api/user').send(invalidUser).expect(400);
        expect(response.body.message).toBeDefined();
    });
});
describe('POST /api/user/register', () => {
    it('should register a user with a valid token', async () => {
        const user = await models.User.findOne();
        const token = crypto.randomBytes(32).toString('hex');
        const tokenEntry = await models.Token.create({
            token,
            userId: user.id,
            expiration: new Date(Date.now() + 86400000),
        });
        const res = await api
            .post('/api/user/register')
            .send({
                token: tokenEntry.token,
                username: 'new_user',
                password: 'ValidPass123',
            })
            .expect(200);

        expect(res.body.message).toBe('Registro completado correctamente');

        const updatedUser = await models.User.findByPk(user.id);
        expect(updatedUser.username).toBe('new_user');

        const usedToken = await models.Token.findByPk(tokenEntry.id);
        expect(usedToken.used).toBe(true);
    });

    it('should fail if token is invalid or expired', async () => {
        const tokenEntry = await models.Token.findOne();
        await tokenEntry.update({ used: true });

        const res = await api
            .post('/api/user/register')
            .send({
                token: tokenEntry.token,
                username: 'new_user',
                password: 'ValidPass123',
            })
            .expect(400);

        expect(res.body.message).toBe('Token inválido o expirado');
    });

    it('should fail if username is already taken', async () => {
        const user = await models.User.findOne();
        const token = await models.Token.findOne();
        const res = await api
            .post('/api/user/register')
            .send({
                token: token?.dataValues.token,
                username: user?.username,
                password: 'ValidPass123',
            })
            .expect(400);

        expect(res.body.message).toBe('El nombre de usuario ya está en uso');
    });

    it('should fail if request data is invalid', async () => {
        const res = await api
            .post('/api/user/register')
            .send({
                token: 'valid_token',
                username: '',
                password: '123',
            })
            .expect(400);

        expect(res.body.message).toBe('Datos inválidos');
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
            password: 'Test.2025',
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
