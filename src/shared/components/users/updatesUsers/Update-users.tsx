import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useMutation } from '@tanstack/react-query';
import { errorAlertCreate } from '../../../alerts/users/error';
import successAlertCreate from '../../../alerts/users/succes';
import envs from '../../../../configs/envs';
import { Content } from '../../../interfaces/get-users-request';
import FormUpdate from './Form-updtate';
import axiosPutBearer from '../../../requests/protectedRoutes/put';

function UpdateUsers({
  isAdmin,
  idUser,
  user,
}: {
  isAdmin: boolean;
  idUser: string;
  user: Content | null;
}) {
  const [updateUser, setUpdateUser] = useState({});

  const { mutate, isPending } = useMutation({
    mutationFn: axiosPutBearer,
    onSuccess: (data: any) => {
      if (data.error) {
        errorAlertCreate();
      } else {
        successAlertCreate();
      }
    },
  });

  useEffect(() => {
    const token = Cookies.get('accessToken');
    if (Object.keys(updateUser).length === 0) return;

    mutate({
      url: `${envs.API}/app/users/${idUser}`,
      data: {
        ...updateUser,
        admin: isAdmin ? 'true' : 'false',
      },
      token: token || '',
    });
  }, [updateUser, mutate, isAdmin, idUser]);

  return (
    <main className="flex flex-col items-center justify-center my-6">
      <div className="w-[70%] h-[600%]">
        <FormUpdate
          setUpdateUser={setUpdateUser}
          pending={isPending}
          user={user}
        />
      </div>
    </main>
  );
}

export default UpdateUsers;
