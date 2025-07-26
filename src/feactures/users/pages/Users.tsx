import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';
import axiosGetBearer from '../../../shared/requests/protectedRoutes/get';
import ModalUsersUpdate from '../../../shared/components/users/updatesUsers/Modal-user-update';
import DetailsUser from '../../../shared/components/users/Details-user';
import { ButtonModal } from '../../../shared/components/globalComponents/ButtonModal';
import ModalUserCreate from '../../../shared/components/users/register/Modal-user-create';
import DeleteUsers from '../../../shared/components/Delete-users';
import SearchUsers from '../../../shared/components/users/Search-users';
import {
  Content,
  GetUserRequest,
} from '../../../shared/interfaces/get-users-request';
import UpdateUsers from '../../../shared/components/users/updatesUsers/Update-users';
import { ListUsers } from '../../../shared/components/users/List-users';
import Pagination from '../../../shared/components/globalComponents/Pagination';

function Users() {
  const [userUpdate, setUserUpdate] = useState<Content | null>(null);
  const [pagination, setPagination] = useState({ page: 0, size: 10 });
  const { data, isLoading } = useQuery<GetUserRequest>({
    queryKey: ['users', pagination],
    queryFn: async () => {
      const token = Cookies.get('accessToken');
      return axiosGetBearer({
        url: `/app/users/by-role?isAdmin=false&size=${pagination.size}&page=${pagination.page}`,
        token: token || '',
      });
    },
  });

  return (
    <>
      <ModalUserCreate isAdmin={false} />
      <ModalUsersUpdate isAdmin={false}>
        <UpdateUsers
          idUser={userUpdate?.id!}
          isAdmin={false}
          user={userUpdate}
        />
      </ModalUsersUpdate>
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
        <ListUsers
          isAdmin={false}
          users={data?.content || []}
          isLoading={isLoading}
          setUserUpdate={setUserUpdate}
        />
        <Pagination
          pagination={pagination}
          setPagination={setPagination}
          data={data}
        />
      </div>
    </>
  );
}

export default Users;
