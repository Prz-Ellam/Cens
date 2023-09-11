# Usuarios

## Registrar usuario

Endpoint: /api/v1/users

Method: POST

### Cuerpo de la peticion

Formato: application/json

| Nombre   | Tipo   | Requerido | Descripción                                    |
| -------- | ------ | --------- | ---------------------------------------------- |
| username | String | True      | Nombre de usuario. Debe ser único              |
| email    | String | True      | Correo electrónico del usuario. Debe ser único |
| password | String | True      | Contraseña del usuario                         |
| confirmPassword | String | True | Confirmación de contraseña de usuario |

### Respuesta

Retorna un token de acceso del usuario registrado

| Estatus | Descrición                                                                                                                                                                |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 201     | Registro exitoso                                                                                                                                                          |
| 400     | La información está incompleta o es incorrecta. Regresa un objeto con un mensaje (message) y un objeto de errores (errors) que especifica la fuente y el mensaje de error |
| 409     | Hay conflicto para realizar la petición por un registro existente
| 415     | El formato de la petición es incorrecto. Debe ser application/json                                                                                                        |
| 422     | El cuerpo de la petición esta incompleto |
| 500     | Error interno del servidor |

## Iniciar sesión

Endpoint: /api/v1/auth

Method: POST

### Cuerpo de la peticion

Formato: application/json

| Nombre   | Tipo   | Requerido | Descripción                                    |
| -------- | ------ | --------- | ---------------------------------------------- |
| email    | String | True      | Correo electrónico del usuario                 |
| password | String | True      | Contraseña del usuario                         |

### Respuesta

Retorna un token de acceso del usuario que inicio sesión

| Estatus | Descrición                                                                                                                                                                |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 200     | Inicio de sesión éxitoso                                                                                                                                                          |
| 401     | Las credenciales para el inicio de sesión no son correctas
| 415     | El formato de la petición es incorrecto. Debe ser application/json                                                                                                        |
| 422     | El cuerpo de la petición esta incompleto |
| 500     | Error interno del servidor |

## Actualizar usuario

Endpoint: /api/v1/users/:id

Method: PUT

### Parametros

| Nombre    | Tipo   | Requerido | Descripción                                    |
| --------  | ------ | --------- | ---------------------------------------------- |
| id  | Integer | True     | Identificador del usuario a actualizar   


### Cuerpo de la peticion

Formato: application/json

| Nombre    | Tipo   | Requerido | Descripción                                    |
| --------  | ------ | --------- | ---------------------------------------------- |
| username  | String | False     | Nombre de usuario. Debe ser único                 |
| email     | String | False     | Correo electrónico del usuario. Debe ser único                 |
| birthDate | Date   | False     | Fecha de nacimiento del usuario                 |
| gender    | String | False     | Genero del usuario                         |
| country   | String | False     | Pais del usuario                         |

### Respuesta

Retorna mensaje exitoso si el usuario fue actualizado

| Estatus | Descrición                                                                                                                                                                |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 200     | Actualizado exitoso                                                                                                                                                          |
| 400     | La información está incompleta o es incorrecta. Regresa un objeto con un mensaje (message) y un objeto de errores (errors) que especifica la fuente y el mensaje de error |
| 403     | Permiso denegado
| 404     | Recurso no encontrado
| 409     | Hay conflicto para realizar la petición por un registro existente
| 415     | El formato de la petición es incorrecto. Debe ser application/json                                                                                                        |
| 422     | El cuerpo de la petición esta incompleto |
| 500     | Error interno del servidor |

## Actualizar contraseña

Endpoint: /api/v1/users/:id/password

Method: PUT

### Parametros

| Nombre    | Tipo   | Requerido | Descripción                                    |
| --------  | ------ | --------- | ---------------------------------------------- |
| id  | Integer | True     | Identificador del usuario a actualizarse la contraseña   

### Cuerpo de la peticion

Formato: application/json

| Nombre    | Tipo   | Requerido | Descripción                                    |
| --------  | ------ | --------- | ---------------------------------------------- |
| currentPassword  | String | True     | Contraseña actual del usuario                 |
| newPassword     | String | True     | Nueva contraseña del usuario                 |
| confirmNewPassword | String   | True     | Confirmación de la nuevacontraseña de usuario                 |

### Respuesta

Retorna mensaje exitoso si la contraseña del usuario fue actualizada

| Estatus | Descrición                                                                                                                                                                |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 200     | Actualizado exitoso                                                                                                                                                          |
| 401     | No autorizado
| 404     | El usuario no fue encontrado
| 415     | El formato de la petición es incorrecto. Debe ser application/json                                                                                                        |
| 422     | El cuerpo de la petición esta incompleto |
| 500     | Error interno del servidor |

## Actualizar avatar

Endpoint: /api/v1/users/:id/avatar

Method: PUT

### Parametros

| Nombre    | Tipo   | Requerido | Descripción                                    |
| --------  | ------ | --------- | ---------------------------------------------- |
| id  | Integer | True     | Identificador del usuario a actualizarse el avatar 

### Cuerpo de la peticion

Formato: multipart/form-data

| Nombre    | Tipo   | Requerido | Descripción                                    |
| --------  | ------ | --------- | ---------------------------------------------- |
| avatar  | image | True     | Imagen del avatar del usuario                 |

### Respuesta

Retorna mensaje exitoso si el avatar fue actualizado

| Estatus | Descrición                                                                                                                                                                |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 200     | Actualizado exitoso                                                                                                                                                          |
| 401     | No autorizado
| 404     | El usuario no fue encontrado
| 422     | El cuerpo de la petición esta incompleto |
| 500     | Error interno del servidor |

## Eliminar usuario

Endpoint: /api/v1/users/:id

Method: DELETE

### Parametros

| Nombre    | Tipo   | Requerido | Descripción                                    |
| --------  | ------ | --------- | ---------------------------------------------- |
| id  | Integer | True     | Identificador del usuario a eliminar   

### Respuesta

Retorna mensaje exitoso si el usuario fue eliminado

| Estatus | Descrición                                                                                                                                                                |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 200     | El usuario fue eliminado con exito                                                               
| 401     | No autorizado
| 404     | No se encontró el usuario solicitado
| 422     | El identificador del usuario proporcionado no es válido |
| 500     | Error interno del servidor |

## Seguir usuario

Endpoint: /api/v1/users/:id/followers

Method: POST

### Parametros

| Nombre    | Tipo   | Requerido | Descripción                                    |
| --------  | ------ | --------- | ---------------------------------------------- |
| id  | Integer | True     | Identificador del usuario a seguir                 |

### Respuesta

Retorna mensaje exitoso si el usuario empezó a ser seguido

| Estatus | Descrición                                                                                                                                                                |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 201     | El usuario fue seguido con exito                                                               
| 404     | No se encontró el usuario solicitado
| 409     | El usuario escogido ya esta siendo seguido
| 422     | El identificador del usuario proporcionado no es válido |
| 500     | Error interno del servidor |

## Dejar de seguir usuario

Endpoint: /api/v1/users/:id/followers

Method: DELETE

### Parametros

| Nombre    | Tipo   | Requerido | Descripción                                    |
| --------  | ------ | --------- | ---------------------------------------------- |
| id  | Integer | True     | Identificador del usuario a seguir                 |


### Respuesta

Retorna mensaje exitoso si el usuario dejo de ser seguido

| Estatus | Descrición                                                                                                                                                                |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 200     | El usuario dejo de ser seguido con exito                                                               
| 404     | No se encontró el usuario o el follow solicitado
| 422     | El identificador del usuario proporcionado no es válido |
| 500     | Error interno del servidor |