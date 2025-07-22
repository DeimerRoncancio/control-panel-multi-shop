import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { ListUsers } from '../components/List-users';
import axiosGetBearer from '../../../shared/requests/protectedRoutes/get';
import ModalUserCreate from '../components/Modal-user-create';
import ModalUserUpdate from '../components/Modal-user-update';
import DetailsUser from '../components/Details-user';

function Users() {
  const { data } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const token = Cookies.get('accessToken');
      return axiosGetBearer({ url: '/app/users', token: token || '' });
    },
  });

  return (
    <>
      <ModalUserCreate />
      <ModalUserUpdate />
      <div className="p-6 text-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold">Gestion de Usuarios</h1>
        <p className="mt-2 text-sm text-gray-400 mb-4">
          Administra los usuarios de la aplicacion.
        </p>
        <DetailsUser />
        <div className="divider" />
        <ListUsers users={data?.content || []} />
      </div>
    </>
  );
}

export default Users;
