import { ToastContainer } from 'react-toastify';
import { FiUserPlus } from 'react-icons/fi';
import Register from './Register';
import ModalHeader from '../../../ui/ModalHeader';

const closeDialog = () =>
  (document.getElementById('create_user') as HTMLDialogElement | null)?.close();

function ModalUserCreate({ isAdmin }: { isAdmin: boolean }) {
  return (
    <>
      <dialog id="create_user" className="modal">
        <div className="modal-box max-h-[95vh] w-full max-w-3xl">
          <ModalHeader
            icon={<FiUserPlus size={20} />}
            title={isAdmin ? 'Nuevo administrador' : 'Nuevo usuario'}
            description={
              isAdmin
                ? 'Tendrá acceso completo a este panel.'
                : 'Podrá comprar en la tienda con su correo y contraseña.'
            }
            onClose={closeDialog}
          />
          <Register isAdmin={isAdmin} />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button type="submit">cerrar</button>
        </form>
      </dialog>
      <ToastContainer />
    </>
  );
}

export default ModalUserCreate;
