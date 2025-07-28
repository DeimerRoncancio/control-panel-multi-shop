import { z } from 'zod';

const UpdateSchema = z.object({
  name: z.string().min(1, { message: 'El correo es requerido' }),
  secondName: z.string().min(1, {
    message: 'El segundo nombre es requerido',
  }),
  lastnames: z.string().min(1, { message: 'El apellido es requerido' }),
  phoneNumber: z.string().min(1, {
    message: 'El numero de telefono es requerido',
  }),
  gender: z.enum(['male', 'female'], {
    message: 'El genero es requerido',
  }),
  email: z
    .string()
    .min(1, {
      message: 'El correo es requerido',
    })
    .email({
      message: 'El correo es invalido',
    }),
  admin: z.enum(['true', 'false'], {
    message: 'El rol es requerido',
  }),
});

export default UpdateSchema;

export type UpdateTypeAccess = z.infer<typeof UpdateSchema>;
