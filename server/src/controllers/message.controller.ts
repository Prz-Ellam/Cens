import { connection } from '@/config/database';
import logger from '@/config/logger';
import type { AuthRequest } from '@/middlewares/auth.middleware';
import Conversation from '@/models/conversation.model';
import MessageView from '@/models/message-view.model';
import Message from '@/models/message.model';
import Participant from '@/models/participant.model';
import { formatErrors } from '@/utils/format-error';
import { validateId } from '@/validators/id.validator';
import type { Response } from 'express';
import z from 'zod';

class MessageController {
    /**
     * Creates a message.
     */
    async create(req: AuthRequest, res: Response): Promise<Response> {
        try {
            const contentType = req.get('content-type');
            if (!contentType?.includes('application/json')) {
                return res.status(415).json({
                    message: 'Tipo de contenido invalido',
                });
            }

            const chatId = Number.parseInt(req.params.conversationId) || -1;
            const idResult = validateId(chatId);
            if (!idResult.status) {
                return res.status(422).json({
                    message: 'El identificador seleccionado no es válido',
                });
            }

            const conversation = await Conversation.findOneBy({
                id: chatId,
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
                    conversation: { id: chatId },
                },
            });

            // El usuario debe pertenecer a la conversacion
            if (!participant) {
                return res.status(401).json({
                    message: 'No autorizado',
                });
            }

            const user = req.user;

            // TODO: Validar
            const validateMessage = z.object({
                text: z
                    .string({
                        invalid_type_error:
                            'El texto debe ser una cadena de texto',
                    })
                    .trim()
                    .min(1, 'Es requerido al menos 1 caracter')
                    .max(255, 'Maximo de 255 caracteres permitidos'),
            });
            const result = validateMessage.safeParse(req.body);
            if (!result.success) {
                const formattedErrors = formatErrors(result.error);
                return res.status(422).json({
                    message: formattedErrors,
                });
            }

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
            const contentType = req.get('content-type');
            if (!contentType?.includes('application/json')) {
                return res.status(415).json({
                    message: 'Tipo de contenido invalido',
                });
            }

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

            // TODO: Validar
            const validateMessage = z.object({
                text: z
                    .string({
                        invalid_type_error:
                            'El texto debe ser una cadena de texto',
                    })
                    .trim()
                    .min(1, 'Es requerido al menos 1 caracter')
                    .max(255, 'Maximo de 255 caracteres permitidos'),
            });
            const result = validateMessage.safeParse(req.body);
            if (!result.success) {
                const formattedErrors = formatErrors(result.error);
                return res.status(422).json({
                    message: formattedErrors,
                });
            }

            const { text } = req.body;

            message.text = text;

            await message.save();

            return res.json({
                message: 'El mensaje ha sido actualizado con éxito',
            });
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

            await message.softRemove();

            return res.json({
                message: 'El mensaje fue eliminado éxitosamente',
            });
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
            const chatId = Number.parseInt(req.params.conversationId) || -1;
            const idResult = validateId(chatId);
            if (!idResult.status) {
                return res.status(422).json({
                    message: idResult.errors,
                });
            }

            const conversation = await Conversation.findOneBy({
                id: chatId,
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
                    conversation: { id: chatId },
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
                    conversation: { id: chatId },
                },
                relations: ['sender'],
                order: {
                    createdAt: 'ASC',
                },
            });

            const views = await connection
                .createQueryBuilder()
                .select(`m.id as message, ${authUser.id} as user`)
                .from(Message, 'm')
                .where('m.conversation_id = :conversationId', {
                    conversationId: chatId,
                })
                .andWhere('m.sender_id != :senderId', { senderId: authUser.id })
                .andWhere(
                    'NOT EXISTS ' +
                        '(SELECT 1 FROM message_view mv WHERE mv.message_id = m.id AND mv.user_id = :userId)',
                    { userId: authUser.id },
                )
                .getRawMany();

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const inserts: any = [];
            for (const view of views) {
                inserts.push(
                    MessageView.insert({
                        user: { id: view.user },
                        message: { id: view.message },
                    }),
                );
            }
            await Promise.all(inserts);

            return res.json(messages);
        } catch (exception) {
            logger.error(`${exception as string}`);
            return res.status(500).json({
                message: 'Ocurrio un error en el servidor',
            });
        }
    }
}

export default new MessageController();
