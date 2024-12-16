import bcrypt from 'bcryptjs';
import { hashPassword } from '../../src/helpers/crypto';

jest.mock('bcryptjs', () => ({
    genSalt: jest.fn(),
    hash: jest.fn(),
}));

describe('hashPassword', () => {
    const validPassword = 'mySecurePassword';
    const salt = 'mockSalt';
    const hashedPassword = 'hashedPassword123';

    it('should hash the password successfully', async () => {
        (bcrypt.genSalt as jest.Mock).mockResolvedValue(salt); // Simula el retorno de genSalt
        (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword); // Simula el retorno de hash

        const result = await hashPassword(validPassword);

        expect(result).toBe(hashedPassword); // Verifica que el resultado sea el esperado
        expect(bcrypt.genSalt).toHaveBeenCalledWith(10); // Verifica que genSalt se haya llamado con 10
        expect(bcrypt.hash).toHaveBeenCalledWith(validPassword, salt); // Verifica que hash se haya llamado con los parámetros correctos
    });

    it('should throw an error if the password is empty', async () => {
        await expect(hashPassword('')).rejects.toThrow('Password must be a non-empty string'); // Verifica que se lance el error correcto
    });

    it('should throw an error if the password is null', async () => {
        await expect(hashPassword(null as unknown as string)).rejects.toThrow('Password must be a non-empty string'); // Verifica que se lance el error correcto
    });

    it('should throw an error if the password is undefined', async () => {
        await expect(hashPassword(undefined as unknown as string)).rejects.toThrow(
            'Password must be a non-empty string',
        ); // Verifica que se lance el error correcto
    });

    it('should return null if hashing fails', async () => {
        (bcrypt.genSalt as jest.Mock).mockResolvedValue(salt);
        (bcrypt.hash as jest.Mock).mockRejectedValue(new Error('Hashing error')); // Simula un error en bcrypt.hash

        const result = await hashPassword(validPassword);

        expect(result).toBeNull(); // Verifica que el resultado sea null
        expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
        expect(bcrypt.hash).toHaveBeenCalledWith(validPassword, salt);
    });
});
