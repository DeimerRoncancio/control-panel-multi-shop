import { VariantType } from "../../../../shared/zod/products/variant.zod";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { ProductType } from "../../../../shared/zod/products/product.zod";

type Props = {
  variant: VariantType;
  watch: UseFormWatch<ProductType>;
  setValue: UseFormSetValue<ProductType>;
  remove: (variantId: string[]) => void;
}

export default function ModalDeleteVariant({ variant, watch, setValue, remove }: Props) {
  const modal = document.getElementById("delete_variant") as HTMLDialogElement;
  const variants = watch("variants") || [];

  const handleDelete = () => {
    if (variant.id) remove && remove([ variant.id ]);
    setValue("variants", [ ...variants.filter(v => v !== variant)|| [] ]);
    modal.close();
  }

  return (
    <dialog id="delete_variant" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">
          Eliminar Producto
        </h3>
        <p className="py-4">
          ¿Estás seguro de que deseas eliminar esta variante?
        </p>
        <div className="modal-action">
          <form method="dialog">
            <button type="button" className="btn btn-success"
            onClick={() => {
              modal.close();
            }
              }>
              Cancelar
            </button>
          </form>
          <button
            type="button"
            className="btn btn-error w-[100px]"
            onClick={handleDelete}
          >
            Eliminar
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button type="submit">cerrar</button>
      </form>
    </dialog>
  );
}
