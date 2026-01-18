import { useRef, useState } from 'react';
import Cookies from 'js-cookie';
import { useQueryClient } from '@tanstack/react-query';
import { createHandleChange } from '../../../helpers/images';
import { Content } from '../../../interfaces/get-users-request';
import envs from '../../../../configs/envs';
import successAlertUsers from '../../../alerts/users/succes';
import { errorAlertUsers } from '../../../alerts/users/error';
import axiosPutFormDataBearer from '../../../requests/protectedRoutes/put';

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
      url: `${envs.API}/app/users/update/profile-image/${user?.id}`,
      token: Cookies.get('accessToken') || '',
    })
      .then(() => {
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
      className="h-full w-full flex flex-col justify-center items-center gap-4"
      onSubmit={handleSubmit}
    >
      <div className="w-full flex justify-center items-center mt-4">
        <img
          className="w-[250px] h-[250px] object-cover rounded-3xl"
          src={previewImage || user?.imageUser?.imageUrl}
          alt=""
        />
      </div>

      <label
        htmlFor="id"
        className="bg-primary rounded-[5px] px-[7px] py-[13px] w-full flex justify-center items-center text-white font-medium text-md md:w-[70%]"
      >
        Agregar Imagenes
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
        className="w-[70%] flex justify-center items-center btn btn-secondary"
      >
        {loading ? (
          <span className="loading loading-spinner loading-sm" />
        ) : (
          'Actualizar Avatar'
        )}
      </button>
    </form>
  );
}
