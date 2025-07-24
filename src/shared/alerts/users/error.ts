import { toast } from 'react-toastify';

export const errorAlertCreate = () => {
  toast.error('Error al crear usuario', {
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
