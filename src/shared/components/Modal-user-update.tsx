function ModalUsersUpdate({ isAdmin }: { isAdmin: boolean }) {
  return (
    <dialog id="update_user" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">
          {isAdmin ? 'Actualizar Administrador' : 'Actualizar Usuario'}
        </h3>
        <p className="py-4">
          Presiona la tecla ESC o haz clic fuera para cerrar
        </p>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button type="submit">cerrar</button>
      </form>
    </dialog>
  );
}

export default ModalUsersUpdate;
