function ModalProductDelete() {
  return (
    <dialog id="delete_product" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Eliminar Producto</h3>
        {/* Aquí puedes agregar el contenido para eliminar el producto */}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button type="submit">cerrar</button>
      </form>
    </dialog>
  );
}

export default ModalProductDelete;
