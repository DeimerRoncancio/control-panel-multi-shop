function ModalUsersUpdate({
  children,
  isAdmin,
}: {
  children: React.ReactNode;
  isAdmin: boolean;
}) {
  return (
    <dialog id="update_user" className="modal">
      <div className="modal-box h-[85vh] w-8/12 max-w-5xl">
        <h3 className="font-bold text-xl text-center">
          {isAdmin ? 'Actualizar Administrador' : 'Actualizar Usuario'}
        </h3>

        {children}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button type="submit">cerrar</button>
      </form>
    </dialog>
  );
}

export default ModalUsersUpdate;
