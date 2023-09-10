// import User from '@/models/user.model';
import jwt from 'jsonwebtoken';
import env from '@config/env';

const secret = env.get('jwt.secret');

export const generateToken = (id: number): string => {
    return jwt.sign({ id }, secret, {
        expiresIn: '30d',
    });
};

export const verifyToken = (token: string): boolean => {
    try {
        // const decode = jwt.verify(token, secret);
        return true;
    } catch (exception) {
        return false;
    }
};
