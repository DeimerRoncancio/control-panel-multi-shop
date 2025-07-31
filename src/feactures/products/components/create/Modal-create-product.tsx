function ModalProductCreate() {
  return (
    <dialog id="create_product" className="modal">
      <div className="modal-box h-[85vh] w-8/12 max-w-5xl">
        <h3 className="font-bold text-xl text-center">Crear Producto</h3>
        {/* <Register isAdmin={isAdmin} /> */}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button type="submit">cerrar</button>
      </form>
    </dialog>
  );
}
export default ModalProductCreate;
