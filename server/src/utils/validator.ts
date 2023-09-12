// import type { ValidationStatus } from '@/types/validation-status';
// import type { ZodObject } from 'zod';
// import { formatErrors } from './format-error';

// export function validateWithValidator(
//     validator: ZodObject,
//     model: unknown,
// ): ValidationStatus {
//     const result = validator.safeParse(model);
//     if (!result.success) {
//         return {
//             status: false,
//             errors: formatErrors(result.error),
//         };
//     }
//     return {
//         status: true,
//         errors: {},
//     };
// }
