import { JWT_SECRET } from '@/constants';
import jwt from 'jsonwebtoken';

/**
 * Asynchronously generates a JWT token based on the provided payload.
 *
 * @param payload - The data to be included in the JWT token. Can be a string, object, or Buffer.
 * @returns A Promise that resolves with the generated JWT token.
 * @throws Any error that occurs during the token generation process.
 */
export default async (payload: string | object | Buffer) => {
    try {
        //linea 12
        const token = await jwt.sign(payload, JWT_SECRET ?? 'secreto', {
            expiresIn: '15m',
            algorithm: 'HS256', // Example algorithm, replace with appropriate one
        });
        return token;
    } catch (err) {
        throw err;
    }
};
