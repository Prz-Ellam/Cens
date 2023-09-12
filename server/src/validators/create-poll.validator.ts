import type { ValidationStatus } from '@/types/validation-status';
import { formatErrors } from '@/utils/format-error';
import { z } from 'zod';

const createPollValidator = z.object({
    question: z.string().trim().min(1).max(255),
    description: z.string().trim().min(1).max(255),
    options: z.array(z.string().trim().min(1).max(65)).min(2).max(5),
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
