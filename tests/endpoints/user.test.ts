import request from 'supertest';
import { app, httpServer } from '@/app/app';
import models from '@/app/models';
import sequelize from '@/config/sequelize';

const api = request(app);

beforeAll(async () => {
    await sequelize.sync();
    await httpServer.close();
});
beforeEach(async () => {
    await models.User.destroy({ truncate: true, cascade: true });
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
    await httpServer.close();
});
