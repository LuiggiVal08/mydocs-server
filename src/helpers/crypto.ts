import bcrypt from 'bcryptjs';
/**
 * Asynchronously hashes a password using bcrypt.
 * @param pass The password to be hashed.
 * @returns A Promise that resolves with the hashed password or null if an error occurs.
 */
export const hashPassword = async (pass: string): Promise<string> => {
    if (!pass || pass === '') {
        throw new Error('Password must be a non-empty string');
    }
    pass = pass.trim();
    const numberSalt = 10;
    const salt = await bcrypt.genSalt(numberSalt);
    return await bcrypt.hash(pass, salt);
};
