import type { ValidationStatus } from '@/types/validation-status';
import { formatErrors } from '@/utils/format-error';
import { z } from 'zod';

const idValidator = z.number().int().min(1).max(2147483647);

export function validateId(id: number): ValidationStatus {
    const result = idValidator.safeParse(id);
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
