import type { Request, Response, NextFunction } from 'express';

export const notFoundMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<Response> => {
    return res.status(404).json({
        message: 'No encontrado',
        url: req.originalUrl,
        method: req.method,
    });
};
