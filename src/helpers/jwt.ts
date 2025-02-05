import { JWT_SECRET } from '@/constants';
import jsonwebtoken from 'jsonwebtoken';

/**
 * Asynchronously generates a JWT token based on the provided payload.
 *
 * @param {string | object | Buffer} payload - The data to be included in the JWT token. Can be a string, object, or Buffer.
 * @returns A Promise that resolves with the generated JWT token.
 * @throws Any error that occurs during the token generation process.
 */
type JWT = (payload: string | object | Buffer, type: 'access' | 'refresh') => Promise<string>;

const jwt: JWT = async (payload, type): Promise<string> => {
    if (!type) {
        throw new Error('Type is required');
    }
    if (!payload) {
        throw new Error('Payload is required');
    }
    const token = await jsonwebtoken.sign(payload, JWT_SECRET, {
        expiresIn: type === 'access' ? '15m' : '7d',
        algorithm: 'HS256',
    });
    return token;
};

export default jwt;
