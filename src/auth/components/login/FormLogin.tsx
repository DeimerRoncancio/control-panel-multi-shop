import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import { MdOutlineMail, MdLockOutline } from 'react-icons/md';
import Cookies from 'js-cookie';
import AccesLoginSchema, { LoginTypeAccess } from '../../zod/login.zod';
import { LoginType } from '../../types';
import ErrorMessage from '../../../shared/components/globalComponents/MessajeError';
import axiosPost from '../../../shared/requests/basicRequests/post';
import envs from '../../../configs/envs';
import { errorAlert } from '../../../shared/alerts';
import { HorasEnMilisegundos } from '../../helpers';

function FormLogin() {
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
      url: `${envs.API}/login`,
      data,
    });

    setValue('identifier', '');
    setValue('password', '');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#15191e] relative overflow-hidden">
      <ToastContainer />

      {/* Shapes de fondo sutiles */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-pink-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="hero-content flex-col lg:flex-row w-full max-w-5xl gap-12 lg:gap-20 p-6 relative z-10">
        
        {/* Left Section - Branding simplificado */}
        <div className="text-center lg:text-left flex-1 space-y-6">
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-7xl font-bold text-white tracking-tight">
              Nicki <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
                Best Deals
              </span>
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed max-w-md mx-auto lg:mx-0 font-light">
               Panel de administración centralizado. Gestiona tu negocio de dropshipping de forma eficiente.
            </p>
          </div>
        </div>

        {/* Right Section - Login Card optimizada */}
        <div className="card w-full max-w-md bg-[#1d232a] shadow-xl border border-[#2d2d3b]">
          <div className="card-body p-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center lg:text-left">Iniciar Sesión</h2>

            <form onSubmit={handleSubmit(onSubimit)} className="flex flex-col gap-5">
              <div className="form-control space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider" htmlFor="email">
                  Correo Electrónico
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                    <MdOutlineMail className="h-5 w-5 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
                  </div>
                  <input
                    type="email"
                    className="input w-full pl-10 h-11 bg-[#252538] border-[#2d2d3b] text-gray-200 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 rounded-lg transition-all"
                    placeholder="admin@ejemplo.com"
                    id="email"
                    {...register('identifier')}
                  />
                </div>
                <ErrorMessage errors={errors} fieldName="identifier" />
              </div>

              <div className="form-control space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider" htmlFor="password">
                  Contraseña
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                    <MdLockOutline className="h-5 w-5 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
                  </div>
                  <input
                    type="password"
                    className="input w-full pl-10 h-11 bg-[#252538] border-[#2d2d3b] text-gray-200 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 rounded-lg transition-all"
                    placeholder="••••••••"
                    id="password"
                    {...register('password')}
                  />
                </div>
                <div className="flex justify-between items-center pt-1">
                  <ErrorMessage errors={errors} fieldName="password" />
                  <Link
                    to="/register"
                    className="text-xs text-gray-500 hover:text-purple-400 transition-colors ml-auto"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
              </div>

              <button
                disabled={isPending}
                type="submit"
                className="btn border-none bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white w-full h-11 rounded-lg text-sm font-bold shadow-lg shadow-purple-900/10 mt-2 tracking-wide uppercase"
              >
                {isPending ? (
                  <span className="loading loading-dots loading-sm" />
                ) : (
                  'Ingresar'
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
