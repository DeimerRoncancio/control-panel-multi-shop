import { useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Cookie from 'js-cookie';
import { FiEdit2 } from 'react-icons/fi';
import { Content } from '../interfaces/categories-response';
import categorySchema, {
  CategoryType,
} from '../../../shared/zod/products/category.zod';
import { axiosPutBearer } from '../../../shared/requests/protectedRoutes/put';
import successAlert from '../../../shared/alerts/login/succes.alert';
import ModalHeader from '../../../shared/ui/ModalHeader';
import TextField from '../../../shared/ui/TextField';
import {
  outlineButtonClass,
  primaryButtonClass,
} from '../../../shared/ui/styles';

type Props = {
  category: Content;
};

export default function ModalUpdateCategory({ category }: Props) {
  const modal = useRef<HTMLDialogElement>(null);
  const closeModal = () => modal.current?.close();

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryType>({
    resolver: zodResolver(categorySchema),
  });

  const { mutate } = useMutation({
    mutationFn: async (data: CategoryType) => {
      const token = Cookie.get('accessToken') || '';
      return axiosPutBearer({
        url: `/app/categories/${category.id}`,
        data,
        token: token || '',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      successAlert('Categoría actualizada con éxito');
      closeModal();
    },
  });

  const onSubmit: SubmitHandler<CategoryType> = (data) => mutate(data);

  return (
    <dialog
      id="update_category"
      className="modal modal-bottom sm:modal-middle"
      ref={modal}
    >
      <form
        method="dialog"
        className="modal-box"
        onSubmit={handleSubmit(onSubmit)}
      >
        <ModalHeader
          icon={<FiEdit2 size={19} />}
          title="Editar categoría"
          description={
            category.categoryName
              ? `Cambia el nombre de "${category.categoryName}".`
              : undefined
          }
          onClose={closeModal}
        />
        <TextField
          label="Nombre de la categoría"
          placeholder="Ingresa el nombre de la categoría"
          defaultValue={category.categoryName}
          error={errors.categoryName?.message}
          {...register('categoryName')}
        />
        <div className="mt-5 flex justify-end gap-2.5 border-t border-line pt-4">
          <button
            type="button"
            className={outlineButtonClass}
            onClick={closeModal}
          >
            Cancelar
          </button>
          <button type="submit" className={primaryButtonClass}>
            Guardar cambios
          </button>
        </div>
      </form>
      <form method="dialog" className="modal-backdrop">
        <button type="submit" aria-label="Cerrar" />
      </form>
    </dialog>
  );
}
