import Cookies from 'js-cookie';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Content } from '../../../interfaces/get-users-request';
import FormUpdate from './Form-updtate';
import { axiosPutBearer } from '../../../requests/protectedRoutes/put';
import UserUpdate from '../../../interfaces/user-update';
import { errorAlertUsers } from '../../../alerts/users/error';
import successAlertUsers from '../../../alerts/users/succes';

type Props = {
  isAdmin: boolean;
  idUser: string;
  user: Content | null;
}

function UpdateUsers({ isAdmin, idUser, user }: Props) {
  const modal = document.getElementById('update_user') as HTMLDialogElement | null;
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: axiosPutBearer,
    onSuccess: (response) => {
      // axiosPutBearer devuelve la respuesta de error en vez de lanzarla, así
      // que el estado hay que revisarlo aquí.
      if (response?.status !== 200 && response?.status !== 201)
        return errorAlertUsers('Error al actualizar usuario');

      successAlertUsers('Usuario actualizado con éxito');
      queryClient.invalidateQueries({ queryKey: [`${isAdmin ? 'admins' : 'users'}`] });
      queryClient.invalidateQueries({ queryKey: ['latest-users'] });
      modal?.close();
    },
    onError: () => errorAlertUsers('Error al actualizar usuario'),
  });

  const handleUpdateUser = (userUpdates: UserUpdate) => {
    const token = Cookies.get('accessToken');

    mutate({
      url: `/app/users/${idUser}`,
      data: {
        ...userUpdates,
        // UserDTO.phoneNumber es Long: se manda solo con dígitos.
        phoneNumber: userUpdates.phoneNumber.replace(/\D/g, ''),
        admin: userUpdates.admin === 'true',
      },
      token: token || '',
    });
  };

  return (
    <main className="flex flex-col items-center justify-center mt-6">
      <div className='w-full h-full'>
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
