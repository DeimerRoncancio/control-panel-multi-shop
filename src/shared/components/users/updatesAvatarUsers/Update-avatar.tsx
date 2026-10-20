import { FiImage } from 'react-icons/fi';
import ModalHeader from '../../../ui/ModalHeader';

const closeDialog = () =>
  (document.getElementById('user_avatar') as HTMLDialogElement | null)?.close();

function ModalUsersAvatar({
  isAdmin,
  children,
}: {
  isAdmin: boolean;
  children: React.ReactNode;
}) {
  return (
    <dialog id="user_avatar" className="modal">
      <div className="modal-box max-h-[90vh] w-full max-w-2xl">
        <ModalHeader
          icon={<FiImage size={19} />}
          title={`Foto del ${isAdmin ? 'administrador' : 'usuario'}`}
          description="Sube una imagen cuadrada para el perfil."
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

export default ModalUsersAvatar;
