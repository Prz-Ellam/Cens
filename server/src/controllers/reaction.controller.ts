import { connection } from '@/config/database';
import type { AuthRequest } from '@/middlewares/auth.middleware';
import Poll from '@/models/poll.model';
import Reaction from '@/models/reaction.model';
import { validateId } from '@/validators/id.validator';
import type { Response } from 'express';
import { IsNull, Not } from 'typeorm';
import { z } from 'zod';

class ReactionController {
    /**
     * Create a new reaction for a specific poll.
     */
    async create(req: AuthRequest, res: Response): Promise<Response> {
        try {
            const pollId = Number.parseInt(req.params.pollId) || -1;
            const idResult = validateId(pollId);
            if (!idResult.status) {
                return res.status(422).json({
                    message: idResult.errors,
                });
            }

            const validateVote = z.object({
                isLike: z.boolean(),
            });
            const result = validateVote.safeParse(req.body);
            if (!result.success) {
                const formattedErrors = result.error.issues.map((issue) => ({
                    field: issue.path.join('.'),
                    message: issue.message,
                }));
                return res.status(422).json({
                    message: formattedErrors,
                });
            }

            const { isLike } = req.body;
            const user = req.user;

            const poll = await Poll.findOneBy({ id: pollId });
            if (!poll) {
                return res.status(404).json({
                    message: 'No se encontró la encuesta solicitada',
                });
            }

            // Un usuario solo puede tener un voto por poll
            const existingReaction = await Reaction.findOne({
                where: {
                    user: { id: user.id },
                    poll: { id: poll.id },
                },
            });
            if (existingReaction) {
                return res.status(409).json({
                    message: 'Ya has votado en esta encuesta',
                });
            }

            const existingReactionDeleted = await Reaction.findOne({
                where: {
                    user: { id: user.id },
                    poll: { id: poll.id },
                },
                withDeleted: true,
            });

            // RAZON: Es mejor que no se cree uno nuevo, mucha data a la BD
            if (existingReactionDeleted) {
                await connection
                    .createQueryBuilder()
                    .update(Reaction)
                    .set({ isLike, deletedAt: null })
                    .where({
                        id: existingReactionDeleted.id,
                        deletedAt: Not(IsNull()),
                    })
                    .execute();

                return res.status(201).json({
                    message: 'Votacion creada éxitosamente',
                });
            }

            const reaction = new Reaction();

            reaction.isLike = isLike;
            reaction.poll = poll;
            reaction.user = user;

            await reaction.save();

            return res.status(201).json({
                message: 'Votacion creada éxitosamente',
            });
        } catch (exception) {
            return res.status(500).json({
                message: 'Ocurrio un error en el servidor',
            });
        }
    }

    /**
     * Update the type of a reaction for a specific poll.
     */
    async update(req: AuthRequest, res: Response): Promise<Response> {
        try {
            const reactionId = Number.parseInt(req.params.reactionId) || -1;
            const idResult = validateId(reactionId);
            if (!idResult.status) {
                return res.status(422).json({
                    message: idResult.errors,
                });
            }

            const reaction = await Reaction.findOne({
                where: {
                    id: reactionId,
                },
                relations: ['user'],
            });
            if (!reaction) {
                return res.status(404).json({
                    message: 'No se encontró la reacción solicitada',
                });
            }

            if (reaction.user.id !== req.user.id) {
                return res.status(401).json({
                    message: 'No autorizado',
                });
            }

            const { isLike } = req.body;

            reaction.isLike = isLike;

            await reaction.save();

            return res.json({
                message: 'Reacción actualizada éxitosamente',
            });
        } catch (exception) {
            return res.status(500).json({
                message: 'Ocurrio un error en el servidor',
            });
        }
    }

    /**
     * Delete a reaction for a specific poll.
     */
    async delete(req: AuthRequest, res: Response): Promise<Response> {
        try {
            const reactionId = Number.parseInt(req.params.reactionId) || -1;
            const idResult = validateId(reactionId);
            if (!idResult.status) {
                return res.status(422).json({
                    message: idResult.errors,
                });
            }

            const reaction = await Reaction.findOne({
                where: {
                    id: reactionId,
                },
                relations: ['user'],
            });
            if (!reaction) {
                return res.status(404).json({
                    message: 'El voto solicitado no existe',
                });
            }

            if (reaction.user.id !== req.user.id) {
                return res.status(401).json({
                    message: 'No autorizado',
                });
            }

            await reaction.softRemove();

            return res.json({
                message: 'Reacción eliminada éxitosamente',
            });
        } catch (exception) {
            return res.status(500).json({
                message: 'Ocurrio un error en el servidor',
            });
        }
    }

    /**
     * Retrieve all reactions associated with a specific poll.
     */
    async findAllByPoll(req: AuthRequest, res: Response): Promise<Response> {
        try {
            const pollId = Number.parseInt(req.params.pollId) || -1;
            const idResult = validateId(pollId);
            if (!idResult.status) {
                return res.status(422).json({
                    message: idResult.errors,
                });
            }

            const reactionRepository = connection.getRepository(Reaction);

            const result = await reactionRepository
                .createQueryBuilder('vote')
                .select('vote.poll_id', 'pollId')
                .addSelect(
                    'SUM(CASE WHEN vote.isLike = 1 THEN 1 ELSE 0 END)',
                    'likes',
                )
                .addSelect(
                    'SUM(CASE WHEN vote.isLike = 0 THEN 1 ELSE 0 END)',
                    'dislikes',
                )
                .groupBy('vote.poll_id')
                .getRawOne();

            const { likes, dislikes } = result;
            return res.json({
                likes: Number.parseInt(likes),
                dislikes: Number.parseInt(dislikes),
            });
        } catch (exception) {
            return res.status(500).json({
                message: 'Ocurrio un error en el servidor',
            });
        }
    }
}

export default new ReactionController();
