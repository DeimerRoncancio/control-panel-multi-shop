import { useState } from 'react';
import Cookies from 'js-cookie';
import { useQueryClient } from '@tanstack/react-query';
import axiosDeleteBearer from '../../../requests/protectedRoutes/delete';
import { errorAlertUsers } from '../../../alerts/users/error';
import successAlertUsers from '../../../alerts/users/succes';
import { dangerButtonClass, outlineButtonClass } from '../../../ui/styles';

type Props = {
  id: string;
  isAdmin: boolean;
};

export function FormDeleteUsers({ id, isAdmin }: Props) {
  const queryClient = useQueryClient();
  const modal = document.getElementById(
    'delete_user'
  ) as HTMLDialogElement | null;
  const [loading, setLoading] = useState(false);

  const handleDelete = () => {
    const token = Cookies.get('accessToken');
    setLoading(true);
    axiosDeleteBearer({
      url: `/app/users/${id}`,
      token: token || '',
    })
      .then(() => {
        successAlertUsers('Usuario eliminado con éxito');
        queryClient.invalidateQueries({
          queryKey: [`${isAdmin ? 'admins' : 'users'}`],
        });
        modal?.close();
      })
      .catch(() => errorAlertUsers('Error al eliminar usuario'))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <p className="mb-4 text-sm text-ink-soft">
        ¿Seguro que quieres eliminar este{' '}
        {isAdmin ? 'administrador' : 'usuario'}? Perderá el acceso a su cuenta.
      </p>
      <div className="flex justify-end gap-2.5 border-t border-line pt-4">
        <form method="dialog">
          <button type="submit" className={outlineButtonClass}>
            Cancelar
          </button>
        </form>
        <button
          disabled={loading}
          type="button"
          className={`${dangerButtonClass} min-w-32`}
          onClick={handleDelete}
        >
          {loading ? (
            <span className="loading loading-spinner loading-sm text-white" />
          ) : (
            'Sí, eliminar'
          )}
        </button>
      </div>
    </>
  );
}
