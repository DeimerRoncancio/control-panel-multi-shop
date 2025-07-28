/* eslint-disable jsx-a11y/label-has-associated-control */
import { useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { GrFormView, GrFormViewHide } from 'react-icons/gr';
import { zodResolver } from '@hookform/resolvers/zod';

import { addRegisterType } from '../../../helpers/users/register.helper';
import ErrorMessage from '../../globalComponents/MessajeError';
import { createHandleChange } from '../../../helpers/images';
import RegisterSchema, {
  RegisterTypeAccess,
} from '../../../zod/users/register.zod';

function FormRegister({
  pending,
  functionUpdate,
}: {
  pending: boolean;
  functionUpdate: (formData: FormData) => void;
}) {
  const file = useRef<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [viewPassword, setViewPassword] = useState(false);
  const [viewConfirmPassword, setViewConfirmPassword] = useState(false);
  const [errorFile, setErrorFile] = useState<boolean>(false);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterTypeAccess>({ resolver: zodResolver(RegisterSchema) });

  const onSubimit: SubmitHandler<RegisterTypeAccess> = (data) => {
    if (file.current === null) {
      setErrorFile(true);
    } else {
      setErrorFile(false);
    }

    const formData = new FormData();

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { confirm_password, ...formValues } = data;
    Object.entries(formValues).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });
    if (file.current) {
      formData.append('profileImage', file.current);
    }
    functionUpdate(formData);

    addRegisterType.forEach((field) => {
      setValue(field, '');
    });
    setPreviewImage('');
    file.current = null;
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
              type="text"
              id="secondName"
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
              type="text"
              id="company"
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
              type="tel"
              id="phoneNumber"
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
            type="email"
            id="email"
            className="w-full p-2.5 input input-primary"
            placeholder="john.doe@company.com"
            {...register('email')}
          />
        </label>
        <ErrorMessage errors={errors} fieldName="email" />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="flex flex-col">
          <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Contraseña
          </span>
          <span className="w-full p-2.5 input input-primary flex">
            <input
              type={viewPassword ? 'text' : 'password'}
              id="password"
              className="w-[90%] p-2.5"
              placeholder="•••••••••"
              {...register('password')}
            />
            <button
              className="w-[10%] z-10 flex items-center justify-end"
              type="button"
              onClick={() => setViewPassword(!viewPassword)}
            >
              {viewPassword ? (
                <GrFormViewHide size={30} />
              ) : (
                <GrFormView size={30} />
              )}
            </button>
          </span>
        </label>
        <ErrorMessage errors={errors} fieldName="password" />
      </div>
      <div className="mb-6">
        <label htmlFor="confirm_password" className="flex flex-col">
          <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Confirmar contraseña
          </span>
          <span className="w-full p-2.5 input input-primary flex">
            <input
              type={viewConfirmPassword ? 'text' : 'password'}
              id="confirm_password"
              className="w-[90%] p-2.5"
              placeholder="•••••••••"
              {...register('confirm_password')}
            />
            <button
              className="w-[10%] z-10 flex items-center justify-end"
              type="button"
              onClick={() => setViewConfirmPassword(!viewConfirmPassword)}
            >
              {viewConfirmPassword ? (
                <GrFormViewHide size={30} />
              ) : (
                <GrFormView size={30} />
              )}
            </button>
          </span>
        </label>
        <ErrorMessage errors={errors} fieldName="confirm_password" />
      </div>
      <div className="mb-6">
        <label className="bg-primary rounded-[5px] px-[7px] py-[13px] w-full flex justify-center items-center text-white font-medium text-md md:w-full">
          Agregar Imagenes
          <input
            hidden
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => createHandleChange(e, setPreviewImage, file)}
          />
        </label>
        {errorFile ? (
          <span style={{ color: 'red' }}>La imagen es requerida</span>
        ) : null}
        {previewImage && (
          <div className="w-full flex justify-center items-center mt-4">
            <img
              className="w-[100px] h-[100px] object-cover rounded-3xl"
              src={previewImage}
              alt=""
            />
          </div>
        )}
      </div>

      <button
        type="submit"
        className="text-white text-sm w-[300px] sm:w-auto px-5 py-2.5 btn btn-primary"
      >
        {pending ? (
          <span className="loading loading-spinner loading-sm" />
        ) : (
          'Crear'
        )}
      </button>
    </form>
  );
}

export default FormRegister;
