function DeleteUsers({ isAdmin }: { isAdmin: boolean }) {
  return (
    <dialog id="delete_user" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">
          Eliminar {isAdmin ? 'Administrador' : 'Usuario'}
        </h3>
        <p className="py-4">Press ESC key or click outside to close</p>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button type="submit">cerrar</button>
      </form>
    </dialog>
  );
}

export default DeleteUsers;
