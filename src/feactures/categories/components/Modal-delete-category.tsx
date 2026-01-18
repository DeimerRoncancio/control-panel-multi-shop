import { useRef } from "react";
import { Content } from "../interfaces/categories-response";
import successAlert from "../../../shared/alerts/login/succes.alert";
import { useMutation } from "@tanstack/react-query";
import axiosDeleteBearer from "../../../shared/requests/protectedRoutes/delete";
import Cookies from "js-cookie";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  category: Content;
}

export default function ModalDeleteCategory({ category }: Props) {
  const modal = useRef<HTMLDialogElement>(null);
  const closeModal = () => modal.current?.close();

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (categoryId: string) => {
      const token = Cookies.get('accessToken') || '';
      return await axiosDeleteBearer({
        url: `/app/categories/${categoryId}`,
        token: token
      });
    },
    onSuccess: () => {
      closeModal();
      successAlert("Categoría eliminada con éxito");
      queryClient.invalidateQueries({ queryKey: ["categories"] })
    }
  });

  const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    mutate(category.id);
  }

  return (
    <dialog id="delete_category" className="modal" ref={modal}>
      <form method="dialog" className="modal-box" onSubmit={onSubmit}>
        <h3 className="font-bold text-lg">Eliminar Categoria</h3>
        <p className="py-4">¿Estás seguro de que deseas eliminar esta categoria?</p>
        <div className="modal-action">
          <button className="btn btn-error">Eliminar</button>
          <button type="button" className="btn" onClick={closeModal}>Cancelar</button>
        </div>
      </form>
      <form method="dialog" className="modal-backdrop">
        <button onClick={closeModal}></button>
      </form>
    </dialog>
  );
};
