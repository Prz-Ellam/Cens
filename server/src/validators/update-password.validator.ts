import type { ValidationStatus } from '@/types/validation-status';
import { formatErrors } from '@/utils/format-error';
import { z } from 'zod';

const updatePasswordValidator = z
    .object({
        currentPassword: z.string().trim().min(1).max(255),
        newPassword: z
            .string({
                invalid_type_error:
                    'La contraseña debe ser una cadena de texto',
            })
            .trim()
            .min(8, 'Es requerido un mínimo de 8 caracteres')
            .max(255, 'Maximo de 255 caracteres')
            .regex(/[A-Z]/, 'Es requerido al menos una mayuscula')
            .regex(/[a-z]/, 'Es requerido al menos una minuscula')
            .regex(/[0-9]/, 'Es requerido al menos un número')
            .regex(
                /([°|¬!"#$%&/()=?¡'¿¨*\]´+}~`{[^;:_,.\-<>@])/,
                'Es requerido al menos un caracter especial',
            ),
        confirmNewPassword: z
            .string({
                invalid_type_error:
                    'La confirmación de contraseña debe ser una cadena de texto',
            })
            .trim()
            .min(1, 'Es requerido al menos 1 caracter')
            .max(255, 'Maximo de 255 caracteres'),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
        message: 'Las contraseñas no coinciden',
    });

export async function validateUpdatePassword(
    model: unknown,
): Promise<ValidationStatus> {
    const result = updatePasswordValidator.safeParse(model);
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
