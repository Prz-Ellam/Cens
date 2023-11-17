import z from 'zod';
import { allCountries } from '@/utils/countries';

const calculateAge = (birthDate) => {
  const today = new Date();
  const eighteenYearsAgo = new Date(today);
  eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

  if (eighteenYearsAgo.getTime() <= birthDate.getTime()) {
    return false;
  }

  return true;
};

const validator = z.object({
  email: z
    .string({
      invalid_type_error: 'El correo electrónico debe ser una cadena de texto.'
    })
    .email('El correo electrónico no tiene el formato requerido.')
    .optional(),
  username: z
    .string({
      invalid_type_error: 'El nombre de usuario debe ser una cadena de texto.'
    })
    .trim()
    .min(2, 'Es requerido al menos 2 caracteres.')
    .max(255, 'Maximo de 255 caracteres permitidos.')
    .optional(),
  birthDate: z.coerce
    .date()
    .refine((value) => {
      if (!value) return true;
      return calculateAge(value);
    }, 'Debes ser mayor de 18 años para registrarte.')
    .optional()
    .or(z.literal(''))
    .or(z.literal(null)),
  country: z
    .enum(Object.keys(allCountries))
    .optional()
    .or(z.literal(''))
    .or(z.literal(null)),
  gender: z
    .enum(['masculino', 'femenino', 'otro'])
    .optional()
    .or(z.literal(''))
    .or(z.literal(null))
});

export default validator;
