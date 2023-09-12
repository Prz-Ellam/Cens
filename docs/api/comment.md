# Comentarios

## Crear Comentario

Endpoint: `/api/v1/comments`

Método: POST

### Parámetros de la Solicitud

Formato: application/json

| Nombre   | Tipo   | Requerido | Descripción                          |
| -------- | ------ | --------- | ------------------------------------ |
| pollId   | Integer | True      | ID de la encuesta a la que se desea agregar el comentario |
| text     | String | True      | Texto del comentario                 |

### Respuesta

Devuelve un mensaje exitoso si el comentario se creó con éxito.

| Estatus | Descripción                              |
| ------- | ---------------------------------------- |
| 201     | Comentario creado exitosamente           |
| 422     | La información está incompleta o es incorrecta. Regresa un objeto con un mensaje (message) y un objeto de errores (errors) que especifica la fuente y el mensaje de error |
| 404     | No se encontró la encuesta solicitada    |
| 500     | Error interno del servidor               |

## Actualizar Comentario

Endpoint: `/api/v1/comments/:commentId`

Método: PUT

### Parámetros de la Solicitud

| Nombre     | Tipo   | Requerido | Descripción                               |
| ---------- | ------ | --------- | ----------------------------------------- |
| commentId  | Integer | True      | Identificador del comentario a actualizar |

### Parámetros del Cuerpo de la Solicitud

Formato: application/json

| Nombre | Tipo   | Requerido | Descripción        |
| ------ | ------ | --------- | ------------------ |
| text   | String | True      | Nuevo texto del comentario |

### Respuesta

Devuelve un mensaje exitoso si el comentario se actualizó con éxito.

| Estatus | Descripción                              |
| ------- | ---------------------------------------- |
| 200     | Comentario actualizado exitosamente     |
| 401     | No autorizado                            |
| 404     | El comentario solicitado no existe      |
| 422     | La información está incompleta o es incorrecta. Regresa un objeto con un mensaje (message) y un objeto de errores (errors) que especifica la fuente y el mensaje de error |
| 500     | Error interno del servidor               |

## Eliminar Comentario

Endpoint: `/api/v1/comments/:commentId`

Método: DELETE

### Parámetros de la Solicitud

| Nombre     | Tipo   | Requerido | Descripción                               |
| ---------- | ------ | --------- | ----------------------------------------- |
| commentId  | Integer | True      | Identificador del comentario a eliminar   |

### Respuesta

Devuelve un mensaje exitoso si el comentario se eliminó con éxito.

| Estatus | Descripción                              |
| ------- | ---------------------------------------- |
| 200     | Comentario eliminado con éxito          |
| 401     | No autorizado                            |
| 404     | No se encontró el comentario solicitado |
| 422     | El identificador del comentario proporcionado no es válido |
| 500     | Error interno del servidor               |

## Encontrar Todos los Comentarios por Encuesta

Endpoint: `/api/v1/comments/poll/:pollId`

Método: GET

### Parámetros de la Solicitud

| Nombre  | Tipo   | Requerido | Descripción                               |
| ------- | ------ | --------- | ----------------------------------------- |
| pollId  | Integer | True      | Identificador de la encuesta              |
| page    | Integer | False     | Página de resultados (por defecto: 1)    |
| limit   | Integer | False     | Límite de resultados por página (por defecto: 5) |

### Respuesta

Devuelve una lista de comentarios relacionados con la encuesta especificada.

| Estatus | Descripción                              |
| ------- | ---------------------------------------- |
| 200     | Éxito, devuelve la lista de comentarios |
| 422     | El identificador de la encuesta proporcionado no es válido |
| 500     | Error interno del servidor               |

