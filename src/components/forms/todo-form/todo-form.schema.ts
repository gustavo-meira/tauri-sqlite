import { z } from 'zod';

export const todoFormSchema = z.object({
  text: z.string().min(1),
});

export type TodoFormSchemaInput = z.input<typeof todoFormSchema>;
export type TodoFormSchemaOutput = z.output<typeof todoFormSchema>;
