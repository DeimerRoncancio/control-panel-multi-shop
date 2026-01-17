import { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import categorySchema, { CategoryType } from "../../../shared/zod/products/category.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosPostBearer } from "../../../shared/requests/protectedRoutes/post";
import Cookies from "js-cookie";
import successAlert from "../../../shared/alerts/login/succes.alert";

export default function ModalCreateCategory() {
  const modalRef = useRef<HTMLDialogElement>(null);
  const closeModal = () => modalRef.current?.close();
  const queryClient = useQueryClient();

  const { register, handleSubmit, formState: { errors } } = useForm<CategoryType>({
    resolver: zodResolver(categorySchema),
  });

  const { mutate } = useMutation({
    mutationFn: async (categoryData: CategoryType) => {
      const token = Cookies.get('accessToken') || '';

      return await axiosPostBearer({
        url: '/app/categories',
        data: categoryData,
        token: token
      });
    },
    onSuccess: () => {
      closeModal();
      successAlert("Categoría creada con éxito");
      queryClient.invalidateQueries({ queryKey: ["categories"] })
    }
  });

  const onSubmit: SubmitHandler<CategoryType> = (data: CategoryType) => {
    mutate(data);
  }

  return (
    <dialog id="create_category" className="modal" ref={modalRef}>
      <div className="modal-box">
        <h3 className="font-semibold text-lg">Crear Nueva Categoría</h3>
        <p className="mb-4 font-thin">Completa los datos de la categoría que deseas crear</p>
        <form className="space-y-5 pr-1" onSubmit={handleSubmit(onSubmit)}>
          <label className="flex flex-col">
            <span className="font-normal mb-3">Nombre de la Categoría</span>
            <input
              type="text"
              placeholder="Nombre de la categoría"
              className="input input-bordered w-full"
              {...register("categoryName")}
            />
            {errors.categoryName && (
              <span className="text-sm text-red-500 mt-1">
                {errors.categoryName.message}
              </span>
            )}
          </label>
          <div className="modal-action grid grid-cols-2 gap-4 mt-10">
            <button
              type="button"
              className="btn btn-error btn-outline"
              onClick={closeModal}
            >
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              Crear Categoría
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={closeModal}>cerrar</button>
      </form>
    </dialog>
  );
}

