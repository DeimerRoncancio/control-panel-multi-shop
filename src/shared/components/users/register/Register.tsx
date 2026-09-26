import { useMutation, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import axiosPostFormDataBearer from '../../../requests/protectedRoutes/post';
import FormRegister from './FormRegister';
import successAlert from '../../../alerts/users/succes';
import { errorAlertUsers } from '../../../alerts/users/error';
import { RegisterTypeAccess } from '../../../zod/users/register.zod';

const buildFormData = (
  data: RegisterTypeAccess,
  profileImage: File,
  isAdmin: boolean
) => {
  const formData = new FormData();

  formData.append('name', data.name);
  formData.append('lastnames', data.lastnames);
  formData.append('phoneNumber', data.phoneNumber.replace(/\D/g, ''));
  formData.append('gender', data.gender);
  formData.append('email', data.email);
  formData.append('password', data.password);
  formData.append('admin', String(isAdmin));
  formData.append('profileImage', profileImage);

  if (data.secondName) formData.append('secondName', data.secondName);

  return formData;
};

const firstErrorMessage = (body: unknown) => {
  if (body && typeof body === 'object') {
    const messages = Object.values(body as Record<string, string>);
    if (messages.length > 0) return messages[0];
  }

  return 'Error al crear el usuario';
};

function Register({ isAdmin }: { isAdmin: boolean }) {
  const modal = document.getElementById('create_user') as HTMLDialogElement;
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: axiosPostFormDataBearer,
    onSuccess: (response) => {
      if (response?.status !== 201)
        return errorAlertUsers(firstErrorMessage(response?.data));

      successAlert('Usuario creado con éxito');
      queryClient.invalidateQueries({ queryKey: [`${isAdmin ? 'admins' : 'users'}`] });
      queryClient.invalidateQueries({ queryKey: ['latest-users'] });
      modal.close();
    },
    onError: () => errorAlertUsers('Error al crear el usuario'),
  });

  const handleFormDataChange = (data: RegisterTypeAccess, profileImage: File) => {
    const token = Cookies.get('accessToken');

    mutate({
      url: '/app/users',
      data: buildFormData(data, profileImage, isAdmin),
      token: token || '',
    });
  };

  return (
    <div>
      <FormRegister
        functionUpdate={handleFormDataChange}
        pending={isPending}
      />
    </div>
  );
}

export default Register;
