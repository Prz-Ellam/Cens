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
| 415     | El formato de la petición es incorrecto. Debe ser application/json                                                                                                        |

422
500
409

## Iniciar sesión

Endpoint: /api/v1/auth

### Cuerpo de la peticion

### Respuesta

## Actualizar usuario

Endpoint: /api/v1/users/:id

### Cuerpo de la peticion

### Respuesta

## Actualizar contraseña

Endpoint: /api/v1/users/:id/password

### Cuerpo de la peticion

### Respuesta

## Actualizar avatar

Endpoint: /api/v1/users/:id/avatar

### Cuerpo de la peticion

### Respuesta

## Eliminar usuario

Endpoint: /api/v1/users/:id

### Cuerpo de la peticion

### Respuesta

## Seguir usuario

Endpoint: /api/v1/users/:id/followers

### Cuerpo de la peticion

### Respuesta

## Dejar de seguir usuario

Endpoint: /api/v1/users/:id/followers

### Cuerpo de la peticion

### Respuesta