import { toast } from 'react-toastify';

export const errorAlert = () => {
  toast.error('Email o contraseña incorrecta', {
    position: 'bottom-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
};
