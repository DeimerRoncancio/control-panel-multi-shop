import { toast } from 'react-toastify';

const successAlert = () => {
  toast.success('Bienvenido', {
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
export default successAlert;
