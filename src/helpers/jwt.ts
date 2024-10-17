import jwt from 'jsonwebtoken';

export default (payload: string | object | Buffer) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            process.env.JWT_SECRET ?? 'secreto',
            {
                expiresIn: '15m',
            },
            (err, token) => {
                if (err) reject(err);
                resolve(token);
            },
        );
    });
};
