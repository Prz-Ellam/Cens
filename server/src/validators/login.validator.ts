import type { ValidationStatus } from '@/types/validation-status';
import { formatErrors } from '@/utils/format-error';
import { z } from 'zod';

export const loginValidator = z.object({
    email: z.string().trim().min(1).max(255),
    password: z.string().trim().min(1).max(255),
});

export function validateLogin(model: unknown): ValidationStatus {
    const result = loginValidator.safeParse(model);
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
