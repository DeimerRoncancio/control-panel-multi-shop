import { ToastContainer } from 'react-toastify';
import Register from './Register';

function ModalUserCreate({ isAdmin }: { isAdmin: boolean }) {
  return (
    <>
      <dialog id="create_user" className="modal">
        <div className="modal-box max-h-[95vh] !w-[1400px]">
          <h3 className="font-bold text-lg text-center mb-6">
            Crear Nuevo {isAdmin ? 'Administrador' : 'Usuario'}
          </h3>
          <Register isAdmin={isAdmin} />
          <div className="modal-action !m-0">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
          </div>
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
