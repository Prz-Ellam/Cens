import { connection } from '@/config/database';
import type { AuthRequest } from '@/middlewares/auth.middleware';
import Option from '@/models/option.model';
import { OptionWithPercentage } from '@/models/options-with-percentage.model';
import Poll from '@/models/poll.model';
import Vote from '@/models/vote.model';
import { formatErrors } from '@/utils/format-error';
import { validateId } from '@/validators/id.validator';
import type { Response } from 'express';
import { IsNull, Not } from 'typeorm';
import z from 'zod';

class VoteController {
    /**
     * Create a new vote for a poll.
     */
    async create(req: AuthRequest, res: Response): Promise<Response> {
        try {
            const contentType = req.get('content-type');
            if (!contentType?.includes('application/json')) {
                return res.status(415).json({
                    message: 'Tipo de contenido invalido',
                });
            }

            const pollId = Number.parseInt(req.params.pollId);
            const idResult = validateId(pollId);
            if (!idResult.status) {
                return res.status(422).json({
                    message: idResult.errors,
                });
            }

            const poll = await Poll.findOne({
                where: { id: pollId },
                relations: ['user'],
            });
            if (!poll) {
                return res.status(404).json({
                    message: 'La encuesta no fue encontrada',
                });
            }

            const authUser = req.user;
            if (poll.user.id === authUser.id) {
                return res.status(400).json({
                    message: 'No puedes votar en tus propias encuestas',
                });
            }

            // Si el usuario ya voto
            const existingVote = await Vote.findOne({
                where: {
                    user: { id: authUser.id },
                    poll: { id: poll.id },
                },
            });
            if (existingVote) {
                return res.status(409).json({
                    message: 'Ya votaste en esta encuesta',
                });
            }

            // TODO: Validar
            const validateVote = z.object({
                optionId: z
                    .number({
                        invalid_type_error:
                            'El id de la opción debe ser un número',
                    })
                    .int('El id de la opción debe ser un número entero')
                    .min(
                        1,
                        'El id de la opción debe ser un número entero positivo',
                    )
                    .max(
                        2147483647,
                        'El id de la opción no debe exceder 2147483647',
                    ),
            });
            const result = validateVote.safeParse(req.body);
            if (!result.success) {
                const formattedErrors = formatErrors(result.error);
                return res.status(422).json({
                    message: formattedErrors,
                });
            }

            const { optionId } = req.body;

            const option = await Option.findOne({
                where: {
                    id: optionId,
                },
                relations: ['poll'],
            });
            if (!option) {
                return res.status(404).json({
                    message: 'La opción no fue encontrada',
                });
            }

            // La opcion debe ser del mismo poll
            if (option.poll.id !== poll.id) {
                return res.status(400).json({
                    message: 'La opción no pertenece a esta encuesta',
                });
            }

            const existingVoteDeleted = await Vote.findOne({
                where: {
                    user: { id: authUser.id },
                    poll: { id: poll.id },
                },
                withDeleted: true,
            });

            // RAZON: Es mejor que no se cree uno nuevo, mucha data a la BD
            if (existingVoteDeleted) {
                await connection
                    .createQueryBuilder()
                    .update(Vote)
                    .set({ option, poll, user: authUser, deletedAt: null })
                    .where({
                        id: existingVoteDeleted.id,
                        deletedAt: Not(IsNull()),
                    })
                    .execute();

                return res.status(201).json({
                    message: 'La encuesta fue votada exitosamente',
                });
            }

            const vote = new Vote();
            vote.poll = poll;
            vote.user = authUser;
            vote.option = option;
            await vote.save();

            return res.status(201).json({
                message: 'La encuesta fue votada exitosamente',
            });
        } catch (exception) {
            return res.status(500).json({
                message: 'Ha ocurrido un error en el servidor',
            });
        }
    }

    /**
     * Update a vote for a poll.
     */
    async update(req: AuthRequest, res: Response): Promise<Response> {
        try {
            const contentType = req.get('content-type');
            if (!contentType?.includes('application/json')) {
                return res.status(415).json({
                    message: 'Tipo de contenido invalido',
                });
            }

            const voteId = Number.parseInt(req.params.voteId);
            const idResult = validateId(voteId);
            if (!idResult.status) {
                return res.status(422).json({
                    message: idResult.errors,
                });
            }

            const vote = await Vote.findOne({
                where: {
                    id: voteId,
                },
                relations: ['poll', 'user'],
            });
            if (!vote) {
                return res.status(404).json({
                    message: 'El voto no fue encontrado',
                });
            }

            if (vote.user.id !== req.user.id) {
                return res.status(401).json({
                    message: 'No autorizado',
                });
            }

            // TODO: Validar
            const validateVote = z.object({
                optionId: z
                    .number({
                        invalid_type_error:
                            'El id de la opción debe ser un número',
                    })
                    .int('El id de la opción debe ser un número entero')
                    .min(
                        1,
                        'El id de la opción debe ser un número entero positivo',
                    )
                    .max(
                        2147483647,
                        'El id de la opción no debe exceder 2147483647',
                    ),
            });
            const result = validateVote.safeParse(req.body);
            if (!result.success) {
                const formattedErrors = formatErrors(result.error);
                return res.status(422).json({
                    message: formattedErrors,
                });
            }

            const { optionId } = req.body;

            const option = await Option.findOne({
                where: {
                    id: optionId,
                },
                relations: ['poll'],
            });
            if (!option) {
                return res.status(404).json({
                    message: 'La opción no fue encontrada',
                });
            }

            // La opcion debe ser del mismo poll
            if (option.poll.id !== vote.poll.id) {
                return res.status(400).json({
                    message: 'La opción no pertenece a esta encuesta',
                });
            }

            vote.option = option;
            await vote.save();

            return res.json({
                message: 'La encuesta fue actualizada exitosamente',
            });
        } catch (exception) {
            return res.status(500).json({
                message: 'Ha ocurrido un error en el servidor',
            });
        }
    }

    /**
     * Delete a vote for a poll.
     */
    async delete(req: AuthRequest, res: Response): Promise<Response> {
        try {
            const voteId = Number.parseInt(req.params.voteId);
            const idResult = validateId(voteId);
            if (!idResult.status) {
                return res.status(422).json({
                    message: idResult.errors,
                });
            }

            const vote = await Vote.findOne({
                where: {
                    id: voteId,
                },
                relations: ['poll', 'user'],
            });
            if (!vote) {
                return res.status(404).json({
                    message: 'El voto no fue encontrado',
                });
            }

            if (vote.user.id !== req.user.id) {
                return res.status(401).json({
                    message: 'No autorizado',
                });
            }

            await vote.softRemove();

            return res.json({
                message: 'El voto fue anulado exitosamente',
            });
        } catch (exception) {
            return res.status(500).json({
                message: 'Ha ocurrido un error en el servidor',
            });
        }
    }

    /**
     * Find all votes for a specific poll.
     */
    async findAllByPoll(req: AuthRequest, res: Response): Promise<Response> {
        try {
            const pollId = Number.parseInt(req.params.pollId);
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

            const options = await connection
                .getRepository(OptionWithPercentage)
                .find({
                    where: {
                        poll_id: pollId,
                    },
                });

            return res.json(options);
        } catch (exception) {
            return res.status(500).json({
                message: 'Ha ocurrido un error en el servidor',
            });
        }
    }
}

export default new VoteController();
