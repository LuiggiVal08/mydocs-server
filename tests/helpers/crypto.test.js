"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const crypto_1 = require("../../src/helpers/crypto");
jest.mock('bcryptjs', () => ({
    genSalt: jest.fn(),
    hash: jest.fn(),
}));
describe('hashPassword', () => {
    const validPassword = 'mySecurePassword';
    const salt = 'mockSalt';
    const hashedPassword = 'hashedPassword123';
    it('should hash the password successfully', async () => {
        bcryptjs_1.default.genSalt.mockResolvedValue(salt);
        bcryptjs_1.default.hash.mockResolvedValue(hashedPassword);
        const result = await (0, crypto_1.hashPassword)(validPassword);
        expect(result).toBe(hashedPassword);
        expect(bcryptjs_1.default.genSalt).toHaveBeenCalledWith(10);
        expect(bcryptjs_1.default.hash).toHaveBeenCalledWith(validPassword, salt);
    });
    it('should throw an error if the password is empty', async () => {
        await expect((0, crypto_1.hashPassword)('')).rejects.toThrow('Password must be a non-empty string');
    });
    it('should throw an error if the password is null', async () => {
        await expect((0, crypto_1.hashPassword)(null)).rejects.toThrow('Password must be a non-empty string');
    });
    it('should throw an error if the password is undefined', async () => {
        await expect((0, crypto_1.hashPassword)(undefined)).rejects.toThrow('Password must be a non-empty string');
    });
    it('should return null if hashing fails', async () => {
        bcryptjs_1.default.genSalt.mockResolvedValue(salt);
        bcryptjs_1.default.hash.mockRejectedValue(new Error('Hashing error'));
        const result = await (0, crypto_1.hashPassword)(validPassword);
        expect(result).toBeNull();
        expect(bcryptjs_1.default.genSalt).toHaveBeenCalledWith(10);
        expect(bcryptjs_1.default.hash).toHaveBeenCalledWith(validPassword, salt);
    });
});
//# sourceMappingURL=crypto.test.js.map