import z from 'zod';

const validator = z
  .object({
    currentPassword: z
      .string({
        invalid_type_error: 'La contraseña debe ser una cadena de texto.'
      })
      .trim()
      .min(1, 'Es requerido al menos 1 caracter.')
      .max(255, 'Maximo de 255 caracteres permitidos.'),
    newPassword: z
      .string({
        invalid_type_error: 'La contraseña debe ser una cadena de texto.'
      })
      .trim()
      .min(8, 'Es requerido un mínimo de 8 caracteres.')
      .max(255, 'Maximo de 255 caracteres permitidos.')
      .regex(/[A-Z]/, 'Es requerido al menos una mayuscula.')
      .regex(/[a-z]/, 'Es requerido al menos una minuscula.')
      .regex(/[0-9]/, 'Es requerido al menos un número.')
      .regex(
        /([°|¬!"#$%&/()=?¡'¿¨*\]´+}~`{[^;:_,.\-<>@])/,
        'Es requerido al menos un caracter especial.'
      ),
    confirmNewPassword: z
      .string({
        invalid_type_error:
          'La confirmación de contraseña debe ser una cadena de texto.'
      })
      .trim()
      .min(1, 'Es requerido al menos 1 caracter.')
      .max(255, 'Maximo de 255 caracteres permitidos.')
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Las contraseñas no coinciden.',
    path: ['confirmNewPassword']
  });

export default validator;
