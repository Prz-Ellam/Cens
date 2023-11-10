import type { ZodError } from 'zod';

/**
 * Convertir los errores a un formato mas legible
 * @param error
 * @returns
 */
export function formatErrors(error: ZodError): object {
    return error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
    }));
}
