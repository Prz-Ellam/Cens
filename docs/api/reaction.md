# Reacciones

## Crear reacción

Endpoint: `/api/v1/polls/:pollId/reactions`

Method: POST

### Parámetros de la Solicitud

| Nombre   | Tipo   | Requerido | Descripción                          |
| -------- | ------ | --------- | ------------------------------------ |
| pollId   | Integer | True      | ID de la encuesta a la que se desea agregar la reacción |

### Cuerpo de la peticion

Formato: application/json

| Nombre   | Tipo   | Requerido | Descripción                          |
| -------- | ------ | --------- | ------------------------------------ |                          
| isLike     | Boolean | True      | Indica si la reacción es positiva o negativa |

### Respuesta

Devuelve un mensaje exitoso si la reacción se creó con éxito.

| Estatus | Descripción                              |
| ------- | ---------------------------------------- |
| 201     | Reacción creada exitosamente           |
| 400     | Opción incorrecta |
| 422     | La información está incompleta o es incorrecta. Regresa un objeto con un mensaje (message) y un objeto de errores (errors) que especifica la fuente y el mensaje de error |
| 404     | No se encontró la encuesta solicitada    |
| 409     | Ya se ha emitido una reacción en esta encuesta |
| 500     | Error interno del servidor               |

<div style="page-break-after: always;"></div>

## Actualizar reacción

Endpoint: `/api/v1/reactions/:reactionId`

Method: PUT

### Parámetros de la Solicitud

| Nombre   | Tipo   | Requerido | Descripción                          |
| -------- | ------ | --------- | ------------------------------------ |
| reactionId   | Integer | True      | ID de la reacción a actualizar |

### Cuerpo de la peticion

Formato: application/json

| Nombre   | Tipo   | Requerido | Descripción                          |
| -------- | ------ | --------- | ------------------------------------ |                          
| isLike     | Boolean | True      | Indica si la reacción es positiva o negativa |

### Respuesta

Devuelve un mensaje exitoso si la reacción se actualizó con éxito.

| Estatus | Descripción                              |
| ------- | ---------------------------------------- |
| 200     | Reacción actualizada exitosamente     |
| 401     | No autorizado                            |
| 404     | La reacción solicitada no existe      |
| 422     | La información está incompleta o es incorrecta. Regresa un objeto con un mensaje (message) y un objeto de errores (errors) que especifica la fuente y el mensaje de error |
| 500     | Error interno del servidor               |

<div style="page-break-after: always;"></div>

## Eliminar reacción

Endpoint: `/api/v1/reactions/:reactionId`

Method: DELETE

### Parametros de la peticion

| Nombre     | Tipo   | Requerido | Descripción                               |
| ---------- | ------ | --------- | ----------------------------------------- |
| reactionId  | Integer | True      | Identificador de la reacción a eliminar   |

### Respuesta

Devuelve un mensaje exitoso si la reacción se eliminó con éxito.

| Estatus | Descripción                              |
| ------- | ---------------------------------------- |
| 200     | Reacción eliminado con éxito          |
| 401     | No autorizado                            |
| 404     | No se encontró la reacción solicitada |
| 422     | El identificador de la reacción proporcionado no es válido |
| 500     | Error interno del servidor               |

<div style="page-break-after: always;"></div>

<div style="page-break-after: always;"></div>

## Buscar reacciones por encuesta

Endpoint: `/api/v1/polls/:pollId/reactions`

Method: GET

### Parametros de la peticion

| Nombre  | Tipo   | Requerido | Descripción                               |
| ------- | ------ | --------- | ----------------------------------------- |
| pollId  | Integer | True      | Identificador de la encuesta              |

### Respuesta

Devuelve la cantidad de reacciones positivas y negativas de una encuesta

| Estatus | Descripción                              |
| ------- | ---------------------------------------- |
| 200     | Éxito, devuelve la lista de reacciones |
| 422     | El identificador de la encuesta proporcionado no es válido |
| 500     | Error interno del servidor               |

<div style="page-break-after: always;"></div>
