import logger from '@/config/logger';
import type { AuthRequest } from '@/middlewares/auth.middleware';
import Comment from '@/models/comment.model';
import Poll from '@/models/poll.model';
import { formatErrors } from '@/utils/format-error';
import { validateComment } from '@/validators/create-comment.validator';
import { validateId } from '@/validators/id.validator';
import type { Response } from 'express';
import z from 'zod';

class CommentController {
    async create(req: AuthRequest, res: Response): Promise<Response> {
        try {
            const contentType = req.get('content-type');
            if (!contentType?.includes('application/json')) {
                return res.status(415).json({
                    message: 'Tipo de contenido invalido',
                });
            }

            const pollId = Number.parseInt(req.params.pollId) || -1;
            const idResult = validateId(pollId);
            if (!idResult.status) {
                return res.status(422).json({
                    message: 'El id no tiene el formato correcto',
                });
            }

            const validationResult = validateComment(req.body);
            if (!validationResult.status) {
                const { errors } = validationResult;
                return res.status(422).json({
                    message: errors,
                });
            }

            const { text } = req.body;
            const user = req.user;

            const poll = await Poll.findOneBy({ id: pollId });
            if (!poll) {
                return res.status(404).json({
                    message: 'No se encontró la encuenta solicitada',
                });
            }

            const comment = new Comment();
            comment.text = text;
            comment.poll = poll;
            comment.user = user;

            await comment.save();

            return res.status(201).json({
                message: 'Comentario creado exitosamente',
            });
        } catch (exception) {
            logger.error(`${exception as string}`);
            return res.status(500).json({
                message: 'Ocurrio un error en el servidor',
            });
        }
    }

    async update(req: AuthRequest, res: Response): Promise<Response> {
        try {
            const contentType = req.get('content-type');
            if (!contentType?.includes('application/json')) {
                return res.status(415).json({
                    message: 'Tipo de contenido invalido',
                });
            }

            const commentId = Number.parseInt(req.params.commentId) || -1;
            const idResult = validateId(commentId);
            if (!idResult.status) {
                return res.status(422).json({
                    message: 'El id no tiene el formato correcto',
                });
            }

            const comment = await Comment.findOne({
                where: { id: commentId },
                relations: ['user'],
            });
            if (!comment) {
                return res.status(404).json({
                    message: 'El comentario solicitado no existe',
                });
            }

            const authUser = req.user;
            if (comment.user.id !== authUser.id) {
                return res.status(401).json({
                    message: 'No autorizado',
                });
            }

            const validationResult = validateComment(req.body);
            if (!validationResult.status) {
                const { errors } = validationResult;
                return res.status(422).json({
                    message: errors,
                });
            }

            const { text } = req.body;

            comment.text = text;

            await comment.save();

            return res.json({
                message: 'Comentario actualizado',
            });
        } catch (exception) {
            return res.status(500).json({
                message: 'Ocurrio un error en el servidor',
            });
        }
    }

    async delete(req: AuthRequest, res: Response): Promise<Response> {
        try {
            const commentId = Number.parseInt(req.params.commentId) || -1;
            const idResult = validateId(commentId);
            if (!idResult.status) {
                return res.status(422).json({
                    message: idResult.errors,
                });
            }

            const comment = await Comment.findOne({
                where: { id: commentId },
                relations: ['user'],
            });
            if (!comment) {
                return res.status(404).json({
                    message: 'El comentario solicitado no existe',
                });
            }

            const authUser = req.user;
            if (comment.user.id !== authUser.id) {
                return res.status(401).json({
                    message: 'No autorizado',
                });
            }

            await comment.softRemove();

            return res.json({
                message: 'Comentario eliminado',
            });
        } catch (exception) {
            return res.status(500).json({
                message: 'Ocurrio un error en el servidor',
            });
        }
    }

    async findOne(req: AuthRequest, res: Response): Promise<Response> {
        try {
            const commentId = Number.parseInt(req.params.commentId) || -1;
            const idResult = validateId(commentId);
            if (!idResult.status) {
                return res.status(422).json({
                    message: idResult.errors,
                });
            }

            const comment = await Comment.findOne({
                where: { id: commentId },
                relations: ['user'],
            });
            if (!comment) {
                return res.status(404).json({
                    message: 'No se encontró el comentario solicitado',
                });
            }

            return res.json(comment);
        } catch (exception) {
            logger.error(`${exception as string}`);
            return res.status(500).json({
                message: 'Ocurrio un error en el servidor',
            });
        }
    }

    async findAllByPoll(req: AuthRequest, res: Response): Promise<Response> {
        try {
            const pollId = Number.parseInt(req.params.pollId) || -1;
            const idResult = validateId(pollId);
            if (!idResult.status) {
                return res.status(422).json({
                    message: idResult.errors,
                });
            }

            const poll = await Poll.findOneBy({ id: pollId });
            if (!poll) {
                return res.status(404).json({
                    message: 'No se encontró la encuenta solicitada',
                });
            }

            const pageQueryParam = req.query.page as string;
            const limitQueryParam = req.query.limit as string;

            const page = Number.parseInt(pageQueryParam) || 1;
            const limit = Number.parseInt(limitQueryParam) || 5;

            const queryValidator = z.object({
                page: z.number().int().min(1).max(2147483647),
                limit: z.number().int().min(1).max(2147483647),
            });
            const result = queryValidator.safeParse({ page, limit });
            if (!result.success) {
                const formattedErrors = formatErrors(result.error);
                return res.status(422).json({
                    message: formattedErrors,
                });
            }

            const [comments, total] = await Comment.findAndCount({
                where: {
                    poll: { id: pollId },
                },
                relations: ['user'],
                skip: (page - 1) * limit,
                take: limit,
                order: {
                    createdAt: 'DESC',
                },
            });
            const totalPages = Math.ceil(total / limit);

            return res.json({
                comments,
                totalPages,
            });
        } catch (exception) {
            logger.error(`${exception as string}`);
            return res.status(500).json({
                message: 'Ocurrio un error en el servidor',
            });
        }
    }
}

export default new CommentController();
