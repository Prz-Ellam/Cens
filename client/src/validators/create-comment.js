import { z } from 'zod';

const createCommentValidator = z.object({
  text: z
    .string({
      invalid_type_error: 'El texto debe ser una cadena de texto'
    })
    .trim()
    .min(1, 'Es requerido al menos 1 caracter')
    .max(255, 'Maximo de 255 caracteres')
});

export default createCommentValidator;
