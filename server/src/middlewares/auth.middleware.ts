import type { Request, Response, NextFunction } from 'express';
import User from '@/models/user.model';
import jwt from 'jsonwebtoken';
import env from '@/config/env';

export interface AuthRequest extends Request {
    user: User;
}

export const authMiddleware = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer')) {
        res.status(401).json({
            message: 'No autorizado',
        });
        return;
    }

    try {
        const token = authorization.split(' ')[1];
        const decode = jwt.verify(
            token,
            env.get('jwt.secret'),
        ) as jwt.JwtPayload;
        const user = await User.findOneBy({ id: decode.id });
        if (!user) {
            res.status(401).json({
                message: 'No autorizado',
            });
            return;
        }
        req.user = user;

        next();
    } catch (ex) {
        res.status(401).json({
            status: false,
            message: 'No autorizado',
        });
    }
};
