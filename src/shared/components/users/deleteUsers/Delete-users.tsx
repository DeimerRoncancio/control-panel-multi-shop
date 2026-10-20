import { FiTrash2 } from 'react-icons/fi';
import ModalHeader from '../../../ui/ModalHeader';

const closeDialog = () =>
  (document.getElementById('delete_user') as HTMLDialogElement | null)?.close();

function DeleteUsers({
  isAdmin,
  children,
}: {
  isAdmin: boolean;
  children: React.ReactNode;
}) {
  return (
    <dialog id="delete_user" className="modal">
      <div className="modal-box modal-danger">
        <ModalHeader
          icon={<FiTrash2 size={19} />}
          tone="error"
          title={`Eliminar ${isAdmin ? 'administrador' : 'usuario'}`}
          description="Esta acción no se puede deshacer."
          onClose={closeDialog}
        />
        {children}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button type="submit">cerrar</button>
      </form>
    </dialog>
  );
}

export default DeleteUsers;
