import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosDeleteBearer from '../../../../shared/requests/protectedRoutes/delete';
import successAlert from '../../../../shared/alerts/login/succes.alert';
import { errorAlert } from '../../../../shared/alerts';
import Cookies from 'js-cookie';
import { FiTrash2 } from 'react-icons/fi';
import ModalHeader from '../../../../shared/ui/ModalHeader';
import {
  dangerButtonClass,
  outlineButtonClass,
} from '../../../../shared/ui/styles';

type Props = {
  productId: string;
};

function ModalProductDelete({ productId }: Props) {
  const modal = document.getElementById('delete_product') as HTMLDialogElement;

  const queryClient = useQueryClient();

  const { mutate, isPending: loading } = useMutation({
    mutationFn: axiosDeleteBearer,
    onSuccess: () => {
      successAlert('Producto eliminado con éxito');
      queryClient.invalidateQueries({ queryKey: ['products'] });
      modal.close();
    },
    onError: (error: any) => {
      errorAlert({
        message: 'Error al eliminar el producto: ' + error.message,
      });
    },
  });

  const handleDelete = () => {
    const token = Cookies.get('accessToken') || '';
    mutate({
      url: `/app/products/${productId}`,
      token,
    });
  };

  return (
    <dialog id="delete_product" className="modal">
      <div className="modal-box modal-danger">
        <ModalHeader
          icon={<FiTrash2 size={19} />}
          tone="error"
          title="Eliminar producto"
          description="¿Seguro que quieres eliminar este producto? Desaparecerá de la tienda y no se puede deshacer."
          onClose={() => modal.close()}
        />
        <div className="flex justify-end gap-2.5 border-t border-line pt-4">
          <button
            type="button"
            className={outlineButtonClass}
            onClick={() => modal.close()}
          >
            Cancelar
          </button>
          <button
            disabled={loading}
            type="button"
            className={`${dangerButtonClass} min-w-32`}
            onClick={handleDelete}
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm text-white" />
            ) : (
              'Sí, eliminar'
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
