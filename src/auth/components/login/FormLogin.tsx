import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import AccesLoginSchema, { LoginTypeAccess } from '../../zod/login.zod';
import { LoginType } from '../../types';
import ErrorMessage from '../../../shared/components/MessajeError';
import axiosPost from '../../../shared/requests/basicRequests/post';
import envs from '../../../configs/envs';
import { errorAlert } from '../../../shared/alerts';

function FormLogin() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginTypeAccess>({ resolver: zodResolver(AccesLoginSchema) });

  const { mutate, isPending } = useMutation({
    mutationFn: axiosPost,
    onSuccess: (data: any) => {
      if (data.error) errorAlert();
    },
  });

  const onSubimit: SubmitHandler<LoginType> = (data: LoginType) => {
    mutate({
      url: `${envs.API}/login`,
      data,
    });

    setValue('identifier', '');
    setValue('password', '');
  };

  return (
    <div className="hero bg-base-200 min-h-[90vh]">
      <ToastContainer />
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Ecommerce Multi Shop</h1>
          <p className="py-6">
            ¡Bienvenido al panel administrativo de nuestra plataforma de
            ecommerce multi tienda! Por favor, inicia sesión para acceder a tu
            cuenta y comenzar a gestionar tus tiendas.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubimit)} className="fieldset">
              <label className="flex flex-col" htmlFor="email">
                <span className="label">Email</span>
                <input
                  type="email"
                  className="input"
                  placeholder="Email"
                  id="email"
                  aria-labelledby="email-label"
                  {...register('identifier')}
                />
              </label>
              <ErrorMessage errors={errors} fieldName="identifier" />

              <label className="flex flex-col" htmlFor="password">
                <span className="label">Contraseña</span>
                <input
                  type="password"
                  className="input"
                  placeholder="Contraseña"
                  id="password"
                  {...register('password')}
                />
              </label>
              <ErrorMessage errors={errors} fieldName="password" />
              <div>
                <Link to="/register" className="link link-hover">
                  Olvidaste tu contraseña?
                </Link>
              </div>
              <button type="submit" className="btn btn-neutral mt-4">
                {isPending ? (
                  <span className="loading loading-spinner loading-sm" />
                ) : (
                  'Iniciar Sesión'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormLogin;
