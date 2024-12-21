"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_1 = __importDefault(require("../../src/helpers/jwt"));
jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(),
}));
describe('generateToken', () => {
    const payload = { userId: '123' };
    const secret = 'secreto';
    beforeAll(() => {
        process.env.JWT_SECRET = secret;
    });
    it('should generate a JWT token successfully', async () => {
        const mockToken = 'mockToken123';
        jsonwebtoken_1.default.sign.mockResolvedValue(mockToken);
        const token = await (0, jwt_1.default)(payload);
        expect(token).toBe(mockToken);
        expect(jsonwebtoken_1.default.sign).toHaveBeenCalledWith(payload, secret, {
            expiresIn: '15m',
            algorithm: 'HS256',
        });
    });
    it('should throw an error if token generation fails', async () => {
        const errorMessage = 'Token generation error';
        jsonwebtoken_1.default.sign.mockRejectedValue(new Error(errorMessage));
        await expect((0, jwt_1.default)(payload)).rejects.toThrow(errorMessage);
    });
    it('should throw an error if payload is undefined', async () => {
        await expect((0, jwt_1.default)(undefined)).rejects.toThrow();
    });
    it('should throw an error if payload is null', async () => {
        await expect((0, jwt_1.default)(null)).rejects.toThrow();
    });
    it('should handle string payload', async () => {
        const stringPayload = 'this is a string payload';
        const mockToken = 'mockStringToken123';
        jsonwebtoken_1.default.sign.mockResolvedValue(mockToken);
        const token = await (0, jwt_1.default)(stringPayload);
        expect(token).toBe(mockToken);
        expect(jsonwebtoken_1.default.sign).toHaveBeenCalledWith(stringPayload, secret, {
            expiresIn: '15m',
            algorithm: 'HS256',
        });
    });
    it('should handle Buffer payload', async () => {
        const bufferPayload = Buffer.from('this is a Buffer payload');
        const mockToken = 'mockBufferToken123';
        jsonwebtoken_1.default.sign.mockResolvedValue(mockToken);
        const token = await (0, jwt_1.default)(bufferPayload);
        expect(token).toBe(mockToken);
        expect(jsonwebtoken_1.default.sign).toHaveBeenCalledWith(bufferPayload, secret, {
            expiresIn: '15m',
            algorithm: 'HS256',
        });
    });
    it('should use the default secret if JWT_SECRET is undefined', async () => {
        delete process.env.JWT_SECRET;
        const mockToken = 'mockTokenWithDefaultSecret';
        jsonwebtoken_1.default.sign.mockResolvedValue(mockToken);
        const token = await (0, jwt_1.default)(payload);
        expect(token).toBe(mockToken);
        expect(jsonwebtoken_1.default.sign).toHaveBeenCalledWith(payload, 'secreto', {
            expiresIn: '15m',
            algorithm: 'HS256',
        });
    });
});
//# sourceMappingURL=jwt.test.js.map