import { toast } from 'react-toastify';

const successAlertCreate = () => {
  toast.success('Usuario creado con éxito', {
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
export default successAlertCreate;
