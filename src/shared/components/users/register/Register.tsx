import { useMutation, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import envs from '../../../../configs/envs';
import axiosPostBearer from '../../../requests/protectedRoutes/post';
import FormRegister from './FormRegister';
import successAlert from '../../../alerts/users/succes';
import { errorAlertUsers } from '../../../alerts/users/error';

function Register({ isAdmin }: { isAdmin: boolean }) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: axiosPostBearer,
    onSuccess: (data: any) => {
      if (data.error) {
        errorAlertUsers('Error al crear usuario');
      } else {
        successAlert('Usuario creado con éxito');

        queryClient.invalidateQueries({
          queryKey: [`${isAdmin ? 'admins' : 'users'}`],
        });
      }
    },
  });

  const handleFormDataChange = (newFormData: FormData) => {
    const token = Cookies.get('accessToken');

    if (newFormData.has('name')) {
      newFormData.append('admin', isAdmin ? 'true' : 'false');
      mutate({
        url: `${envs.API}/app/users`,
        data: newFormData,
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
