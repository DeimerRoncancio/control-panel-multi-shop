import Cookies from 'js-cookie';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import envs from '../../../../configs/envs';
import { Content } from '../../../interfaces/get-users-request';
import FormUpdate from './Form-updtate';
import axiosPutBearer from '../../../requests/protectedRoutes/put';
import UserUpdate from '../../../interfaces/user-update';
import { errorAlertUsers } from '../../../alerts/users/error';
import successAlertUsers from '../../../alerts/users/succes';

function UpdateUsers({
  isAdmin,
  idUser,
  user,
}: {
  isAdmin: boolean;
  idUser: string;
  user: Content | null;
}) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: axiosPutBearer,
    onSuccess: (data: any) => {
      if (data.error) {
        errorAlertUsers('Error al actualizar usuario');
      } else {
        successAlertUsers('Usuario actualizado con éxito');
        queryClient.invalidateQueries({
          queryKey: [`${isAdmin ? 'admins' : 'users'}`],
        });
      }
    },
  });

  const handleUpdateUser = (userUpdates: UserUpdate) => {
    const token = Cookies.get('accessToken');

    mutate({
      url: `${envs.API}/app/users/${idUser}`,
      data: {
        ...userUpdates,
        admin: isAdmin ? 'true' : 'false',
      },
      token: token || '',
    });
  };

  return (
    <main className="flex flex-col items-center justify-center my-6">
      <div className="w-[70%] h-[600%]">
        <FormUpdate
          pending={isPending}
          user={user}
          functionUpdate={handleUpdateUser}
        />
      </div>
    </main>
  );
}

export default UpdateUsers;
