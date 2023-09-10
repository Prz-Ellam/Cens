import type { ValidationStatus } from '@/types/validation-status';
import { formatErrors } from '@utils/format-error';
import { z } from 'zod';

const createPollValidator = z.object({
    text: z.string().min(1).max(255),
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
