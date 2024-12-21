"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("@/index");
const prisma_1 = require("@/config/prisma");
const prisma = prisma_1.testPrisma;
const api = (0, supertest_1.default)(index_1.serverApp);
beforeAll(async () => {
    const server = await index_1.serverListen;
    server.close();
});
beforeEach(async () => {
    await prisma.user.deleteMany();
});
describe('/api/users', () => {
    it('users are return as json', async () => {
        await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });
});
afterAll(async () => {
    const server = await index_1.serverListen;
    await prisma.$disconnect();
    await server.close();
});
//# sourceMappingURL=user.test.js.map