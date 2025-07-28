function ModalUsersAvatar({
  isAdmin,
  children,
}: {
  isAdmin: boolean;
  children: React.ReactNode;
}) {
  return (
    <dialog id="user_avatar" className="modal">
      <div className="modal-box h-[85vh] w-5/12 max-w-5xl">
        <h3 className="font-bold text-xl text-center">
          Actualizar Avatar {isAdmin ? 'Administrador' : 'Usuario'}
        </h3>
        {children}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button type="submit">cerrar</button>
      </form>
    </dialog>
  );
}

export default ModalUsersAvatar;
