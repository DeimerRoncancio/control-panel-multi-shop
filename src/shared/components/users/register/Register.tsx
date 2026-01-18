import { useMutation, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { axiosPostBearer } from '../../../requests/protectedRoutes/post';
import FormRegister from './FormRegister';
import successAlert from '../../../alerts/users/succes';
import { errorAlertUsers } from '../../../alerts/users/error';
import { AxiosError } from 'axios';
import { RegisterTypeAccess } from '../../../zod/users/register.zod';

function Register({ isAdmin }: { isAdmin: boolean }) {
  const modal = document.getElementById('create_user') as HTMLDialogElement;
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: axiosPostBearer,
    onSuccess: () => {
      successAlert('Usuario creado con éxito');
      queryClient.invalidateQueries({ queryKey: [`${isAdmin ? 'admins' : 'users'}`] });
      modal.close();
    },
    onError: (error: AxiosError) => errorAlertUsers(error.message),
  });

  const handleFormDataChange = (data: RegisterTypeAccess) => {
    const token = Cookies.get('accessToken');

    if (data.name) {
      mutate({
        url: '/app/users',
        data: { ...data, admin: isAdmin },
        token: token || '',
      });
    }
  };

  return (
    <main className="flex flex-col items-center justify-center my-6">
      <div className="w-[70%] h-[600%]">
        <FormRegister
          functionUpdate={handleFormDataChange}
          pending={isPending}
        />
      </div>
    </main>
  );
}

export default Register;
