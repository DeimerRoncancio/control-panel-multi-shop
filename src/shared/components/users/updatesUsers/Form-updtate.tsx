import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ErrorMessage from '../../globalComponents/MessajeError';
import { Content } from '../../../interfaces/get-users-request';
import { setValuesUpdate } from '../../../helpers/set-values-update';
import UpdateSchema, { UpdateTypeAccess } from '../../../zod/users/update.zod';
import UserUpdate from '../../../interfaces/user-update';

function FormUpdate({
  pending,
  user,
  functionUpdate,
}: {
  pending: boolean;
  user: Content | null;
  functionUpdate: (userUpdates: UserUpdate) => void;
}) {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateTypeAccess>({
    resolver: zodResolver(UpdateSchema),
  });

  useEffect(() => {
    if (user) {
      setValuesUpdate.forEach((value) => {
        const fieldValue = user[value];
        setValue(value, fieldValue === null ? '' : fieldValue.toString());
      });
    }
  }, [user, setValue]);

  const onSubimit: SubmitHandler<UpdateTypeAccess> = (data) => {
    functionUpdate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubimit)} className="space-y-4">
      <p className="mb-4 font-light text-gray-400">Modifica la información del usuario en el sistema.</p>

      <div>
        <h4 className="border-b border-gray-700 pb-2 mb-4 text-sm font-semibold text-gray-400 uppercase tracking-wider">
          Datos Personales
        </h4>
        <div className="grid gap-4 mb-6 md:grid-cols-2">
          <label className="flex flex-col">
            <span className="mb-2 text-sm font-medium">Primer nombre</span>
            <input
              type="text"
              className="input input-bordered w-full bg-gray-800 focus:bg-gray-700 transition duration-200"
              placeholder="John"
              {...register('name')}
            />
            <ErrorMessage errors={errors} fieldName="name" />
          </label>

          <label className="flex flex-col">
            <span className="mb-2 text-sm font-medium">Segundo nombre</span>
            <input
              type="text"
              className="input input-bordered w-full bg-gray-800 focus:bg-gray-700 transition duration-200"
              placeholder="Doe"
              {...register('secondName')}
            />
            <ErrorMessage errors={errors} fieldName="secondName" />
          </label>

          <label className="flex flex-col">
            <span className="mb-2 text-sm font-medium">Apellido</span>
            <input
              type="text"
              className="input input-bordered w-full bg-gray-800 focus:bg-gray-700 transition duration-200"
              placeholder="Sanchez Gavilan"
              {...register('lastnames')}
            />
            <ErrorMessage errors={errors} fieldName="lastnames" />
          </label>

          <label className="flex flex-col">
            <span className="mb-2 text-sm font-medium">Numero de teléfono</span>
            <input
              type="tel"
              className="input input-bordered w-full bg-gray-800 focus:bg-gray-700 transition duration-200"
              placeholder="123-45-678"
              {...register('phoneNumber')}
            />
            <ErrorMessage errors={errors} fieldName="phoneNumber" />
          </label>

          <label className="flex flex-col md:col-span-2">
            <span className="mb-2 text-sm font-medium">Genero</span>
            <select
              defaultValue=""
              className="select select-bordered w-full bg-gray-800 focus:bg-gray-700 transition duration-200"
              {...register('gender')}
            >
              <option disabled>Selecciona Genero</option>
              <option value="male">Hombre</option>
              <option value="female">Mujer</option>
            </select>
            <ErrorMessage errors={errors} fieldName="gender" />
          </label>
        </div>
      </div>

      {/* Sección 2: Cuenta y Rol */}
      <div className="pt-2">
        <h4 className="border-b border-gray-700 pb-2 mb-4 text-sm font-semibold text-gray-400 uppercase tracking-wider">
          Cuenta y Asignación
        </h4>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col">
            <span className="mb-2 text-sm font-medium">Email</span>
            <input
              type="email"
              className="input input-bordered w-full bg-gray-800 focus:bg-gray-700 transition duration-200"
              placeholder="john.doe@company.com"
              {...register('email')}
            />
            <ErrorMessage errors={errors} fieldName="email" />
          </label>

          <label className="flex flex-col">
            <span className="mb-2 text-sm font-medium">Rol</span>
            <select
              defaultValue=""
              className="select select-bordered w-full bg-gray-800 focus:bg-gray-700 transition duration-200"
              {...register('admin')}
            >
              <option disabled>Selecciona Rol</option>
              <option value="true">Administrador</option>
              <option value="false">Usuario</option>
            </select>
            <ErrorMessage errors={errors} fieldName="admin" />
          </label>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 pt-4">
        <button
          type="button"
          className="btn btn-error btn-outline"
          onClick={() => {
            const modal = document.getElementById("update_user") as HTMLDialogElement;
            if (modal) modal.close();
          }}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="btn btn-primary shadow-md"
          disabled={pending}
        >
          {pending ? (
             <span className="loading loading-spinner loading-sm" />
          ) : (
            'Actualizar Usuario'
          )}
        </button>
      </div>
    </form>
  );
}

export default FormUpdate;
