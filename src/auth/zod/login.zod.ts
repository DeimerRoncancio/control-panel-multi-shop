import { z } from 'zod';

const AccesLoginSchema = z.object({
  identifier: z
    .string()
    .min(1, { message: 'El correo es requerido' })
    .email({ message: 'El correo es invalido' }),
  password: z
    .string()
    .min(1, {
      message: 'La contraseña es requerida',
    })
    .min(8, {
      message: 'Debe ser mayor a 8 digitos',
    })
    .max(20, {
      message: 'Debe ser menor a 20 digitos',
    }),
});

export default AccesLoginSchema;

export type LoginTypeAccess = z.infer<typeof AccesLoginSchema>;
