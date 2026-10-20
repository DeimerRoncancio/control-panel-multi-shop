import { VariantType } from '../../../../shared/zod/products/variant.zod';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { ProductType } from '../../../../shared/zod/products/product.zod';
import { FiTrash2 } from 'react-icons/fi';
import ModalHeader from '../../../../shared/ui/ModalHeader';
import {
  dangerButtonClass,
  outlineButtonClass,
} from '../../../../shared/ui/styles';

type Props = {
  variant: VariantType;
  watch: UseFormWatch<ProductType>;
  setValue: UseFormSetValue<ProductType>;
  remove: (variantId: string[]) => void;
};

export default function ModalDeleteVariant({
  variant,
  watch,
  setValue,
  remove,
}: Props) {
  const modal = document.getElementById('delete_variant') as HTMLDialogElement;
  const variants = watch('variants') || [];

  const handleDelete = () => {
    if (variant.id) remove && remove([variant.id]);
    setValue('variants', [...(variants.filter((v) => v !== variant) || [])]);
    modal.close();
  };

  return (
    <dialog id="delete_variant" className="modal">
      <div className="modal-box modal-danger">
        <ModalHeader
          icon={<FiTrash2 size={19} />}
          tone="error"
          title="Eliminar variante"
          description="¿Seguro que quieres eliminar esta variante? Se quitará al guardar el producto."
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
            type="button"
            className={dangerButtonClass}
            onClick={handleDelete}
          >
            Sí, eliminar
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button type="submit">cerrar</button>
      </form>
    </dialog>
  );
}
