import z from 'zod';

const loginValidator = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: 'El campo email debe tener al menos 1 caracter.' })
    .max(255, {
      message: 'El campo email no debe tener más de 255 caracteres.'
    }),
  password: z
    .string()
    .trim()
    .min(1, { message: 'El campo password debe tener al menos 1 caracter.' })
    .max(255, {
      message: 'El campo password no debe tener más de 255 caracteres.'
    })
});

export default loginValidator;
