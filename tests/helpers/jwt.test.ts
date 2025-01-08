import jwt from 'jsonwebtoken';
import generateToken from '@/helpers/jwt';
import { JWT_SECRET } from '@/constants';

jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(),
}));

describe('generateToken', () => {
    const payload = { userId: '123' };
    const secret = JWT_SECRET ?? 'secreto';

    beforeAll(() => {
        process.env.JWT_SECRET = secret; // Establece el secreto en el entorno
    });

    it('should generate a JWT token successfully', async () => {
        const mockToken = 'mockToken123';
        (jwt.sign as jest.Mock).mockResolvedValue(mockToken); // Simula el retorno de jwt.sign

        const token = await generateToken(payload);

        expect(token).toBe(mockToken); // Verifica que el token generado sea el esperado
        expect(jwt.sign).toHaveBeenCalledWith(payload, secret, {
            expiresIn: '15m',
            algorithm: 'HS256',
        }); // Verifica que jwt.sign fue llamado con los parámetros correctos
    });

    it('should throw an error if token generation fails', async () => {
        const errorMessage = 'Token generation error';
        (jwt.sign as jest.Mock).mockRejectedValue(new Error(errorMessage)); // Simula un error en jwt.sign

        await expect(generateToken(payload)).rejects.toThrow(errorMessage); // Verifica que se lance el error correcto
    });

    it('should throw an error if payload is undefined', async () => {
        await expect(generateToken(undefined)).rejects.toThrow(); // Verifica que se lance un error
    });

    it('should throw an error if payload is null', async () => {
        await expect(generateToken(null)).rejects.toThrow(); // Verifica que se lance un error
    });

    it('should handle string payload', async () => {
        const stringPayload = 'this is a string payload';
        const mockToken = 'mockStringToken123';
        (jwt.sign as jest.Mock).mockResolvedValue(mockToken);

        const token = await generateToken(stringPayload);

        expect(token).toBe(mockToken);
        expect(jwt.sign).toHaveBeenCalledWith(stringPayload, secret, {
            expiresIn: '15m',
            algorithm: 'HS256',
        });
    });

    it('should handle Buffer payload', async () => {
        const bufferPayload = Buffer.from('this is a Buffer payload');
        const mockToken = 'mockBufferToken123';
        (jwt.sign as jest.Mock).mockResolvedValue(mockToken);

        const token = await generateToken(bufferPayload);

        expect(token).toBe(mockToken);
        expect(jwt.sign).toHaveBeenCalledWith(bufferPayload, secret, {
            expiresIn: '15m',
            algorithm: 'HS256',
        });
    });
    it('should use the default secret if JWT_SECRET is undefined', async () => {
        delete process.env.JWT_SECRET; // Elimina el secreto para simular que no está definido
        const mockToken = 'mockTokenWithDefaultSecret';
        (jwt.sign as jest.Mock).mockResolvedValue(mockToken);

        const token = await generateToken(payload);

        expect(token).toBe(mockToken);
        expect(jwt.sign).toHaveBeenCalledWith(payload, secret, {
            expiresIn: '15m',
            algorithm: 'HS256',
        });
    });
});
