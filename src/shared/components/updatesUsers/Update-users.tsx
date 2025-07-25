import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';
import { useMutation } from '@tanstack/react-query';
import axiosPostBearer from '../../requests/protectedRoutes/post';
import { errorAlertCreate } from '../../alerts/users/error';
import successAlertCreate from '../../alerts/users/succes';
import envs from '../../../configs/envs';
import FormUpdate from './Form-updtae';
import { Content } from '../../interfaces/get-users-request';

function UpdateUsers({
  isAdmin,
  idUser,
  user,
}: {
  isAdmin: boolean;
  idUser: string;
  user: Content | null;
}) {
  const [formData, setFormData] = useState(new FormData());
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: axiosPostBearer,
    onSuccess: (data: any) => {
      if (data.error) {
        errorAlertCreate();
      } else {
        successAlertCreate();

        setTimeout(() => {
          navigate(0);
        }, 5000);
      }
    },
  });

  useEffect(() => {
    const token = Cookies.get('accessToken');

    if (formData.has('name') && idUser) {
      formData.append('admin', isAdmin ? 'true' : 'false');
      mutate({
        url: `${envs.API}/app/users/${idUser}`,
        data: formData,
        token: token || '',
      });
    }
  }, [formData, mutate, isAdmin, idUser]);

  return (
    <main className="flex flex-col items-center justify-center my-6">
      <div className="w-[70%] h-[600%]">
        <FormUpdate setFormData={setFormData} pending={isPending} user={user} />
      </div>
    </main>
  );
}

export default UpdateUsers;
