import type { ValidationStatus } from '@/types/validation-status';
import { formatErrors } from '@/utils/format-error';
import { z } from 'zod';

const createPollValidator = z.object({
    text: z
        .string({
            invalid_type_error: 'El texto debe ser una cadena de texto',
        })
        .trim()
        .min(1, 'Es requerido al menos 1 caracter')
        .max(255, 'Maximo de 255 caracteres'),
});

export function validateCreateComment(model: unknown): ValidationStatus {
    const result = createPollValidator.safeParse(model);
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
