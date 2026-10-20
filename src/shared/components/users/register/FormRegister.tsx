import { useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { GrFormView, GrFormViewHide } from 'react-icons/gr';
import { zodResolver } from '@hookform/resolvers/zod';
import ErrorMessage from '../../globalComponents/MessajeError';
import RegisterSchema, {
  RegisterTypeAccess,
} from '../../../zod/users/register.zod';
import {
  inputClass,
  labelTextClass,
  formSectionTitleClass,
  formFooterClass,
  outlineButtonClass,
  primaryButtonClass,
} from '../../../ui/styles';

const MAX_IMAGE_SIZE = 1024 * 1024;

type Props = {
  pending: boolean;
  functionUpdate: (data: RegisterTypeAccess, profileImage: File) => void;
};

function FormRegister({ pending, functionUpdate }: Props) {
  const [viewPassword, setViewPassword] = useState(false);
  const [viewConfirmPassword, setViewConfirmPassword] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const profileImage = useRef<File | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterTypeAccess>({ resolver: zodResolver(RegisterSchema) });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    profileImage.current = file;
    setPreviewImage(file ? URL.createObjectURL(file) : null);

    if (file && file.size > MAX_IMAGE_SIZE) {
      setImageError('La imagen debe pesar menos de 1 MB');
      return;
    }

    setImageError(null);
  };

  const onSubimit: SubmitHandler<RegisterTypeAccess> = (data) => {
    const file = profileImage.current;

    if (!file) return setImageError('La foto de perfil es requerida');
    if (imageError) return;

    functionUpdate(data, file);
  };

  return (
    <form onSubmit={handleSubmit(onSubimit)} className="space-y-4">
      <div>
        <h4 className={formSectionTitleClass}>Datos Personales</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex flex-col">
            <span className={labelTextClass}>Nombre</span>
            <input
              type="text"
              className={inputClass}
              placeholder="Ej. John"
              {...register('name')}
            />
            <ErrorMessage errors={errors} fieldName="name" />
          </label>

          <label className="flex flex-col">
            <span className={labelTextClass}>Segundo Nombre</span>
            <input
              type="text"
              className={inputClass}
              placeholder="Ej. Doe"
              {...register('secondName')}
            />
            <ErrorMessage errors={errors} fieldName="secondName" />
          </label>

          <label className="flex flex-col">
            <span className={labelTextClass}>Apellidos</span>
            <input
              type="text"
              className={inputClass}
              placeholder="Ej. Smith"
              {...register('lastnames')}
            />
            <ErrorMessage errors={errors} fieldName="lastnames" />
          </label>

          <label className="flex flex-col">
            <span className={labelTextClass}>Teléfono</span>
            <input
              type="tel"
              className={inputClass}
              placeholder="+57 300 000 0000"
              {...register('phoneNumber')}
            />
            <ErrorMessage errors={errors} fieldName="phoneNumber" />
          </label>

          <label className="flex flex-col md:col-span-2">
            <span className={labelTextClass}>Género</span>
            <select
              className={inputClass}
              defaultValue=""
              {...register('gender')}
            >
              <option value="" disabled>
                Selecciona Género
              </option>
              <option value="male">Hombre</option>
              <option value="female">Mujer</option>
            </select>
            <ErrorMessage errors={errors} fieldName="gender" />
          </label>
        </div>
      </div>

      {/* Sección 2: Cuenta */}
      <div className="pt-4">
        <h4 className={formSectionTitleClass}>Cuenta y Seguridad</h4>
        <div className="grid grid-cols-1 gap-4">
          <label className="flex flex-col">
            <span className={labelTextClass}>Correo Electrónico</span>
            <input
              type="email"
              className={inputClass}
              placeholder="usuario@ejemplo.com"
              {...register('email')}
            />
            <ErrorMessage errors={errors} fieldName="email" />
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex flex-col relative">
              <span className={labelTextClass}>Contraseña</span>
              <div className="relative">
                <input
                  type={viewPassword ? 'text' : 'password'}
                  className={`${inputClass} pr-11`}
                  placeholder="••••••••"
                  {...register('password')}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-ink-muted transition-colors hover:text-brand"
                  onClick={() => setViewPassword(!viewPassword)}
                >
                  {viewPassword ? (
                    <GrFormViewHide size={18} />
                  ) : (
                    <GrFormView size={18} />
                  )}
                </button>
              </div>
              <ErrorMessage errors={errors} fieldName="password" />
            </label>

            <label className="flex flex-col relative">
              <span className={labelTextClass}>Confirmar Contraseña</span>
              <div className="relative">
                <input
                  type={viewConfirmPassword ? 'text' : 'password'}
                  className={`${inputClass} pr-11`}
                  placeholder="••••••••"
                  {...register('confirm_password')}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-ink-muted transition-colors hover:text-brand"
                  onClick={() => setViewConfirmPassword(!viewConfirmPassword)}
                >
                  {viewConfirmPassword ? (
                    <GrFormViewHide size={18} />
                  ) : (
                    <GrFormView size={18} />
                  )}
                </button>
              </div>
              <ErrorMessage errors={errors} fieldName="confirm_password" />
            </label>
          </div>
        </div>
      </div>

      <div className="pt-4">
        <h4 className={formSectionTitleClass}>Foto de Perfil</h4>
        <div className="flex items-center gap-4">
          <label className={`${outlineButtonClass} h-9 cursor-pointer px-4`}>
            Seleccionar imagen
            <input
              hidden
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
          {previewImage && (
            <img
              src={previewImage}
              alt="Vista previa"
              className="h-14 w-14 rounded-full object-cover"
            />
          )}
        </div>
        {imageError && <p className="mt-2 text-sm text-error">{imageError}</p>}
      </div>

      <div className={formFooterClass}>
        <button
          type="button"
          className={outlineButtonClass}
          onClick={() => {
            reset();
            profileImage.current = null;
            setPreviewImage(null);
            setImageError(null);
            const modal = document.getElementById(
              'create_user'
            ) as HTMLDialogElement;
            if (modal) modal.close();
          }}
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={pending}
          className={`${primaryButtonClass} min-w-40`}
        >
          {pending ? (
            <span className="loading loading-spinner loading-sm text-white" />
          ) : (
            'Registrar Usuario'
          )}
        </button>
      </div>
    </form>
  );
}

export default FormRegister;
