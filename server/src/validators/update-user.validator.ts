import type { ValidationStatus } from '@/types/validation-status';
import { formatErrors } from '@/utils/format-error';
import { z } from 'zod';
import { allCountries } from '@/utils/countries';

const countries: [string, ...string[]] = [
    allCountries[0],
    ...allCountries.slice(1),
];

const updateUserValidator = z.object({
    email: z
        .string({
            invalid_type_error:
                'El correo electrónico debe ser una cadena de texto',
        })
        .email('Es requerido que sea un email')
        .optional(),
    username: z
        .string({
            invalid_type_error:
                'El nombre de usuario debe ser una cadena de texto',
        })
        .trim()
        .min(1, 'Es requerido al menos 1 caracter')
        .max(255, 'Maximo de 255 caracteres')
        .optional(),
    birthDate: z.coerce.date().optional().or(z.literal('')).or(z.literal(null)),
    country: z.enum(countries).optional().or(z.literal('')).or(z.literal(null)),
    gender: z
        .enum(['masculino', 'femenino', 'otro'])
        .optional()
        .or(z.literal(''))
        .or(z.literal(null)),
});

export function validateUpdateUser(model: unknown): ValidationStatus {
    const result = updateUserValidator.safeParse(model);
    if (!result.success) {
        return {
            status: false,
            errors: formatErrors(result.error),
        };
    }
    return {
        status: true,
        errors: {},
    };
}
