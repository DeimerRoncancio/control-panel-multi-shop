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
    // Set initial values in the form based on the user data
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
    <form onSubmit={handleSubmit(onSubimit)}>
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="flex flex-col">
            <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Primer nombre
            </span>
            <input
              id="name"
              type="text"
              className="w-full p-2.5 input input-primary"
              placeholder="John"
              {...register('name')}
            />
          </label>
          <ErrorMessage errors={errors} fieldName="name" />
        </div>
        <div>
          <label htmlFor="secondName" className="flex flex-col">
            <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Segundo nombre
            </span>
            <input
              id="secondName"
              type="text"
              className="w-full p-2.5 input input-primary"
              placeholder="Doe"
              {...register('secondName')}
            />
          </label>
          <ErrorMessage errors={errors} fieldName="secondName" />
        </div>
        <div>
          <label htmlFor="lastnames" className="flex flex-col">
            <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Apellido
            </span>
            <input
              id="lastnames"
              type="text"
              className="w-full p-2.5 input input-primary"
              placeholder="Sanchez Gavilan"
              {...register('lastnames')}
            />
          </label>
          <ErrorMessage errors={errors} fieldName="lastnames" />
        </div>
        <div>
          <label htmlFor="phoneNumber" className="flex flex-col">
            <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Numero de teléfono
            </span>
            <input
              id="phoneNumber"
              type="tel"
              className="w-full p-2.5 input input-primary"
              placeholder="123-45-678"
              {...register('phoneNumber')}
            />
          </label>
          <ErrorMessage errors={errors} fieldName="phoneNumber" />
        </div>
      </div>
      <div className="mb-6">
        <div>
          <label htmlFor="gender" className="flex flex-col">
            <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Genero
            </span>
            <select
              id="gender"
              defaultValue=""
              className="select select-primary w-full p-2.5"
              {...register('gender')}
            >
              <option disabled>Selecciona Genero</option>
              <option value="male">Hombre</option>
              <option value="female">Mujer</option>
            </select>
          </label>
          <ErrorMessage errors={errors} fieldName="gender" />
        </div>
      </div>
      <div className="mb-6">
        <label htmlFor="email" className="flex flex-col">
          <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Email
          </span>
          <input
            id="email"
            type="email"
            className="w-full p-2.5 input input-primary"
            placeholder="john.doe@company.com"
            {...register('email')}
          />
        </label>
        <ErrorMessage errors={errors} fieldName="email" />
      </div>

      <button
        type="submit"
        className="text-white text-sm w-[300px] px-5 py-2.5 btn btn-primary"
      >
        {pending ? (
          <span className="loading loading-spinner loading-sm" />
        ) : (
          'Actualizar'
        )}
      </button>
    </form>
  );
}

export default FormUpdate;
