import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { FiTrash2 } from 'react-icons/fi';
import { Content } from '../interfaces/categories-response';
import successAlert from '../../../shared/alerts/login/succes.alert';
import axiosDeleteBearer from '../../../shared/requests/protectedRoutes/delete';
import ModalHeader from '../../../shared/ui/ModalHeader';
import {
  dangerButtonClass,
  outlineButtonClass,
} from '../../../shared/ui/styles';

type Props = {
  category: Content;
};

export default function ModalDeleteCategory({ category }: Props) {
  const modal = useRef<HTMLDialogElement>(null);
  const closeModal = () => modal.current?.close();

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (categoryId: string) => {
      const token = Cookies.get('accessToken') || '';
      return axiosDeleteBearer({
        url: `/app/categories/${categoryId}`,
        token,
      });
    },
    onSuccess: () => {
      closeModal();
      successAlert('Categoría eliminada con éxito');
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    mutate(category.id);
  };

  return (
    <dialog id="delete_category" className="modal" ref={modal}>
      <form
        method="dialog"
        className="modal-box modal-danger"
        onSubmit={onSubmit}
      >
        <ModalHeader
          icon={<FiTrash2 size={19} />}
          tone="error"
          title="Eliminar categoría"
          description={`¿Seguro que quieres eliminar "${category.categoryName ?? ''}"? Esta acción no se puede deshacer.`}
          onClose={closeModal}
        />
        <div className="flex justify-end gap-2.5 border-t border-line pt-4">
          <button
            type="button"
            className={outlineButtonClass}
            onClick={closeModal}
          >
            Cancelar
          </button>
          <button type="submit" className={dangerButtonClass}>
            Sí, eliminar
          </button>
        </div>
      </form>
      <form method="dialog" className="modal-backdrop">
        <button type="submit" aria-label="Cerrar" onClick={closeModal} />
      </form>
    </dialog>
  );
}
