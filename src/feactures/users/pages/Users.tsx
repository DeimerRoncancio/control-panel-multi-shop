import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { ToastContainer } from 'react-toastify';
import axiosGetBearer from '../../../shared/requests/protectedRoutes/get';
import ModalUsersUpdate from '../../../shared/components/Modal-user-update';
import DetailsUser from '../../../shared/components/Details-user';
import { ListUsers } from '../../../shared/components/List-users';
import { ButtonModal } from '../../../shared/components/ButtonModal';
import ModalUserCreate from '../../../shared/components/Modal-user-create';
import DeleteUsers from '../../../shared/components/Delete-users';
import SearchUsers from '../../../shared/components/Search-users';

function Users() {
  const { data } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const token = Cookies.get('accessToken');
      return axiosGetBearer({
        url: '/app/users/by-role?isAdmin=false&size=5&page=0',
        token: token || '',
      });
    },
  });

  return (
    <>
      <ModalUserCreate isAdmin={false} />
      <ModalUsersUpdate isAdmin={false} />
      <DeleteUsers isAdmin={false} />
      <ToastContainer />
      <div className="p-6 text-white rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">Gestion de Usuarios</h1>
            <p className="mt-2 text-sm text-gray-400 mb-4">
              Administra los usuarios de la aplicacion.
            </p>
          </div>
          <ButtonModal idModal="create_user" className="btn btn-success">
            Crear Usuario
          </ButtonModal>
        </div>
        <DetailsUser isAdmin={false} />
        <SearchUsers />
        <ListUsers isAdmin={false} users={data?.content || []} />
      </div>
    </>
  );
}

export default Users;
