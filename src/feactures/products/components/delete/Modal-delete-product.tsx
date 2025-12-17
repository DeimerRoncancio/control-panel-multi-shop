import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosDeleteBearer from "../../../../shared/requests/protectedRoutes/delete";
import successAlert from "../../../../shared/alerts/login/succes.alert";
import { errorAlert } from "../../../../shared/alerts";
import Cookies from "js-cookie";

type Props = {
  productId: string;
};

function ModalProductDelete({ productId }: Props) {
  const modal = document.getElementById("delete_product") as HTMLDialogElement;
  
  const queryClient = useQueryClient();
  
  const { mutate, isPending: loading } = useMutation({
    mutationFn: axiosDeleteBearer,
    onSuccess: () => {
      successAlert("Producto eliminado con éxito");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      modal.close();
    },
    onError: (error: any) => {
      errorAlert({ message: 'Error al eliminar el producto: ' + error.message });
    }
  })
  
  const handleDelete = () => {
    const token = Cookies.get("accessToken") || '';
    mutate({
      url: `/app/products/${productId}`,
      token,
    });
  }

  return (
    <dialog id="delete_product" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">
          Eliminar Producto
        </h3>
        <p className="py-4">
          ¿Estás seguro de que deseas eliminar este producto?
        </p>
        <div className="modal-action">
          <form method="dialog">
            <button type="submit" className="btn btn-success">
              Cancelar
            </button>
          </form>
          <button
            disabled={loading}
            type="button"
            className="btn btn-error w-[100px]"
            onClick={handleDelete}
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              'Eliminar'
            )}
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button type="submit">cerrar</button>
      </form>
    </dialog>
  );
}

export default ModalProductDelete;
