import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

export const signupSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const operationSelectionSchema = z.object({
  operationType: z.enum(['addition', 'subtraction', 'multiplication', 'division']).refine(
    (val) => !!val,
    { message: 'Please select an operation type' }
  ),
  digits: z.enum(['1', '2', '3', '4']).refine(
    (val) => !!val,
    { message: 'Please select number of digits' }
  ),
});

export const answerSchema = z.object({
  answers: z
    .record(z.string(), z.string().regex(/^\d+$/, 'Answer must be a valid number'))
    .refine(
      (answers) => Object.keys(answers).length === 50,
      'All 50 questions must be answered'
    ),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
export type OperationSelectionFormData = z.infer<typeof operationSelectionSchema>;
export type AnswerFormData = z.infer<typeof answerSchema>;
