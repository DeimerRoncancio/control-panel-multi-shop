import { useState } from 'react';
import Cookies from 'js-cookie';
import { useQueryClient } from '@tanstack/react-query';
import axiosDeleteBearer from '../../../requests/protectedRoutes/delete';
import { errorAlertUsers } from '../../../alerts/users/error';
import successAlertUsers from '../../../alerts/users/succes';

type Props = {
  id: string;
  isAdmin: boolean;
}

export function FormDeleteUsers({ id, isAdmin }: Props) {
  const queryClient = useQueryClient();
  const modal = document.getElementById('delete_user') as HTMLDialogElement | null;
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
        queryClient.invalidateQueries({ queryKey: [`${isAdmin ? 'admins' : 'users'}`] });
        modal?.close();
      })
      .catch(() => errorAlertUsers('Error al eliminar usuario'))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <p className="py-4">
        ¿Estás seguro de que deseas eliminar este{' '}
        {isAdmin ? 'administrador' : 'usuario'}?
      </p>
      <div className="modal-action">
        <form method="dialog">
          <button type="submit" className="btn btn-success">
            Cancelar
          </button>
        </form>
        <button
          disabled={loading}
          type="button"
          className="btn btn-error w-[100px]"
          onClick={handleDelete}
        >
          {loading ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            'Eliminar'
          )}
        </button>
      </div>
    </>
  );
}
