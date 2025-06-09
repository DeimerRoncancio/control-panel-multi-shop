import FormLogin from '../components/login/FormLogin';

function Login() {
  return (
    <>
      <FormLogin />
      <div className="text-center mt-4">
        <p>
          ¿No tienes una cuenta?{' '}
          <a href="/register" className="link link-primary">
            Regístrate aquí
          </a>
        </p>
      </div>
    </>
  );
}

export default Login;
