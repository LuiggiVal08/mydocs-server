import request from 'supertest';
import { serverApp, serverListen } from '@/index';
import { testPrisma } from '@/config/prisma';

const prisma = testPrisma;
const api = request(serverApp);

beforeAll(async () => {
    const server = await serverListen;
    server.close();
});
beforeEach(async () => {
    await prisma.user.deleteMany();
});

describe('/api/user', () => {
    it('users are return as json', async () => {
        await api
            .get('/api/user')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });
});

afterAll(async () => {
    const server = await serverListen;
    await prisma.$disconnect();
    await server.close();
});
