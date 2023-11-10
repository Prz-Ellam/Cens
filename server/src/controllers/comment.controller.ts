import logger from '@/config/logger';
import type { AuthRequest } from '@/middlewares/auth.middleware';
import Comment from '@/models/comment.model';
import Poll from '@/models/poll.model';
import CommentService from '@/services/comment.service';
import { validateCreateComment } from '@/validators/create-comment.validator';
import { validateId } from '@/validators/id.validator';
import type { Response } from 'express';
import { z } from 'zod';

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

            const validationResult = validateCreateComment(req.body);
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

            const comment = await CommentService.findOneById(commentId);
            if (!comment) {
                return res.status(404).json({
                    message: 'El comentario solicitado no existe',
                });
            }

            const user = req.user;
            if (comment.user.id !== user.id) {
                return res.status(401).json({
                    message: 'No autorizado',
                });
            }

            const validateComment = z.object({
                text: z.string().min(1).max(255),
            });
            const result = validateComment.safeParse(req.body);
            if (!result.success) {
                const formattedErrors = result.error.issues.map((issue) => ({
                    field: issue.path.join('.'),
                    message: issue.message,
                }));
                return res.status(422).json({
                    message: formattedErrors,
                });
            }

            // Validar la entrada del texto
            const { text } = req.body;
            // logger.info(text);

            comment.text = text;
            // logger.info(comment.text);

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

            const comment = await CommentService.findOneById(commentId);
            if (!comment) {
                return res.status(404).json({
                    message: 'El comentario solicitado no existe',
                });
            }

            const user = req.user;
            if (comment.user.id !== user.id) {
                return res.status(401).json({
                    message: 'El comentario no le pertenece a este usuario',
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
                where: {
                    id: commentId,
                },
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

            const page = Number.parseInt(req.query.page as string) || 1;
            const limit = Number.parseInt(req.query.limit as string) || 5;

            // Solo pueden medir lo de un int
            // No poner numeros negativos

            // TODO: Validar page y limit
            if (isNaN(page) || isNaN(limit)) {
                return res.status(422).json({
                    message: 'Pagina o limite no valido',
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
