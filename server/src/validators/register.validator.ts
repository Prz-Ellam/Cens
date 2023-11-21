import type { ValidationStatus } from '@/types/validation-status';
import { formatErrors } from '@/utils/format-error';
import { z } from 'zod';

const registerValidator = z
    .object({
        email: z
            .string({
                invalid_type_error:
                    'El correo electrónico debe ser una cadena de texto.',
            })
            .email('El correo electrónico no tiene el formato requerido.'),
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
            ),
        password: z
            .string({
                invalid_type_error:
                    'La contraseña debe ser una cadena de texto.',
            })
            .trim()
            .min(8, 'Es requerido un mínimo de 8 caracteres.')
            .max(255, 'Maximo de 255 caracteres permitidos.')
            .regex(/[A-Z]/, 'Es requerido al menos una mayuscula.')
            .regex(/[a-z]/, 'Es requerido al menos una minuscula.')
            .regex(/[0-9]/, 'Es requerido al menos un número.')
            .regex(
                /([°|¬!"#$%&/()=?¡'¿¨*\]´+}~`{[^;:_,.\-<>@])/,
                'Es requerido al menos un caracter especial.',
            ),
        confirmPassword: z
            .string({
                invalid_type_error:
                    'La confirmación de contraseña debe ser una cadena de texto.',
            })
            .trim()
            .min(1, 'Es requerido al menos 1 caracter.')
            .max(255, 'Maximo de 255 caracteres permitidos.'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Las contraseñas no coinciden.',
        path: ['confirmPassword'],
    });

export async function validateRegister(
    model: unknown,
): Promise<ValidationStatus> {
    const result = registerValidator.safeParse(model);
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
