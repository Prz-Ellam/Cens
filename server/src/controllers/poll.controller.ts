import type { AuthRequest } from '@/middlewares/auth.middleware';
import Option from '@/models/option.model';
import Poll from '@/models/poll.model';
import type { Response } from 'express';
import { connection } from '@/config/database';
import PollService from '@/services/poll.service';
import { validateCreatePoll } from '@/validators/create-poll.validator';
import { validateId } from '@/validators/id.validator';
import logger from '@/config/logger';
import User from '@/models/user.model';
import z from 'zod';
import { formatErrors } from '@/utils/format-error';

class PollController {
    /**
     * Create a new poll.
     */
    async create(req: AuthRequest, res: Response): Promise<Response> {
        const queryRunner = connection.createQueryRunner();
        try {
            await queryRunner.startTransaction();

            const contentType = req.get('content-type');
            if (!contentType?.includes('application/json')) {
                return res.status(415).json({
                    message: 'Tipo de contenido invalido',
                });
            }

            const result = validateCreatePoll(req.body);
            if (!result.status) {
                return res.status(422).json({
                    message: result.errors,
                });
            }

            const { question, description, options } = req.body;
            const authUser = req.user;

            const poll = new Poll();
            poll.question = question;
            poll.description = description;
            poll.user = authUser;

            await queryRunner.manager.save(Poll, poll);

            for (const text of options) {
                const option = new Option();
                option.text = text.trim();
                option.poll = poll;

                await queryRunner.manager.save(Option, option);
            }

            await queryRunner.commitTransaction();

            return res.status(201).json({
                message: 'Encuesta creada con éxito',
            });
        } catch (exception) {
            await queryRunner.rollbackTransaction();

            return res.status(500).json({
                message: 'Ocurrio un error en el servidor',
            });
        } finally {
            await queryRunner.release();
        }
    }

    /**
     * Update poll details by poll ID
     */
    async update(_req: AuthRequest, res: Response): Promise<Response> {
        return res.status(405).json({
            message:
                'Las encuestas no pueden ser modificadas para garantizar la integridad de los datos recopilados',
        });
    }

    /**
     * Delete a poll by poll ID.
     */
    async delete(req: AuthRequest, res: Response): Promise<Response> {
        try {
            const pollId = Number.parseInt(req.params.pollId) || -1;
            const idResult = validateId(pollId);
            if (!idResult.status) {
                return res.status(422).json({
                    message: 'El identificador seleccionado no es válido',
                });
            }

            const poll = await Poll.findOne({
                where: { id: pollId },
                relations: ['user'],
            });
            if (!poll) {
                return res.status(404).json({
                    message: 'La encuesta que solicitó no fue encontrada',
                });
            }

            const authUser = req.user;
            if (poll.user.id !== authUser.id) {
                return res.status(401).json({
                    message: 'No autorizado',
                });
            }

            await poll.softRemove();

            return res.json({
                message: 'La encuesta se eliminó exitosamente',
            });
        } catch (exception) {
            return res.status(500).json({
                message: 'Ocurrio un error en el servidor',
            });
        }
    }

    /**
     * Get poll details by poll ID.
     */
    async findOne(req: AuthRequest, res: Response): Promise<Response> {
        try {
            const pollId = Number.parseInt(req.params.id) || -1;
            const idResult = validateId(pollId);
            if (!idResult.status) {
                return res.status(422).json({
                    message: 'El identificador seleccionado no es válido',
                });
            }

            const authUser = req.user;
            const poll = await PollService.findOneById(pollId, authUser.id);
            if (!poll) {
                return res.status(404).json({
                    message: 'No se encontró la encuesta solicitada',
                });
            }

            return res.json(poll);
        } catch (exception) {
            return res.status(500).json({
                message: 'Ocurrio un error en el servidor',
            });
        }
    }

    async findMany(req: AuthRequest, res: Response): Promise<Response> {
        try {
            const user = req.user;

            const search = (req.query.search as string) ?? '';

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

            const [polls, total] = await PollService.findMany(
                user.id,
                search,
                page,
                limit,
            );
            const totalPages = Math.ceil(total / limit);

            return res.json({
                polls,
                totalPages,
            });
        } catch (exception) {
            logger.error(`${exception as string}`);
            return res.status(500).json({
                message: 'Ocurrio un error en el servidor',
            });
        }
    }

    async findByFollowingUser(
        req: AuthRequest,
        res: Response,
    ): Promise<Response> {
        try {
            const user = req.user;

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

            const [polls, total] = await PollService.findByFollowed(
                user.id,
                page,
                limit,
            );
            const totalPages = Math.ceil(total / limit);

            return res.json({
                polls,
                totalPages,
            });
        } catch (exception) {
            logger.error(`${exception as string}`);
            return res.status(500).json({
                message: 'Ocurrio un error en el servidor',
            });
        }
    }

    async findByUser(req: AuthRequest, res: Response): Promise<Response> {
        try {
            const userId = Number.parseInt(req.params.userId) || -1;
            const idResult = validateId(userId);
            if (!idResult.status) {
                return res.status(422).json({
                    message: 'El identificador seleccionado no es válido',
                });
            }

            const authUser = req.user;

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

            const user = await User.findOneBy({ id: userId });
            if (!user) {
                return res.status(404).json({
                    message: 'El usuario solicitado no fue encontrado',
                });
            }

            const [polls, total] = await PollService.findByUser(
                user.id,
                authUser.id,
                page,
                limit,
            );
            const totalPages = Math.ceil(total / limit);

            return res.json({
                polls,
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

export default new PollController();
