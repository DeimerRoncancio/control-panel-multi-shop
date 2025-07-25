import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';
import { errorAlertCreate } from '../../../alerts/users/error';
import successAlertCreate from '../../../alerts/users/succes';
import envs from '../../../../configs/envs';
import axiosPostBearer from '../../../requests/protectedRoutes/post';
import FormRegister from './FormRegister';

function Register({ isAdmin }: { isAdmin: boolean }) {
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

    if (formData.has('name')) {
      formData.append('admin', isAdmin ? 'true' : 'false');
      mutate({
        url: `${envs.API}/app/users`,
        data: formData,
        token: token || '',
      });
    }
  }, [formData, mutate, isAdmin]);

  return (
    <main className="flex flex-col items-center justify-center my-6">
      <div className="w-[70%] h-[600%]">
        <FormRegister setFormData={setFormData} pending={isPending} />
      </div>
    </main>
  );
}

export default Register;
