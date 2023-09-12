# Conversaciones

## Crear Conversación

Endpoint: `/api/v1/conversations`

Método: POST

### Parámetros de la Solicitud

Formato: application/json

| Nombre | Tipo   | Requerido | Descripción                 |
| ------ | ------ | --------- | --------------------------- |
| userId | Integer | True      | ID del usuario a conversar  |

### Respuesta

Devuelve un mensaje exitoso si la conversación se creó con éxito.

| Estatus | Descripción                              |
| ------- | ---------------------------------------- |
| 200     | Conversación creada exitosamente         |
| 401     | No autorizado                            |
| 404     | Usuario no encontrado                    |
| 409     | Ya existe una conversación con el usuario |
| 422     | La información está incompleta o es incorrecta. Regresa un objeto con un mensaje (message) y un objeto de errores (errors) que especifica la fuente y el mensaje de error |
| 500     | Error interno del servidor               |

## Encontrar Todas las Conversaciones de un Usuario

Endpoint: `/api/v1/conversations/user/:userId`

Método: GET

### Parámetros de la Solicitud

| Nombre | Tipo   | Requerido | Descripción                 |
| ------ | ------ | --------- | --------------------------- |
| userId | Integer | True      | ID del usuario cuyas conversaciones se desean listar |

### Respuesta

Devuelve una lista de conversaciones relacionadas con el usuario especificado.

| Estatus | Descripción                              |
| ------- | ---------------------------------------- |
| 200     | Éxito, devuelve la lista de conversaciones |
| 401     | No autorizado                            |
| 404     | Usuario no encontrado                    |
| 422     | El identificador del usuario proporcionado no es válido |
| 500     | Error interno del servidor               |

