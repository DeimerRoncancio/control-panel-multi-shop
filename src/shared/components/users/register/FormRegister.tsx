import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { GrFormView, GrFormViewHide } from 'react-icons/gr';
import { zodResolver } from '@hookform/resolvers/zod';
import ErrorMessage from '../../globalComponents/MessajeError';
import RegisterSchema, {
  RegisterTypeAccess,
} from '../../../zod/users/register.zod';

type Props = {
  pending: boolean;
  functionUpdate: (data: RegisterTypeAccess) => void;
}

function FormRegister({ pending, functionUpdate }: Props) {
  const [viewPassword, setViewPassword] = useState(false);
  const [viewConfirmPassword, setViewConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterTypeAccess>({ resolver: zodResolver(RegisterSchema) });

  const onSubimit: SubmitHandler<RegisterTypeAccess> = (data) => functionUpdate(data);

  return (
    <form onSubmit={handleSubmit(onSubimit)} className="space-y-4">
      <p className="mb-4 font-light text-gray-400">Ingresa la información requerida para registrar el nuevo usuario.</p>

      <div>
        <h4 className="border-b border-gray-700 pb-2 mb-4 text-sm font-semibold text-gray-400 uppercase tracking-wider">
          Datos Personales
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex flex-col">
            <span className="mb-2 text-sm font-medium">Nombre</span>
            <input
              type="text"
              className="input input-bordered w-full bg-gray-800 focus:bg-gray-700 transition duration-200"
              placeholder="Ej. John"
              {...register('name')}
            />
            <ErrorMessage errors={errors} fieldName="name" />
          </label>

          <label className="flex flex-col">
            <span className="mb-2 text-sm font-medium">Segundo Nombre</span>
            <input
              type="text"
              className="input input-bordered w-full bg-gray-800 focus:bg-gray-700 transition duration-200"
              placeholder="Ej. Doe"
              {...register('secondName')}
            />
            <ErrorMessage errors={errors} fieldName="secondName" />
          </label>

          <label className="flex flex-col">
            <span className="mb-2 text-sm font-medium">Apellidos</span>
            <input
              type="text"
              className="input input-bordered w-full bg-gray-800 focus:bg-gray-700 transition duration-200"
              placeholder="Ej. Smith"
              {...register('lastnames')}
            />
            <ErrorMessage errors={errors} fieldName="lastnames" />
          </label>

          <label className="flex flex-col">
            <span className="mb-2 text-sm font-medium">Teléfono</span>
            <input
              type="tel"
              className="input input-bordered w-full bg-gray-800 focus:bg-gray-700 transition duration-200"
              placeholder="+57 300 000 0000"
              {...register('phoneNumber')}
            />
            <ErrorMessage errors={errors} fieldName="phoneNumber" />
          </label>

          <label className="flex flex-col md:col-span-2">
            <span className="mb-2 text-sm font-medium">Género</span>
            <select
              className="select select-bordered w-full bg-gray-800 focus:bg-gray-700 transition duration-200"
              defaultValue=""
              {...register('gender')}
            >
              <option value="" disabled>Selecciona Género</option>
              <option value="male">Hombre</option>
              <option value="female">Mujer</option>
            </select>
            <ErrorMessage errors={errors} fieldName="gender" />
          </label>
        </div>
      </div>

      {/* Sección 2: Cuenta */}
      <div className="pt-4">
        <h4 className="border-b border-gray-700 pb-2 mb-4 text-sm font-semibold text-gray-400 uppercase tracking-wider">
          Cuenta y Seguridad
        </h4>
        <div className="grid grid-cols-1 gap-4">
          <label className="flex flex-col">
            <span className="mb-2 text-sm font-medium">Correo Electrónico</span>
            <input
              type="email"
              className="input input-bordered w-full bg-gray-800 focus:bg-gray-700 transition duration-200"
              placeholder="usuario@ejemplo.com"
              {...register('email')}
            />
            <ErrorMessage errors={errors} fieldName="email" />
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex flex-col relative">
              <span className="mb-2 text-sm font-medium">Contraseña</span>
              <div className="relative">
                <input
                  type={viewPassword ? 'text' : 'password'}
                  className="input input-bordered w-full bg-gray-800 focus:bg-gray-700 pr-10 transition duration-200"
                  placeholder="••••••••"
                  {...register('password')}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-white transition-colors"
                  onClick={() => setViewPassword(!viewPassword)}
                >
                  {viewPassword ? <GrFormViewHide size={18} /> : <GrFormView size={18} />}
                </button>
              </div>
              <ErrorMessage errors={errors} fieldName="password" />
            </label>

            <label className="flex flex-col relative">
              <span className="mb-2 text-sm font-medium">Confirmar Contraseña</span>
              <div className="relative">
                <input
                  type={viewConfirmPassword ? 'text' : 'password'}
                  className="input input-bordered w-full bg-gray-800 focus:bg-gray-700 pr-10 transition duration-200"
                  placeholder="••••••••"
                  {...register('confirm_password')}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-white transition-colors"
                  onClick={() => setViewConfirmPassword(!viewConfirmPassword)}
                >
                  {viewConfirmPassword ? <GrFormViewHide size={18} /> : <GrFormView size={18} />}
                </button>
              </div>
              <ErrorMessage errors={errors} fieldName="confirm_password" />
            </label>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 pt-4">
        <button
          type="button"
          className="btn btn-error btn-outline"
          onClick={() => {
            reset();
            const modal = document.getElementById("create_user") as HTMLDialogElement;
            if (modal) modal.close();
          }}
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={pending}
          className="btn btn-primary shadow-md"
        >
          {pending ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            'Registrar Usuario'
          )}
        </button>
      </div>
    </form>
  );
}

export default FormRegister;
