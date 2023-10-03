import { connection } from '@/config/database';
import logger from '@/config/logger';
import type { AuthRequest } from '@/middlewares/auth.middleware';
import Conversation from '@/models/conversation.model';
import Message from '@/models/message.model';
import Participant from '@/models/participant.model';
import User from '@/models/user.model';
import { validateId } from '@/validators/id.validator';
import type { Response } from 'express';

class ConversationController {
    async create(req: AuthRequest, res: Response): Promise<Response> {
        const queryRunner = connection.createQueryRunner();
        try {
            const userId = Number.parseInt(req.params.userId) || -1;
            const idResult = validateId(userId);
            if (!idResult.status) {
                return res.status(422).json({
                    message: idResult.errors,
                });
            }

            const userOne = await User.findOneBy({ id: userId });
            if (!userOne) {
                return res.status(404).json({
                    message: 'Usuario no encontrado',
                });
            }
            const userTwo = req.user;

            // Validar que los dos no tengan ya un chat
            const conversationRepository =
                connection.getRepository(Conversation);
            const requestedConversation = await conversationRepository
                .createQueryBuilder('c')
                .innerJoin('c.participants', 'p')
                .where('p.user_id = :userOneId OR p.user_id = :userTwoId', {
                    userOneId: userOne.id,
                    userTwoId: userTwo.id,
                })
                .groupBy('c.id')
                .having('COUNT(p.user_id) >= 2')
                .limit(1)
                .getOne();

            if (requestedConversation) {
                return res.status(409).json({
                    message: 'Ya existe una conversación con el usuario',
                });
            }

            await queryRunner.startTransaction();
            const conversation = new Conversation();
            await queryRunner.manager.save(Conversation, conversation);

            for (const user of [userOne, userTwo]) {
                const participant = new Participant();
                participant.conversation = conversation;
                participant.user = user;
                await queryRunner.manager.save(Participant, participant);
            }

            await queryRunner.commitTransaction();

            return res.json({
                message: 'Conversación creada',
            });
        } catch (exception) {
            await queryRunner.rollbackTransaction();

            logger.error(`${exception as string}`);
            return res.json({
                message: 'Ocurrio un error en el servidor',
            });
        } finally {
            await queryRunner.release();
        }
    }

    async findAllByUser(req: AuthRequest, res: Response): Promise<Response> {
        try {
            const userId = Number.parseInt(req.params.userId) || -1;
            const idResult = validateId(userId);
            if (!idResult.status) {
                return res.status(422).json({
                    message: idResult.errors,
                });
            }

            const user = await User.findOneBy({ id: userId });
            if (!user) {
                return res.status(404).json({
                    message: 'Usuario no encontrado',
                });
            }

            const authUser = req.user;
            if (authUser.id !== user.id) {
                return res.status(401).json({
                    message: 'No autorizado',
                });
            }

            // const subQuery = connection
            //     .getRepository(Conversation)
            //     .createQueryBuilder('conversation')
            //     .innerJoin('conversation.participants', 'participant')
            //     .innerJoin('participant.user', 'user')
            //     .select('conversation.id')
            //     .where('user.id = :userId', { userId });

            // const conversations = await connection
            //     .getRepository(Conversation)
            //     .createQueryBuilder('conversation')
            //     .innerJoinAndSelect('conversation.participants', 'participant')
            //     .innerJoinAndSelect('participant.user', 'user')
            //     .where(`conversation.id IN (${subQuery.getQuery()})`)
            //     .setParameters(subQuery.getParameters())
            //     .getMany();

            const queryBuilder = connection
                .createQueryBuilder()
                .select('participants.conversation_id')
                .from('participants', 'participants')
                .where('participants.user_id = :userId', { userId });

            const messageSubquery = connection
                .getRepository(Message)
                .createQueryBuilder('message')
                .select('message.text')
                .where('message.conversation.id = conversation.id')
                .orderBy('message.createdAt', 'DESC')
                .limit(1);

            const messageCreationSubquery = connection
                .getRepository(Message)
                .createQueryBuilder('message')
                .select('message.createdAt')
                .where('message.conversation.id = conversation.id')
                .orderBy('message.createdAt', 'DESC')
                .limit(1);

            const conversations = await connection
                .getRepository(Conversation)
                .createQueryBuilder('conversation')
                .select('conversation.id', 'conversationId')
                .innerJoin('conversation.participants', 'participant')
                .innerJoin('participant.user', 'user')
                .addSelect('user.id', 'userId')
                .addSelect('user.username', 'username')
                .addSelect([`(${messageSubquery.getQuery()}) AS lastMessage`])
                .addSelect([
                    `(${messageCreationSubquery.getQuery()}) AS lastMessageCreatedAt`,
                ])
                .where(`conversation.id IN (${queryBuilder.getQuery()})`)
                .andWhere('user.id != :userId', { userId })
                .setParameters(queryBuilder.getParameters())
                .getRawMany();

            return res.json(conversations);
        } catch (exception) {
            logger.error(`${exception as string}`);
            return res.status(500).json({
                message: 'Ocurrio un error en el servidor',
            });
        }
    }
}

export default new ConversationController();
