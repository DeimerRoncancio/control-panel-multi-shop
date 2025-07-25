/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import RegisterSchema, {
  RegisterTypeAccess,
} from '../../../../auth/zod/register.zod';
import { addRegisterType } from '../../../../auth/helpers/register.helper';
import ErrorMessage from '../../globalComponents/MessajeError';
import { createHandleChange } from '../../../helpers/images';
import { Content } from '../../../interfaces/get-users-request';
import { setValuesUpdate } from '../../../helpers/set-values-update';

function FormUpdate({
  setFormData,
  pending,
  user,
}: {
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  pending: boolean;
  user: Content | null;
}) {
  const file = useRef<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>('');

  const [errorFile, setErrorFile] = useState<boolean>(false);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterTypeAccess>({
    resolver: zodResolver(RegisterSchema),
  });

  useEffect(() => {
    if (user) {
      setValuesUpdate.forEach((value) => {
        const fieldValue = user[value];
        setValue(value, fieldValue === null ? '' : fieldValue.toString());
      });
    }
  }, [user, setValue]);

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
    setFormData(formData);

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
              type="text"
              id="name"
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
          'Actualizar'
        )}
      </button>
    </form>
  );
}

export default FormUpdate;
