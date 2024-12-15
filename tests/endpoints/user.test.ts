import { loadEnvFile } from 'node:process';
loadEnvFile();

import request from 'supertest';
import { serverApp, serverListen } from '@/index';
import prisma from '@/config/prisma';
const api = request(serverApp);

// const initialUsers = [
//     {
//         id: '1',
//         nombre: 'John',
//         apellido: 'Doe',
//         email: 'john@example.com',
//         contraseña: 'password123',
//         dni: '12345678',
//         direccion: '123 Main St',
//         genero: 'Masculino',
//         celular: '',
//         nombreDeUsuario: 'johndoe',
//         municipioId: '1',
//     },
//     {
//         id: '2',
//         nombre: 'Jane',
//         apellido: 'Smith',
//         email: 'jane@example.com',
//         contraseña: 'password456',
//         dni: '87654321',
//         direccion: '123 Main St',
//         genero: 'Femenino',
//         celular: '',
//         nombreDeUsuario: 'janesmith',
//         municipioId: '1',
//     },
// ];

beforeEach(async () => {
    await prisma.usuario.deleteMany();
    // await prisma.usuario.createMany({
    //     data: initialUsers,
    // });
});

describe('/api/users', () => {
    it('users are return as json', async () => {
        await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    // it('there are two users', async () => {
    //     const response = await api.get('/api/users');
    //     expect(response.body.length).toBe(2);
    // });
});

afterAll(async () => {
    prisma.$disconnect();
    const server = await serverListen;
    server.close();
});
