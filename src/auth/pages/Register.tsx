import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import FormRegister from '../components/register/FormRegister';
import axiosPost from '../../shared/requests/basicRequests/post';
import envs from '../../configs/envs';

function Register() {
  const [formData, setFormData] = useState(new FormData());

  const { mutate, isPending } = useMutation({
    mutationFn: axiosPost,
    onSuccess: (data: any) => {
      console.log(data);
    },
  });

  useEffect(() => {
    if (formData.has('name')) {
      mutate({
        url: `${envs.API}/app/users`,
        data: formData,
      });
    }
  }, [formData, mutate]);

  return (
    <main className="flex flex-col items-center justify-center h-auto w-full my-6">
      <h2 className="text-3xl mb-12 mt-3">
        Registro de Usuario Administrativo
      </h2>
      <div className="w-[70%] h-[600%]">
        <FormRegister setFormData={setFormData} pending={isPending} />
      </div>
    </main>
  );
}

export default Register;
