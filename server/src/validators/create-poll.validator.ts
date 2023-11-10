import type { ValidationStatus } from '@/types/validation-status';
import { formatErrors } from '@/utils/format-error';
import { z } from 'zod';

const createPollValidator = z.object({
    question: z
        .string({
            invalid_type_error: 'La pregunta debe ser una cadena de texto',
        })
        .trim()
        .min(1, 'Es requerido al menos 1 caracter')
        .max(255, 'Máximo de 255 caracteres'),
    description: z
        .string({
            invalid_type_error: 'La descripción debe ser una cadena de texto',
        })
        .trim()
        .min(1, 'Es requerido al menos 1 caracter')
        .max(255, 'Máximo de 255 caracteres'),
    options: z
        .array(
            z
                .string({
                    invalid_type_error:
                        'La opción debe ser una cadena de texto',
                })
                .trim()
                .min(1, 'Es requerido al menos 1 caracter')
                .max(65, 'Máximo de 255 caracteres'),
        )
        .min(2, 'Debe haber minimo 2 opciones')
        .max(5, 'Debe haber máximo 5 opciones'),
});

export function validateCreatePoll(model: unknown): ValidationStatus {
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
