import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { ToastContainer } from 'react-toastify';
import { FiPlus } from 'react-icons/fi';
import { useState } from 'react';
import axiosGetBearer from '../../../shared/requests/protectedRoutes/get';
import ModalUsersUpdate from '../../../shared/components/users/updatesUsers/Modal-user-update';
import DetailsUser from '../../../shared/components/users/Details-user';
import { ButtonModal } from '../../../shared/components/globalComponents/ButtonModal';
import ModalUserCreate from '../../../shared/components/users/register/Modal-user-create';
import DeleteUsers from '../../../shared/components/users/deleteUsers/Delete-users';
import SearchUsers from '../../../shared/components/users/Search-users';
import {
  Content,
  GetUserRequest,
} from '../../../shared/interfaces/get-users-request';
import UpdateUsers from '../../../shared/components/users/updatesUsers/Update-users';
import { ListUsers } from '../../../shared/components/users/List-users';
import Pagination from '../../../shared/components/globalComponents/Pagination';
import { FormDeleteUsers } from '../../../shared/components/users/deleteUsers/Form-delete-users';
import { SearchProducts } from '../../products/interface/search-products';
import usePagination from '../../../shared/hooks/usePagination';
import PageHeader from '../../../shared/ui/PageHeader';
import { pageClass, primaryButtonClass } from '../../../shared/ui/styles';

function Users() {
  const [userUpdate, setUserUpdate] = useState<Content | null>(null);
  const [searchUsers, setsearchUsers] = useState<SearchProducts | null>(null);
  const { pagination, setSearchParams } = usePagination();

  const { data, isLoading } = useQuery<GetUserRequest>({
    queryKey: ['users', pagination, searchUsers],
    queryFn: async () => {
      const token = Cookies.get('accessToken');

      if (searchUsers) {
        return axiosGetBearer({
          url: '/app/users/search',
          params: {
            ...pagination,
            identifier: searchUsers.identifier,
            isAdmin: false,
            isEnabled: searchUsers.isEnabled,
            field: searchUsers.field,
          },
          token: token || '',
        });
      }

      return axiosGetBearer({
        url: '/app/users/by-role',
        params: { ...pagination, isAdmin: false },
        token: token || '',
      });
    },
  });

  return (
    <>
      <ToastContainer style={{ zIndex: 1000 }} />
      <ModalUserCreate isAdmin={false} />
      <ModalUsersUpdate isAdmin={false}>
        <UpdateUsers
          idUser={userUpdate?.id!}
          isAdmin={false}
          user={userUpdate}
        />
      </ModalUsersUpdate>
      <DeleteUsers isAdmin={false}>
        <FormDeleteUsers id={userUpdate?.id!} isAdmin={false} />
      </DeleteUsers>
      <div className={pageClass}>
        <PageHeader
          eyebrow="Personas"
          title="Usuarios"
          description="Clientes con cuenta en la tienda."
          actions={
            <ButtonModal idModal="create_user" className={primaryButtonClass}>
              <FiPlus size={16} />
              Crear usuario
            </ButtonModal>
          }
        />
        <DetailsUser isAdmin={false} />
        <SearchUsers setSearchUsers={setsearchUsers} />
        <ListUsers
          isAdmin={false}
          users={data?.content || []}
          isLoading={isLoading}
          setUserUpdate={setUserUpdate}
        />
        <Pagination
          page={pagination.page}
          setPagination={setSearchParams}
          data={data}
        />
      </div>
    </>
  );
}

export default Users;
