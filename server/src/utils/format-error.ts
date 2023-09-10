import type { ZodError } from 'zod';

export function formatErrors(error: ZodError): object {
    return error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
    }));
}
