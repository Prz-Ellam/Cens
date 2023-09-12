# Mensajes

## Crear Mensaje

Endpoint: `/api/v1/messages/:conversationId`

Method: POST

### Parámetros de la Solicitud

Formato: application/json

| Nombre         | Tipo   | Requerido | Descripción                           |
| -------------- | ------ | --------- | ------------------------------------- |
| conversationId | Integer | True      | ID de la conversación a la que se enviará el mensaje |
| text           | String | True      | Texto del mensaje a enviar           |

### Respuesta

Devuelve un mensaje exitoso si el mensaje se creó con éxito.

| Estatus | Descripción                              |
| ------- | ---------------------------------------- |
| 201     | Mensaje creado con éxito                 |
| 401     | No autorizado                            |
| 404     | Conversación no encontrada               |
| 422     | La información está incompleta o es incorrecta. Regresa un objeto con un mensaje (message) y un objeto de errores (errors) que especifica la fuente y el mensaje de error |
| 500     | Error interno del servidor               |

## Actualizar Mensaje

Endpoint: `/api/v1/messages/:messageId`

Method: PUT

### Parámetros de la Solicitud

| Nombre    | Tipo   | Requerido | Descripción                           |
| --------- | ------ | --------- | ------------------------------------- |
| messageId | Integer | True      | ID del mensaje a actualizar           |

### Respuesta

Devuelve un mensaje exitoso si el mensaje se actualizó con éxito.

| Estatus | Descripción                              |
| ------- | ---------------------------------------- |
| 200     | Mensaje actualizado con éxito            |
| 404     | Mensaje no encontrado                    |
| 422     | La información está incompleta o es incorrecta. Regresa un objeto con un mensaje (message) y un objeto de errores (errors) que especifica la fuente y el mensaje de error |
| 500     | Error interno del servidor               |

## Eliminar Mensaje

Endpoint: `/api/v1/messages/:messageId`

Method: DELETE

### Parámetros de la Solicitud

| Nombre    | Tipo   | Requerido | Descripción                           |
| --------- | ------ | --------- | ------------------------------------- |
| messageId | Integer | True      | ID del mensaje a eliminar             |

### Respuesta

Devuelve un mensaje exitoso si el mensaje se eliminó con éxito.

| Estatus | Descripción                              |
| ------- | ---------------------------------------- |
| 200     | Mensaje eliminado con éxito              |
| 404     | Mensaje no encontrado                    |
| 422     | La información está incompleta o es incorrecta. Regresa un objeto con un mensaje (message) y un objeto de errores (errors) que especifica la fuente y el mensaje de error |
| 500     | Error interno del servidor               |

## Encontrar Todos los Mensajes de una Conversación

Endpoint: `/api/v1/messages/conversation/:conversationId`

Method: GET

### Parámetros de la Solicitud

| Nombre         | Tipo   | Requerido | Descripción                           |
| -------------- | ------ | --------- | ------------------------------------- |
| conversationId | Integer | True      | ID de la conversación cuyos mensajes se desean listar |

### Respuesta

Devuelve una lista de mensajes relacionados con la conversación especificada.

| Estatus | Descripción                              |
| ------- | ---------------------------------------- |
| 200     | Éxito, devuelve la lista de mensajes     |
| 401     | No autorizado                            |
| 404     | Conversación no encontrada               |
| 422     | El identificador de la conversación proporcionado no es válido |
| 500     | Error interno del servidor               |

