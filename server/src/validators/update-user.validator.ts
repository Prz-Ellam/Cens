import type { ValidationStatus } from '@/types/validation-status';
import { formatErrors } from '@/utils/format-error';
import { z } from 'zod';
import { allCountries } from '@/utils/countries';

const countries: [string, ...string[]] = [
    allCountries[0],
    ...allCountries.slice(1),
];

const calculateAge = (birthDate: Date): boolean => {
    const today = new Date();
    const eighteenYearsAgo = new Date(today);
    eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

    if (eighteenYearsAgo.getTime() <= birthDate.getTime()) {
        return false;
    }

    return true;
};

const updateUserValidator = z.object({
    email: z
        .string({
            invalid_type_error:
                'El correo electrónico debe ser una cadena de texto.',
        })
        .email('El correo electrónico no tiene el formato requerido.')
        .optional(),
    username: z
        .string({
            invalid_type_error:
                'El nombre de usuario debe ser una cadena de texto.',
        })
        .trim()
        .min(3, 'Es requerido al menos 3 caracteres.')
        .max(8, 'Maximo de 8 caracteres permitidos.')
        .regex(
            /^(?=.{3,8}$)(?![.])(?!.*[.]{2})[a-zA-Z0-9.]+(?<![.])$/,
            'Nombre de usuario no valido',
        )
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
