import bcrypt from 'bcryptjs';
import { hashPassword } from '@/helpers/crypto';

jest.mock('bcryptjs', () => ({
    genSalt: jest.fn(),
    hash: jest.fn(),
}));

describe('hashPassword', () => {
    const validPassword = 'mySecurePassword';
    const salt = 'mockSalt';
    const hashedPassword = 'hashedPassword123';

    it('should hash the password successfully', async () => {
        (bcrypt.genSalt as jest.Mock).mockResolvedValue(salt);
        (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);

        const result = await hashPassword(validPassword);

        expect(result).toBe(hashedPassword);
        expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
        expect(bcrypt.hash).toHaveBeenCalledWith(validPassword, salt);
    });

    it('should throw an error if the password is empty', async () => {
        await expect(hashPassword('')).rejects.toThrow('Password must be a non-empty string');
    });

    it('should throw an error if the password is null', async () => {
        await expect(hashPassword(null as unknown as string)).rejects.toThrow('Password must be a non-empty string');
    });

    it('should throw an error if the password is undefined', async () => {
        await expect(hashPassword(undefined as unknown as string)).rejects.toThrow('Password must be a non-empty string');
    });

    it('should throw an error if hashing fails', async () => {
        (bcrypt.genSalt as jest.Mock).mockResolvedValue(salt);
        (bcrypt.hash as jest.Mock).mockRejectedValue(new Error('Hashing error'));

        await expect(hashPassword(validPassword)).rejects.toThrow('Hashing error');
        expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
        expect(bcrypt.hash).toHaveBeenCalledWith(validPassword, salt);
    });
});
