function DeleteUsers({
  isAdmin,
  children,
}: {
  isAdmin: boolean;
  children: React.ReactNode;
}) {
  return (
    <dialog id="delete_user" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">
          Eliminar {isAdmin ? 'Administrador' : 'Usuario'}
        </h3>
        {children}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button type="submit">cerrar</button>
      </form>
    </dialog>
  );
}

export default DeleteUsers;
