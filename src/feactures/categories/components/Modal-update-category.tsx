import { useRef } from "react";
import { Content } from "../interfaces/categories-response";
import { SubmitHandler, useForm } from "react-hook-form";
import categorySchema, { CategoryType } from "../../../shared/zod/products/category.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosPutBearer } from "../../../shared/requests/protectedRoutes/put";
import Cookie from "js-cookie";
import successAlert from "../../../shared/alerts/login/succes.alert";

type Props = {
  category: Content;
}

export default function ModalUpdateCategory({ category }: Props) {
  const modal = useRef<HTMLDialogElement>(null);
  const closeModal = () => modal.current?.close();

  const queryClient = useQueryClient();

  const { register, handleSubmit, formState: { errors } } = useForm<CategoryType>({
    resolver: zodResolver(categorySchema),
  });

  const { mutate } = useMutation({
    mutationFn: async (data: CategoryType) => {
      const token = Cookie.get('accessToken') || '';
      return await axiosPutBearer({
        url: `/app/categories/${category.id}`,
        data: data,
        token: token || ''
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      successAlert("Categoría actualizada con éxito");
      closeModal();
    }
  });

  const onSubmit: SubmitHandler<CategoryType> = (data) => mutate(data);
  
  return (
    <dialog id="update_category" className="modal modal-bottom sm:modal-middle" ref={modal}>
      <form method="dialog" className="modal-box text-white" onSubmit={handleSubmit(onSubmit)}>
        <h3 className="font-bold text-lg mb-4">Actualizar Categoria</h3>

        <div className="form-control w-full space-y-2">
          <label className="label">
            <span className="label-text">Nombre de la categoria</span>
          </label>
          <input
            type="text"
            placeholder="Ingrese el nombre de la categoria"
            className="input input-bordered w-full bg-gray-700"
            defaultValue={category.categoryName}
            {...register('categoryName')}
          />
          {errors.categoryName && (
            <span className="text-red-500 text-sm">{errors.categoryName.message}</span>
          )}
        </div>
        <div className="modal-action">
          <button type="button" className="btn" onClick={closeModal}>Cancelar</button>
          <button className="btn btn-primary">Actualizar</button>
        </div>
      </form>
      <form method="dialog" className="modal-backdrop">
        <button />
      </form>
    </dialog>
  );
}
