- Crear un usario
POST /api/v1/users

- Actualizar la información de un usuario
PATCH /api/v1/users/:id

- Actualizar la contraseña de un usuario
PATCH /api/v1/users/:id/password

- Actualizar la foto de perfil de un usuario
PATCH /api/v1/users/:id/avatar

- Cerrar la cuenta de un usuario
DELETE /api/v1/users/:id

- Obtener la información de un usuario
GET /api/v1/users/:id

- Seguir a un usuario
POST /api/v1/users/:id/follows

- Dejar de seguir a un usuario
DELETE /api/v1/users/:id/follows

- Iniciar sesión
POST /api/v1/auth



- Crear una encuesta
POST /api/v1/polls

- Eliminar una encuesta
DELETE /api/v1/polls/:id

- Obtener la información de una encuesta
GET /api/v1/polls/:id

- Obtener las encuestas de un usuario
GET /api/v1/users/:id/polls



- Votar en una encuesta
POST /api/v1/polls/:id/votes

- Actualizar el voto de una encuesta
PUT /api/v1/polls/:id/votes

- Deshacer voto en una encuesta
DELETE /api/v1/polls/:id/votes

- Obtener todos los votos de una encuesta
GET /api/v1/polls/:id/votes



- Crear un comentario
POST /api/v1/polls/:id/comments

- Actualizar un comentario
PUT /api/v1/comments/:id

- Eliminar un comentario
DELETE /api/v1/comments/:id

- Obtener todos los comentarios de una encuesta
GET /api/v1/polls/:id/comments



- Crear una reacción
POST /api/v1/polls/:id/reactions

- Actualizar una reacción
PUT /api/v1/polls/:id/reactions

- Eliminar una reacción
DELETE /api/v1/polls/:id/reactions

- Obtener todas las reacciones de una encuesta
GET /api/v1/polls/:id/reactions



- Obtener todos los chats de un usuario
GET /api/v1/users/:userId/conversations

- Crear un chat
POST /api/v1/users/:userId/conversations



- Obtener todos los mensajes de un chat
GET /api/v1/conversations/:conversationId/messages

- Crear un mensaje
POST /api/v1/conversations/:conversationId/messages

- Actualizar un mensaje
PUT /api/v1/messages/:messageId

- Eliminar un mensaje
DELETE /api/v1/messages/:messageId



    Conversations:

    Create a new conversation:
        Endpoint: POST /conversations
        Controller: ConversationController.createConversation

    Get all conversations for a user:
        Endpoint: GET /users/:userId/conversations
        Controller: ConversationController.getAllConversationsForUser

    Messages:

    Get all messages for a conversation:
        Endpoint: GET /conversations/:conversationId/messages
        Controller: MessageController.getAllMessagesForConversation

    Create a new message:
        Endpoint: POST /conversations/:conversationId/messages
        Controller: MessageController.createMessage

    Attachments:

    Get all attachments for a message:
        Endpoint: GET /messages/:messageId/attachments
        Controller: AttachmentController.getAllAttachmentsForMessage

    Upload a new attachment to a message:
        Endpoint: POST /messages/:messageId/attachments
        Controller: AttachmentController.uploadAttachment


https://www.andreadiotallevi.com/blog/how-to-create-a-production-image-for-a-node-typescript-app-using-docker-multi-stage-builds