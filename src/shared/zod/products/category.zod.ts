import z from "zod/v3";

const categorySchema = z.object({
    categoryName: z.string().min(1, { message: 'El nombre de la categoría es requerido' }),
});

export default categorySchema;

export type CategoryType = z.infer<typeof categorySchema>;
