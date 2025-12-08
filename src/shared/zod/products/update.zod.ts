import { z } from "zod";

const UpdateProductSchema = z.object({
    productName: z.string().min(1, { message: 'El nombre del producto es requerido' }),
    description: z.string().max(400, { message: 'La descripción no debe exceder los 400 caracteres' }).optional(),
    price: z.string().min(1, { message: 'El precio es requerido' }).refine((value) => {
        const numericValue = parseFloat(value);
        return numericValue > 0;
    }, { message: 'El precio no debe ser negativo' }),
})

export default UpdateProductSchema;

export type UpdateProductType = z.infer<typeof UpdateProductSchema>;
