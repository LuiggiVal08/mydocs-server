import jwt from '@/helpers/jwt';
import jsonwebtoken from 'jsonwebtoken';
import { JWT_SECRET } from '@/constants';

jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(),
}));

describe('jwt', () => {
    const payload = { userId: '123' };

    it('should generate a JWT token successfully for "access" type', async () => {
        const mockToken = 'mockToken123';
        (jsonwebtoken.sign as jest.Mock).mockResolvedValue(mockToken); // Simula el retorno de jsonwebtoken.sign

        const token = await jwt(payload, 'access');

        expect(token).toBe(mockToken); // Verifica que el token generado sea el esperado
        expect(jsonwebtoken.sign).toHaveBeenCalledWith(payload, JWT_SECRET, {
            expiresIn: '15m',
            algorithm: 'HS256',
        }); // Verifica los argumentos de jsonwebtoken.sign
    });

    it('should throw an error if token generation fails', async () => {
        const errorMessage = 'Token generation error';
        (jsonwebtoken.sign as jest.Mock).mockRejectedValue(new Error(errorMessage)); // Simula un error en jsonwebtoken.sign

        await expect(jwt(payload, 'access')).rejects.toThrow(errorMessage); // Verifica que se lance el error correcto
    });

    it('should throw an error if payload is undefined', async () => {
        await expect(jwt(undefined, 'access')).rejects.toThrow('Payload is required'); // Verifica que se lance un error
    });

    it('should throw an error if payload is null', async () => {
        await expect(jwt(null, 'access')).rejects.toThrow('Payload is required'); // Verifica que se lance un error
    });

    it('should handle string payload', async () => {
        const stringPayload = 'this is a string payload';
        const mockToken = 'mockStringToken123';
        (jsonwebtoken.sign as jest.Mock).mockResolvedValue(mockToken);

        const token = await jwt(stringPayload, 'access');

        expect(token).toBe(mockToken);
        expect(jsonwebtoken.sign).toHaveBeenCalledWith(stringPayload, JWT_SECRET, {
            expiresIn: '15m',
            algorithm: 'HS256',
        });
    });

    it('should handle Buffer payload', async () => {
        const bufferPayload = Buffer.from('this is a Buffer payload');
        const mockToken = 'mockBufferToken123';
        (jsonwebtoken.sign as jest.Mock).mockResolvedValue(mockToken);

        const token = await jwt(bufferPayload, 'access');

        expect(token).toBe(mockToken);
        expect(jsonwebtoken.sign).toHaveBeenCalledWith(bufferPayload, JWT_SECRET, {
            expiresIn: '15m',
            algorithm: 'HS256',
        });
    });

    it('should generate a JWT token successfully for "refresh" type', async () => {
        const mockToken = 'mockRefreshToken123';
        (jsonwebtoken.sign as jest.Mock).mockResolvedValue(mockToken);

        const token = await jwt(payload, 'refresh');

        expect(token).toBe(mockToken);
        expect(jsonwebtoken.sign).toHaveBeenCalledWith(payload, JWT_SECRET, {
            expiresIn: '7d',
            algorithm: 'HS256',
        });
    });
});
