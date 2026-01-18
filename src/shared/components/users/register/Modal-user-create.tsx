import { ToastContainer } from 'react-toastify';
import Register from './Register';

function ModalUserCreate({ isAdmin }: { isAdmin: boolean }) {
  return (
    <dialog id="create_user" className="modal">
      <ToastContainer />
      <div className="modal-box h-[85vh] w-8/12 max-w-5xl">
        <h3 className="font-bold text-xl text-center">
          Crear {isAdmin ? 'Administrador' : 'Usuario'}
        </h3>
        <Register isAdmin={isAdmin} />
      </div>
      <form method="dialog" className="modal-backdrop">
        <button type="submit">cerrar</button>
      </form>
    </dialog>
  );
}
export default ModalUserCreate;
