import z from "zod";

export const VariantSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: 'El nombre de la variante es requerido' }),
  tag: z.string().min(1, { message: 'El tag de la variante es requerido' }),
  type: z.enum(['select', 'color', 'text'])
    .refine(val => val !== 'select', { message: 'Selecciona un tipo de variante' }),
  listValues: z.array(z.string()).min(2, { message: 'Debe haber al menos dos valores para la variante' }),
});

export type VariantType = z.infer<typeof VariantSchema>;
