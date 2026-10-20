import { useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { FiGrid } from 'react-icons/fi';
import categorySchema, {
  CategoryType,
} from '../../../shared/zod/products/category.zod';
import { axiosPostBearer } from '../../../shared/requests/protectedRoutes/post';
import successAlert from '../../../shared/alerts/login/succes.alert';
import ModalHeader from '../../../shared/ui/ModalHeader';
import TextField from '../../../shared/ui/TextField';
import {
  outlineButtonClass,
  primaryButtonClass,
} from '../../../shared/ui/styles';

export default function ModalCreateCategory() {
  const modalRef = useRef<HTMLDialogElement>(null);
  const closeModal = () => modalRef.current?.close();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryType>({
    resolver: zodResolver(categorySchema),
  });

  const { mutate } = useMutation({
    mutationFn: async (categoryData: CategoryType) => {
      const token = Cookies.get('accessToken') || '';

      return axiosPostBearer({
        url: '/app/categories',
        data: categoryData,
        token,
      });
    },
    onSuccess: () => {
      closeModal();
      successAlert('Categoría creada con éxito');
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['latest-categories'] });
    },
  });

  const onSubmit: SubmitHandler<CategoryType> = (data: CategoryType) => {
    mutate(data);
  };

  return (
    <dialog id="create_category" className="modal" ref={modalRef}>
      <div className="modal-box">
        <ModalHeader
          icon={<FiGrid size={20} />}
          title="Nueva categoría"
          description="Aparecerá en la barra de la tienda con su propio color."
          onClose={closeModal}
        />
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Nombre de la categoría"
            placeholder="Por ejemplo: Hogar"
            error={errors.categoryName?.message}
            {...register('categoryName')}
          />
          <div className="flex justify-end gap-2.5 border-t border-line pt-4">
            <button
              type="button"
              className={outlineButtonClass}
              onClick={closeModal}
            >
              Cancelar
            </button>
            <button type="submit" className={primaryButtonClass}>
              Crear categoría
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button type="submit" onClick={closeModal}>
          cerrar
        </button>
      </form>
    </dialog>
  );
}
