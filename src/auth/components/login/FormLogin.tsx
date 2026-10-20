import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';
import {
  FiArrowRight,
  FiCheck,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
} from 'react-icons/fi';
import Cookies from 'js-cookie';
import AccesLoginSchema, { LoginTypeAccess } from '../../zod/login.zod';
import { LoginType } from '../../types';
import ErrorMessage from '../../../shared/components/globalComponents/MessajeError';
import axiosPost from '../../../shared/requests/basicRequests/post';
import { errorAlert } from '../../../shared/alerts';
import { HorasEnMilisegundos } from '../../helpers';
import TextField from '../../../shared/ui/TextField';

const perks = [
  'Productos, fotos y variantes',
  'Categorías con su color',
  'Usuarios y administradores',
];

function FormLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginTypeAccess>({ resolver: zodResolver(AccesLoginSchema) });

  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: axiosPost,
    onSuccess: (data: any) => {
      if (data.error) errorAlert({});
      else {
        Cookies.set('accessToken', data.data.token, {
          expires: HorasEnMilisegundos,
        });
        navigate('/dashboard');
      }
    },
  });

  const onSubimit: SubmitHandler<LoginType> = (data: LoginType) => {
    mutate({
      url: '/login',
      data,
    });

    setValue('identifier', '');
    setValue('password', '');
  };

  return (
    <>
      <ToastContainer />
      <div className="grid min-h-dvh w-full bg-base-100 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="relative flex flex-col gap-8 overflow-hidden border-b border-brand/15 bg-brand-soft/70 px-8 py-10 lg:border-b-0 lg:border-r lg:px-14">
          <div className="relative z-10 flex items-center gap-3">
            <img
              src="/svg/logo.svg"
              alt="Multi Shop"
              className="-ml-3 h-16 w-auto"
            />
            <span className="rounded-full bg-brand px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-[0.12em] text-white">
              Panel
            </span>
          </div>

          <div className="relative z-10 max-w-md lg:mt-auto">
            <h1 className="text-4xl font-extrabold leading-[1.05] text-ink lg:text-5xl">
              Gestiona tu tienda <span className="text-brand">desde aquí</span>
            </h1>
            <p className="mt-3 text-ink-soft">
              Panel de administración de Multi Shop.
            </p>

            <ul className="mt-7 flex flex-col gap-3.5">
              {perks.map((perk) => (
                <li
                  key={perk}
                  className="flex items-center gap-3 font-bold text-ink"
                >
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand text-white">
                    <FiCheck size={15} strokeWidth={3} />
                  </span>
                  {perk}
                </li>
              ))}
            </ul>
          </div>

          <p className="relative z-10 hidden text-sm text-ink-muted lg:mb-auto lg:block">
            Solo para administradores de la tienda.
          </p>

          <img
            src="/svg/simbolo.svg"
            alt=""
            aria-hidden
            className="pointer-events-none absolute -bottom-6 -right-8 hidden w-56 -rotate-[10deg] lg:block"
          />
        </section>

        <section className="flex items-center justify-center px-6 py-10 lg:px-14">
          <div className="w-full max-w-sm">
            <h2 className="text-3xl font-extrabold text-ink">Iniciar sesión</h2>
            <p className="mt-1 text-sm text-ink-muted">
              Entra con tu cuenta de administrador.
            </p>

            <form
              onSubmit={handleSubmit(onSubimit)}
              className="mt-6 flex flex-col gap-3.5"
            >
              <div>
                <TextField
                  label="Correo electrónico"
                  type="email"
                  id="email"
                  autoComplete="username"
                  placeholder="admin@ejemplo.com"
                  icon={FiMail}
                  {...register('identifier')}
                />
                <ErrorMessage errors={errors} fieldName="identifier" />
              </div>

              <div>
                <TextField
                  label="Contraseña"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="current-password"
                  placeholder="Tu contraseña"
                  icon={FiLock}
                  trailing={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={
                        showPassword
                          ? 'Ocultar contraseña'
                          : 'Mostrar contraseña'
                      }
                      className="grid h-8 w-8 place-items-center rounded-md text-ink-muted transition-colors hover:bg-cream hover:text-brand"
                    >
                      {showPassword ? (
                        <FiEyeOff size={16} />
                      ) : (
                        <FiEye size={16} />
                      )}
                    </button>
                  }
                  {...register('password')}
                />
                <ErrorMessage errors={errors} fieldName="password" />
              </div>

              <Link
                to="/register"
                className="self-end text-sm font-semibold text-brand underline-offset-4 hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </Link>

              <button
                disabled={isPending}
                type="submit"
                className="mt-1 flex h-12 items-center justify-center gap-2 rounded-full bg-brand font-bold text-white transition-colors hover:bg-ink disabled:bg-base-300 disabled:text-ink-muted"
              >
                {isPending ? (
                  <span className="loading loading-dots loading-sm" />
                ) : (
                  <>
                    Ingresar
                    <FiArrowRight size={17} />
                  </>
                )}
              </button>
            </form>
          </div>
        </section>
      </div>
    </>
  );
}

export default FormLogin;
