import request from 'supertest';
import { httpServer, app } from '@/app/app';
import models from '@/app/models';
import sequelize from '@/config/sequelize';
import { UserCreationAttributes } from '@/app/models/User';

const api = request(app);

const initialStudents = [
    {
        userId: '',
        active: true,
    },
    {
        userId: '',
        active: false,
    },
];

beforeAll(async () => {
    await sequelize.sync();
    await httpServer.close();
});

beforeEach(async () => {
    await models.Student.destroy({ truncate: true, cascade: true });
    await models.User.destroy({ truncate: true, cascade: true });
    await models.Municipality.destroy({ truncate: true, cascade: true });

    // Crea datos iniciales
    const state = await models.State.create({ name: 'State Test' });
    const municipality = await models.Municipality.create({
        name: 'Municipality Test',
        stateId: state.dataValues.id,
    });
    const user1 = await models.User.create({
        dni: '12345678',
        name: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        email: 'johndoe@example.com',
        phone: '123456789',
        password: 'password123',
        address: '123 Main St',
        gender: 'Masculino',
        municipalityId: municipality.dataValues.id,
        dateOfBirth: new Date(),
    });

    const user2 = await models.User.create({
        dni: '87654321',
        name: 'Jane',
        lastName: 'Smith',
        username: 'janesmith',
        email: 'janesmith@example.com',
        phone: '987654321',
        password: 'password123',
        address: '456 Oak St',
        gender: 'Femenino',
        municipalityId: municipality.dataValues.id,
        dateOfBirth: new Date(),
    });

    initialStudents[0].userId = user1?.dataValues.id;
    initialStudents[1].userId = user2?.dataValues.id;

    await models.Student.bulkCreate(initialStudents);
});

describe('GET /api/student', () => {
    it('retrieves all students as JSON', async () => {
        const response = await api
            .get('/api/student')
            .expect(200)
            .expect('Content-Type', /application\/json/);

        expect(response.body.data.students).toHaveLength(initialStudents.length);
    });
});

describe('GET /api/student/:id', () => {
    it('retrieves a student by ID as JSON', async () => {
        const student = await models.Student.findOne();
        const response = await api
            .get(`/api/student/${student.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        expect(response.body.data.student.id).toBe(student.id);
    });

    it('returns 404 for a non-existent student', async () => {
        const response = await api.get('/api/student/0').expect(404);
        expect(response.body.message).toBe('Estudiante no encontrado');
    });
});

describe('POST /student/', () => {
    it('creates a new student along with a user', async () => {
        const municipality = await models.Municipality.findOne();

        const newUser: UserCreationAttributes = {
            dni: '123456781',
            name: 'John',
            lastName: 'Doe',
            username: 'johndoe_2',
            email: 'johndoe2@example.com',
            phone: '0423456789',
            password: 'password123',
            address: '123 Main St',
            municipalityId: municipality?.dataValues.id,
            gender: 'Masculino',
            dateOfBirth: new Date('2002-10-08T00:00:00Z'),
        };

        const response = await api
            .post('/api/student')
            .send({ ...newUser, active: true })
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const { student } = response.body.data;

        expect(student).toBeDefined();
        expect(student.userId).toBeDefined();

        // Verifica que el user asociado también fue creado
        const createdUser = await models.User.findByPk(student.userId);
        expect(createdUser).not.toBeNull();
        expect(createdUser?.dni).toBe(newUser.dni);
    });

    it('fails to create a student with invalid user data', async () => {
        const invalidUser = {
            dni: '', // Campo inválido
            name: '',
            username: '',
            email: 'invalidemail',
            phone: '123123123',
            password: '123', // Demasiado corto
            address: 'Invalid Address',
            gender: 'Masculino',
            dateOfBirth: 'Invalid Date', // Fecha inválida
        };

        const newStudent = {
            activo: true,
        };

        const response = await api
            .post('/api/student')
            .send({ ...invalidUser, ...newStudent })
            .expect(400);
        expect(response.body.message).toBeDefined();
    });

    it('returns 404 if municipality does not exist', async () => {
        const newUser = {
            dni: '12345678',
            name: 'John',
            lastName: 'Doe',
            username: 'johndoe',
            email: 'johndoe@example.com',
            phone: '123456789',
            password: 'password123',
            address: '123 Main St',
            municipalityId: 'non-existent-id',
            gender: 'Masculino',
            dateOfBirth: new Date('2002-10-08'),
        };

        const newStudent = {
            activo: true,
        };

        const response = await api
            .post('/api/student')
            .send({ ...newUser, ...newStudent })
            .expect(404);
        expect(response.body.message).toBe('Municipio no encontrado');
    });
});

describe('PUT /api/student/:id', () => {
    it('updates an existing student', async () => {
        const student = await models.Student.findOne();
        const updatedData = { ...student?.dataValues, active: false };

        await api
            .put(`/api/student/${student.dataValues.id}`)
            .send(updatedData)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        const updatedStudent = await models.Student.findByPk(student.id);
        expect(updatedStudent.dataValues.active).toBe(updatedData.active);
    });

    it('returns 404 for a non-existent student', async () => {
        const response = await api.put('/api/student/0').send({ active: false }).expect(404);
        expect(response.body.message).toBe('Estudiante no encontrado');
    });
});

describe('DELETE /api/student/:id', () => {
    it('deletes a student successfully', async () => {
        const student = await models.Student.findOne();

        await api.delete(`/api/student/${student.id}`).expect(200);

        const deletedStudent = await models.Student.findByPk(student.id);
        expect(deletedStudent).toBeNull();

        const students = await models.Student.findAll();
        expect(students).toHaveLength(initialStudents.length - 1);
    });

    it('returns 404 for a non-existent student', async () => {
        const response = await api.delete('/api/student/0').expect(404);
        expect(response.body.message).toBe('Estudiante no encontrado');
    });
});

afterEach(async () => {
    await models.Student.destroy({ truncate: true, cascade: true });
    await models.User.destroy({ truncate: true, cascade: true });
});

afterAll(async () => {
    await sequelize.close();
});
