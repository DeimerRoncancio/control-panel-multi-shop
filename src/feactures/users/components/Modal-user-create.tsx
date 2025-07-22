function ModalUserCreate() {
  return (
    <dialog id="create_user" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Create User</h3>
        <p className="py-4">Press ESC key or click outside to close</p>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button type="submit">close</button>
      </form>
    </dialog>
  );
}
export default ModalUserCreate;
