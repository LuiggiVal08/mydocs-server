// import logger from '@/config/logger';
import bcrypt from 'bcryptjs';
/**
 * Asynchronously hashes a password using bcrypt.
 *
 * @param pass The password to be hashed.
 * @returns A Promise that resolves with the hashed password or null if an error occurs.
 */
export const hashPassword = async (pass: string) => {
    if (!pass || pass.trim() === '') {
        throw new Error('Password must be a non-empty string');
    }
    try {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(pass, salt);
    } catch (err) {
        throw err;
    }
};
