# Encuestas

## Crear Encuesta

Endpoint: `/api/v1/polls`

Method: POST

### Parámetros de la Solicitud

Formato: application/json

| Nombre      | Tipo   | Requerido | Descripción                                    |
| ----------- | ------ | --------- | ---------------------------------------------- |
| question    | String | True      | Pregunta de la encuesta                        |
| description | String | False     | Descripción de la encuesta (opcional)          |
| options     | Array  | True      | Opciones de respuesta de la encuesta (mínimo una) |

### Respuesta

Devuelve un mensaje exitoso si la encuesta se creó con éxito.

| Estatus | Descripción                              |
| ------- | ---------------------------------------- |
| 201     | Encuesta creada con éxito                |
| 422     | La información está incompleta o es incorrecta. Regresa un objeto con un mensaje (message) y un objeto de errores (errors) que especifica la fuente y el mensaje de error |
| 500     | Error interno del servidor               |

<div style="page-break-after: always;"></div>

## Actualizar Encuesta

Endpoint: `/api/v1/polls/:pollId`

Method: PUT

### Parámetros de la Solicitud

| Nombre  | Tipo   | Requerido | Descripción                                    |
| ------- | ------ | --------- | ---------------------------------------------- |
| pollId  | Integer | True      | ID de la encuesta a actualizar                 |

### Respuesta

Devuelve un mensaje que indica que las encuestas no pueden ser modificadas para garantizar la integridad de los datos recopilados.

| Estatus | Descripción                              |
| ------- | ---------------------------------------- |
| 405     | Las encuestas no pueden ser modificadas para garantizar la integridad de los datos recopilados |

<div style="page-break-after: always;"></div>

## Eliminar Encuesta

Endpoint: `/api/v1/polls/:pollId`

Method: DELETE

### Parámetros de la Solicitud

| Nombre  | Tipo   | Requerido | Descripción                                    |
| ------- | ------ | --------- | ---------------------------------------------- |
| pollId  | Integer | True      | ID de la encuesta a eliminar                   |

### Respuesta

Devuelve un mensaje exitoso si la encuesta se eliminó con éxito.

| Estatus | Descripción                              |
| ------- | ---------------------------------------- |
| 200     | Encuesta eliminada con éxito            |
| 401     | No autorizado                            |
| 404     | La encuesta que solicitó no fue encontrada |
| 422     | El identificador seleccionado no es válido |
| 500     | Error interno del servidor               |

<div style="page-break-after: always;"></div>

## Encontrar Encuesta por ID

Endpoint: `/api/v1/polls/:id`

Method: GET

### Parámetros de la Solicitud

| Nombre  | Tipo   | Requerido | Descripción                                    |
| ------- | ------ | --------- | ---------------------------------------------- |
| id      | Integer | True      | ID de la encuesta que se desea consultar       |

### Respuesta

Devuelve los detalles de la encuesta solicitada.

| Estatus | Descripción                              |
| ------- | ---------------------------------------- |
| 200     | Éxito, devuelve los detalles de la encuesta |
| 422     | El identificador seleccionado no es válido |
| 404     | No se encontró la encuesta solicitada   |
| 500     | Error interno del servidor               |


<div style="page-break-after: always;"></div>