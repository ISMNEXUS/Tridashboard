import { z } from 'zod';

// Auth Schemas
export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export const registerSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  phone: z.string().optional(),
});

// Lead Schemas
export const createLeadSchema = z.object({
  firstName: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  lastName: z.string().min(2, 'El apellido debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
  source: z.enum(['WEBSITE', 'REFERRAL', 'SOCIAL_MEDIA', 'PHONE_CALL', 'EMAIL', 'WALK_IN', 'ADVERTISEMENT', 'OTHER']),
  notes: z.string().optional(),
});

export const updateLeadSchema = createLeadSchema.partial();

// Sale Schemas
export const createSaleSchema = z.object({
  customerId: z.string().optional(),
  items: z.array(z.object({
    productName: z.string(),
    description: z.string().optional(),
    quantity: z.number().positive(),
    unitPrice: z.number().positive(),
  })),
  discount: z.number().default(0),
  notes: z.string().optional(),
});

// Invoice Schemas
export const createInvoiceSchema = z.object({
  saleId: z.string().optional(),
  dueDate: z.date(),
  notes: z.string().optional(),
});

// User Schemas
export const createUserSchema = z.object({
  email: z.string().email('Email inválido'),
  name: z.string().min(2),
  password: z.string().min(8),
  phone: z.string().optional(),
  roleIds: z.array(z.string()).min(1, 'Debe asignar al menos un rol'),
});

export const updateUserSchema = createUserSchema.partial().omit({ password: true });

// Types
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type CreateLeadInput = z.infer<typeof createLeadSchema>;
export type UpdateLeadInput = z.infer<typeof updateLeadSchema>;
export type CreateSaleInput = z.infer<typeof createSaleSchema>;
export type CreateInvoiceInput = z.infer<typeof createInvoiceSchema>;
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
