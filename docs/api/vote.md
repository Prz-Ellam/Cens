# Votos

## Crear voto

Endpoint: `/api/v1/polls/:pollId/votes`

Method: POST

### Parametros de la solicitud

| Nombre   | Tipo   | Requerido | Descripción                          |
| -------- | ------ | --------- | ------------------------------------ |
| pollId   | Integer | True      | ID de la encuesta a la que se desea agregar la reaccion |

### Cuerpo de la solicitud

Formato: application/json

| Nombre   | Tipo   | Requerido | Descripción                          |
| -------- | ------ | --------- | ------------------------------------ |                          
| optionId     | Integer | True      | Identificador de la opción por votar |

### Respuesta

Devuelve un mensaje exitoso si el voto se creó con éxito.

| Estatus | Descripción                              |
| ------- | ---------------------------------------- |
| 201     | Voto creado exitosamente           |
| 400     | Opción incorrecta |
| 422     | La información está incompleta o es incorrecta. Regresa un objeto con un mensaje (message) y un objeto de errores (errors) que especifica la fuente y el mensaje de error |
| 404     | No se encontró la encuesta solicitada    |
| 409     | El voto ya existe |
| 500     | Error interno del servidor               |

## Actualizar voto

Endpoint: `/api/v1/votes/:voteId`

Method: PUT

### Parámetros de la Solicitud

| Nombre   | Tipo   | Requerido | Descripción                          |
| -------- | ------ | --------- | ------------------------------------ |
| voteId   | Integer | True      | ID del voto a actualizar |

### Cuerpo de la solicitud

Formato: application/json

| Nombre   | Tipo   | Requerido | Descripción                          |
| -------- | ------ | --------- | ------------------------------------ |                          
| optionId     | Integer | True      | Identificador de la opción por votar |

### Respuesta

Devuelve un mensaje exitoso si el voto se actualizó con éxito.

| Estatus | Descripción                              |
| ------- | ---------------------------------------- |
| 200     | Voto actualizado exitosamente     |
| 401     | No autorizado                            |
| 404     | El voto solicitado no existe      |
| 422     | La información está incompleta o es incorrecta. Regresa un objeto con un mensaje (message) y un objeto de errores (errors) que especifica la fuente y el mensaje de error |
| 500     | Error interno del servidor               |

## Eliminar voto

Endpoint: `/api/v1/votes/:voteId`

Method: DELETE

### Parametros de la peticion

| Nombre     | Tipo   | Requerido | Descripción                               |
| ---------- | ------ | --------- | ----------------------------------------- |
| voteId  | Integer | True      | Identificador del voto a eliminar   |

### Respuesta

Devuelve un mensaje exitoso si el voto se eliminó con éxito.

| Estatus | Descripción                              |
| ------- | ---------------------------------------- |
| 200     | Voto eliminado con éxito          |
| 401     | No autorizado                            |
| 404     | No se encontró el voto solicitado |
| 422     | El identificador del voto proporcionado no es válido |
| 500     | Error interno del servidor               |

## Buscar votos por encuesta

Endpoint: `/api/v1/polls/:pollId/votes`

Method: GET

### Parámetros de la Solicitud

| Nombre  | Tipo   | Requerido | Descripción                               |
| ------- | ------ | --------- | ----------------------------------------- |
| pollId  | Integer | True      | Identificador de la encuesta              |

### Respuesta

Devuelve una lista de los votos por opción de una encuesta

| Estatus | Descripción                              |
| ------- | ---------------------------------------- |
| 200     | Éxito, devuelve la lista de votos |
| 422     | El identificador de la encuesta proporcionado no es válido |
| 500     | Error interno del servidor               |