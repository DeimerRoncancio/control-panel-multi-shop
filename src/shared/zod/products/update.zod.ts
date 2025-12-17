import { z } from "zod";

const ProductSchema = z.object({
    productName: z.string().min(1, { message: 'El nombre del producto es requerido' }),
    description: z.string().max(400, { message: 'La descripción no debe exceder los 400 caracteres' }).optional(),
    price: z.string().min(1, { message: 'El precio es requerido' }).refine((value) => {
        const numericValue = parseFloat(value);
        return numericValue > 0;
    }, { message: 'El precio no debe ser negativo' }),
    categoriesList: z.array(z.string()).min(1, { message: 'Seleccione al menos una categoría' }),
    images: z.array(z.instanceof(File)).optional()
})

export default ProductSchema;

export type ProductType = z.infer<typeof ProductSchema>;
