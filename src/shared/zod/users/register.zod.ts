import { z } from 'zod';

const RegisterSchema = z
  .object({
    name: z.string().min(1, { message: 'El correo es requerido' }),
    secondName: z.string().optional(),
    lastnames: z.string().min(1, { message: 'El apellido es requerido' }),
    // El backend guarda el teléfono como Long: cualquier letra lo deja en null
    // y la petición falla.
    phoneNumber: z
      .string()
      .min(1, { message: 'El numero de telefono es requerido' })
      .refine((value) => /^\d+$/.test(value.replace(/[\s()+-]/g, '')), {
        message: 'El telefono solo puede tener numeros',
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
    confirm_password: z.string().min(1, {
      message: 'La confirmación de contraseña es requerida',
    }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Las contraseñas no coinciden',
    path: ['confirm_password'],
  });

export default RegisterSchema;

export type RegisterTypeAccess = z.infer<typeof RegisterSchema>;
