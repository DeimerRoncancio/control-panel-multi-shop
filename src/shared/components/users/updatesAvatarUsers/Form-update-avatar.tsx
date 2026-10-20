import { useRef, useState } from 'react';
import Cookies from 'js-cookie';
import { useQueryClient } from '@tanstack/react-query';
import { createHandleChange } from '../../../helpers/images';
import { Content } from '../../../interfaces/get-users-request';
import successAlertUsers from '../../../alerts/users/succes';
import { errorAlertUsers } from '../../../alerts/users/error';
import axiosPutFormDataBearer from '../../../requests/protectedRoutes/put';
import { FiImage, FiUploadCloud } from 'react-icons/fi';
import { outlineButtonClass, primaryButtonClass } from '../../../ui/styles';

export default function FormUpdateAvatar({
  user,
  isAdmin,
}: {
  user: Content | null;
  isAdmin: boolean;
}) {
  const file = useRef<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file.current) {
      errorAlertUsers('Por favor, selecciona un archivo de imagen.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file.current!);
    setLoading(true);

    axiosPutFormDataBearer({
      data: formData,
      url: `/app/users/update/profile-image/${user?.id}`,
      token: Cookies.get('accessToken') || '',
    })
      .then((response) => {
        if (response?.status !== 200 && response?.status !== 201)
          return errorAlertUsers('Error al actualizar el avatar');

        successAlertUsers('Avatar actualizado con éxito');
        queryClient.invalidateQueries({
          queryKey: [`${isAdmin ? 'admins' : 'users'}`],
        });
      })
      .catch(() => errorAlertUsers('Error al actualizar el avatar'))
      .finally(() => setLoading(false));
  };

  return (
    <form
      className="flex w-full flex-col items-center gap-4"
      onSubmit={handleSubmit}
    >
      <div className="grid h-56 w-56 place-items-center overflow-hidden rounded-full bg-brand-soft ring-4 ring-brand ring-offset-4">
        {previewImage || user?.imageUser?.imageUrl ? (
          <img
            className="h-full w-full object-cover"
            src={previewImage || user?.imageUser?.imageUrl}
            alt=""
          />
        ) : (
          <FiImage size={40} className="text-brand" />
        )}
      </div>

      <div className="flex w-full flex-wrap justify-center gap-2.5 border-t border-line pt-4">
        <label htmlFor="id" className={`${outlineButtonClass} cursor-pointer`}>
          <FiUploadCloud size={16} />
          Elegir imagen
          <input
            hidden
            id="id"
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => createHandleChange(e, setPreviewImage, file)}
          />
        </label>
        <button
          disabled={loading}
          type="submit"
          className={`${primaryButtonClass} min-w-40`}
        >
          {loading ? (
            <span className="loading loading-spinner loading-sm text-white" />
          ) : (
            'Guardar foto'
          )}
        </button>
      </div>
    </form>
  );
}
