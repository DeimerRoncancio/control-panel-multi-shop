import { FaLayerGroup, FaPlus, FaUserPlus } from "react-icons/fa";
import ButtonModal from "../../../shared/components/globalComponents/ButtonModal";
import ModalUserCreate from "../../../shared/components/users/register/Modal-user-create";
import ModalProductCreate from "../../products/components/create/Modal-create-product";
import ModalCreateCategory from "../../categories/components/Modal-create-category";
import { ToastContainer } from "react-toastify";

export default function QuickActions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <ButtonModal idModal="create_product" className="btn btn-outline btn-primary h-auto py-4 flex flex-col gap-2 hover:scale-105 transition-transform">
        <FaPlus className="text-2xl" />
        <span>Crear Producto</span>
      </ButtonModal>
      <ButtonModal idModal="create_category" className="btn btn-outline btn-secondary h-auto py-4 flex flex-col gap-2 hover:scale-105 transition-transform">
        <FaLayerGroup className="text-2xl" />
        <span>Nueva Categoría</span>
      </ButtonModal>
      <ButtonModal idModal="create_user" className="btn btn-outline btn-accent h-auto py-4 flex flex-col gap-2 hover:scale-105 transition-transform">
        <FaUserPlus className="text-2xl" />
        <span>Registrar Usuario</span>
      </ButtonModal>

      <ModalUserCreate isAdmin={false} />
      <ModalCreateCategory />
      <ModalProductCreate />
      <ToastContainer />
    </div>
  );
}
