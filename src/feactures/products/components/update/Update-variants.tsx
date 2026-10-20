import { FiLayers, FiPlus } from 'react-icons/fi';
import VariantItem from '../variants/Variant-item';
import ButtonModal from '../../../../shared/components/globalComponents/ButtonModal';
import { VariantType } from '../../../../shared/zod/products/variant.zod';
import {
  cardClass,
  formSectionTitleClass,
  primaryButtonClass,
} from '../../../../shared/ui/styles';

type Props = {
  variants?: VariantType[];
  setVariantSelected: (variant: VariantType) => void;
};

export default function UpdateVariant({ variants, setVariantSelected }: Props) {
  const handleVariantSelected = (variant: VariantType) =>
    setVariantSelected(variant);

  return (
    <div className={`${cardClass} p-5 sm:p-6`}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className={formSectionTitleClass}>Variantes del producto</h2>
          <p className="-mt-2 text-sm text-ink-muted">
            Tallas, colores u otras opciones que el cliente elige.
          </p>
        </div>
        <ButtonModal
          idModal="create_variant"
          className={`${primaryButtonClass} h-9 px-4`}
        >
          <FiPlus size={16} />
          Crear variante
        </ButtonModal>
      </div>

      <div className="flex flex-col gap-3">
        {variants && variants.length > 0 ? (
          variants.map((variant, index) => (
            <VariantItem
              key={variant.id ?? index}
              variant={variant}
              setVariantSelected={() => handleVariantSelected(variant)}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-line py-8 text-ink-muted">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-lilac text-lilac-strong">
              <FiLayers size={18} />
            </span>
            <span className="text-sm font-bold">No hay variantes creadas</span>
          </div>
        )}
      </div>
    </div>
  );
}
