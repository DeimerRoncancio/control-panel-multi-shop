import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ErrorMessage from '../../globalComponents/MessajeError';
import { Content } from '../../../interfaces/get-users-request';
import { setValuesUpdate } from '../../../helpers/set-values-update';
import UpdateSchema, { UpdateTypeAccess } from '../../../zod/users/update.zod';
import UserUpdate from '../../../interfaces/user-update';
import {
  inputClass,
  labelTextClass,
  formSectionTitleClass,
  formFooterClass,
  outlineButtonClass,
  primaryButtonClass,
} from '../../../ui/styles';

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
      <div>
        <h4 className={formSectionTitleClass}>Datos Personales</h4>
        <div className="grid gap-4 mb-6 md:grid-cols-2">
          <label className="flex flex-col">
            <span className={labelTextClass}>Primer nombre</span>
            <input
              type="text"
              className={inputClass}
              placeholder="John"
              {...register('name')}
            />
            <ErrorMessage errors={errors} fieldName="name" />
          </label>

          <label className="flex flex-col">
            <span className={labelTextClass}>Segundo nombre</span>
            <input
              type="text"
              className={inputClass}
              placeholder="Doe"
              {...register('secondName')}
            />
            <ErrorMessage errors={errors} fieldName="secondName" />
          </label>

          <label className="flex flex-col">
            <span className={labelTextClass}>Apellido</span>
            <input
              type="text"
              className={inputClass}
              placeholder="Sanchez Gavilan"
              {...register('lastnames')}
            />
            <ErrorMessage errors={errors} fieldName="lastnames" />
          </label>

          <label className="flex flex-col">
            <span className={labelTextClass}>Numero de teléfono</span>
            <input
              type="tel"
              className={inputClass}
              placeholder="123-45-678"
              {...register('phoneNumber')}
            />
            <ErrorMessage errors={errors} fieldName="phoneNumber" />
          </label>

          <label className="flex flex-col md:col-span-2">
            <span className={labelTextClass}>Genero</span>
            <select
              defaultValue=""
              className={inputClass}
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
        <h4 className={formSectionTitleClass}>Cuenta y Asignación</h4>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col">
            <span className={labelTextClass}>Email</span>
            <input
              type="email"
              className={inputClass}
              placeholder="john.doe@company.com"
              {...register('email')}
            />
            <ErrorMessage errors={errors} fieldName="email" />
          </label>

          <label className="flex flex-col">
            <span className={labelTextClass}>Rol</span>
            <select
              defaultValue=""
              className={inputClass}
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

      <div className={formFooterClass}>
        <button
          type="button"
          className={outlineButtonClass}
          onClick={() => {
            const modal = document.getElementById(
              'update_user'
            ) as HTMLDialogElement;
            if (modal) modal.close();
          }}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className={`${primaryButtonClass} min-w-40`}
          disabled={pending}
        >
          {pending ? (
            <span className="loading loading-spinner loading-sm text-white" />
          ) : (
            'Actualizar Usuario'
          )}
        </button>
      </div>
    </form>
  );
}

export default FormUpdate;
