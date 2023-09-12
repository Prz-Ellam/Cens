import { connection } from '@/config/database';
import type { AuthRequest } from '@/middlewares/auth.middleware';
import Conversation from '@/models/conversation.model';
import Message from '@/models/message.model';
import Participant from '@/models/participant.model';
import { validateId } from '@/validators/id.validator';
import type { Response } from 'express';

class MessageController {
    /**
     * Creates a message.
     */
    async create(req: AuthRequest, res: Response): Promise<Response> {
        try {
            const conversationId =
                Number.parseInt(req.params.conversationId) || -1;
            const conversation = await Conversation.findOneBy({
                id: conversationId,
            });
            if (!conversation) {
                return res.status(404).json({
                    message: 'La conversación no fue encontrada',
                });
            }

            const authUser = req.user;
            const participantRepository = connection.getRepository(Participant);
            const participant = await participantRepository.findOne({
                where: {
                    user: { id: authUser.id },
                    conversation: { id: conversationId },
                },
            });

            // El usuario debe pertenecer a la conversacion
            if (!participant) {
                return res.status(401).json({
                    message: 'No autorizado',
                });
            }

            const user = req.user;
            const { text } = req.body;

            const message = new Message();
            message.conversation = conversation;
            message.sender = user;
            message.text = text;

            await message.save();
            return res.status(201).json({
                message: 'Mensaje creado con éxito',
            });
        } catch (exception) {
            return res.json({
                message: 'Ocurrio un error en el servidor',
            });
        }
    }

    async update(req: AuthRequest, res: Response): Promise<Response> {
        try {
            const messageId = Number.parseInt(req.params.messageId) || -1;
            const idResult = validateId(messageId);
            if (!idResult.status) {
                return res.status(422).json({
                    message: idResult.errors,
                });
            }

            const message = await Message.findOneBy({
                id: messageId,
            });
            if (!message) {
                return res.status(404).json({
                    message: 'La conversación no fue encontrada',
                });
            }
            return res.json();
        } catch (exception) {
            return res.status(500).json({
                message: 'Ocurrio un error en el servidor',
            });
        }
    }

    /**
     * Delete a message by message ID.
     */
    async delete(req: AuthRequest, res: Response): Promise<Response> {
        try {
            const messageId = Number.parseInt(req.params.messageId) || -1;
            const idResult = validateId(messageId);
            if (!idResult.status) {
                return res.status(422).json({
                    message: idResult.errors,
                });
            }

            const message = await Message.findOneBy({
                id: messageId,
            });
            if (!message) {
                return res.status(404).json({
                    message: 'La conversación no fue encontrada',
                });
            }
            return res.json();
        } catch (exception) {
            return res.status(500).json({
                message: 'Ocurrio un error en el servidor',
            });
        }
    }

    async findAllByConversation(
        req: AuthRequest,
        res: Response,
    ): Promise<Response> {
        try {
            const conversationId =
                Number.parseInt(req.params.conversationId) || -1;
            const idResult = validateId(conversationId);
            if (!idResult.status) {
                return res.status(422).json({
                    message: idResult.errors,
                });
            }

            const conversation = await Conversation.findOneBy({
                id: conversationId,
            });
            if (!conversation) {
                return res.status(404).json({
                    message: 'La conversación no fue encontrada',
                });
            }

            const authUser = req.user;
            const participantRepository = connection.getRepository(Participant);
            const participant = await participantRepository.findOne({
                where: {
                    user: { id: authUser.id },
                    conversation: { id: conversationId },
                },
            });

            // El usuario debe pertenecer a la conversacion
            if (!participant) {
                return res.status(401).json({
                    message: 'No autorizado',
                });
            }

            const messages = await Message.find({
                where: {
                    conversation: { id: conversationId },
                },
                order: {
                    createdAt: 'ASC', // Optional: Order messages by creation date
                },
            });

            return res.json(messages);
        } catch (exception) {
            return res.status(500).json({
                message: 'Ocurrio un error en el servidor',
            });
        }
    }
}

export default new MessageController();
