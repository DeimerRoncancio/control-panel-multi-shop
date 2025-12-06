import { toast } from 'react-toastify';

export const errorAlert = ({ message }: { message?: string }) => {
  toast.error(message || 'Email o contraseña incorrecta', {
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
