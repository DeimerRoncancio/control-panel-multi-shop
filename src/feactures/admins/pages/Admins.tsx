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
import { Content } from '../../../shared/interfaces/get-users-request';
import UpdateUsers from '../../../shared/components/users/updatesUsers/Update-users';
import Pagination from '../../../shared/components/globalComponents/Pagination';
import { ListUsers } from '../../../shared/components/users/List-users';
import ModalUsersAvatar from '../../../shared/components/users/updatesAvatarUsers/Update-avatar';
import FormUpdateAvatar from '../../../shared/components/users/updatesAvatarUsers/Form-update-avatar';
import { FormDeleteUsers } from '../../../shared/components/users/deleteUsers/Form-delete-users';
import usePagination from '../../../shared/hooks/usePagination';
import PageHeader from '../../../shared/ui/PageHeader';
import { pageClass, primaryButtonClass } from '../../../shared/ui/styles';

function Admins() {
  const [userUpdate, setUserUpdate] = useState<Content | null>(null);
  const { pagination, setSearchParams } = usePagination();

  const { data, isLoading } = useQuery({
    queryKey: ['admins', pagination],
    queryFn: async () => {
      const token = Cookies.get('accessToken');
      return axiosGetBearer({
        url: '/app/users/by-role',
        params: { ...pagination, isAdmin: true },
        token: token || '',
      });
    },
  });

  return (
    <>
      <ModalUsersAvatar isAdmin>
        <FormUpdateAvatar isAdmin user={userUpdate} />
      </ModalUsersAvatar>
      <ModalUserCreate isAdmin />
      <ModalUsersUpdate isAdmin>
        <UpdateUsers idUser={userUpdate?.id!} isAdmin user={userUpdate} />
      </ModalUsersUpdate>
      <DeleteUsers isAdmin>
        <FormDeleteUsers id={userUpdate?.id!} isAdmin />
      </DeleteUsers>
      <ToastContainer />
      <div className={pageClass}>
        <PageHeader
          eyebrow="Personas"
          title="Administradores"
          description="Personas con acceso a este panel."
          actions={
            <ButtonModal idModal="create_user" className={primaryButtonClass}>
              <FiPlus size={16} />
              Crear administrador
            </ButtonModal>
          }
        />
        <DetailsUser isAdmin />
        <SearchUsers setSearchUsers={() => {}} />
        <ListUsers
          isAdmin
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

export default Admins;
