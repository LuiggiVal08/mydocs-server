import type { Request } from 'express';
import type { JwtPayload } from 'jsonwebtoken';

/**
 * Defines the structure of the JWT payload for user requests.
 * @property {string} userId - The user ID as a string.
 * @property {number} roleId - The role ID as a number.
 */
interface JwtPayloadUserReq extends JwtPayload {
    userId: string; // UUID como string
    roleId?: number; // ID de rol como número
}

/**
 * Extends the Request interface to include user information, including user ID and role ID.
 * Includes an additional property for token expiration.
 * Extends the Request interface to include user information, including user ID and role ID.
 * Includes an additional property for token expiration.
 * @extends Request
 * @property {JwtPayloadUserReq} user - The user information as a JWT payload.
 * @property {number} tokenExpiration - The token expiration timestamp.
 * @property {string} token - The JWT token.
 */
interface AuthenticatedRequest extends Request {
    user?: JwtPayloadUserReq;
    tokenExpiration?: number; // Timestamp de expiración del token
}
