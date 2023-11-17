import z from 'zod';

const loginValidator = z.object({
  email: z
    .string({
      invalid_type_error: 'El correo electrónico debe ser una cadena de texto.'
    })
    .trim()
    .min(1, 'Es requerido al menos 1 caracter.')
    .max(255, 'Maximo de 255 caracteres permitidos.'),
  password: z
    .string({
      invalid_type_error: 'La contraseña debe ser una cadena de texto.'
    })
    .trim()
    .min(1, 'Es requerido al menos 1 caracter.')
    .max(255, 'Maximo de 255 caracteres permitidos.')
});

export default loginValidator;
