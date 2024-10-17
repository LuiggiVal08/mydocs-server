import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface JwtPayloadUserReq extends JwtPayload {
    userId: string; // UUID como string
    roleId: number; // ID de rol como número
}

export interface AuthenticatedRequest extends Request {
    // user?:  {
    //     userId: string; // UUID como string
    //     roleId: number; // ID de rol como número
    //     iat: number; // Timestamp de "issued at"
    //     exp: number; // Timestamp de "expiration"
    // };
    user?: JwtPayloadUserReq;
    tokenExpiration?: number; // Timestamp de expiración del token
}
