import { z, ZodType } from 'zod';

export class Validation {
  static readonly REGISTER: ZodType = z.object({
    username: z.string().min(6).max(100),
    password: z.string().min(8).max(100),
    firstName: z.string().min(1).max(100),
    lastName: z.string().min(1).max(100).optional(),
  });

  static readonly LOGIN: ZodType = z.object({
    username: z.string().min(6).max(100),
    password: z.string().min(8).max(100),
  });
}
