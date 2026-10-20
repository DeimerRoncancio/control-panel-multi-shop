import { FiEdit2 } from 'react-icons/fi';
import ModalHeader from '../../../ui/ModalHeader';

const closeDialog = () =>
  (document.getElementById('update_user') as HTMLDialogElement | null)?.close();

function ModalUsersUpdate({
  children,
  isAdmin,
}: {
  children: React.ReactNode;
  isAdmin: boolean;
}) {
  return (
    <dialog id="update_user" className="modal">
      <div className="modal-box max-h-[95vh] w-full max-w-3xl">
        <ModalHeader
          icon={<FiEdit2 size={19} />}
          title={isAdmin ? 'Editar administrador' : 'Editar usuario'}
          description="Cambia los datos de la cuenta y guarda."
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

export default ModalUsersUpdate;
