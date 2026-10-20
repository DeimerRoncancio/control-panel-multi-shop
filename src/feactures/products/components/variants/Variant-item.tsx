import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { VariantType } from '../../../../shared/zod/products/variant.zod';
import ButtonModal from '../../../../shared/components/globalComponents/ButtonModal';

type Props = {
  variant: VariantType;
  setVariantSelected: () => void;
};

const iconButton =
  'grid h-9 w-9 place-items-center rounded-full text-ink-soft transition-colors';

export default function VariantItem({ variant, setVariantSelected }: Props) {
  return (
    <div
      className={`rounded-xl border p-4 transition-colors ${
        variant.id
          ? 'border-line hover:border-brand/40'
          : 'border-success bg-mint/40'
      }`}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-extrabold text-ink">{variant.name}</h3>
            <span className="rounded-full bg-lilac px-2 py-0.5 text-[11px] font-bold text-lilac-strong">
              {variant.type === 'color' ? 'Color' : 'Texto'}
            </span>
            {!variant.id && (
              <span className="rounded-full bg-success px-2 py-0.5 text-[11px] font-bold text-white">
                Nueva
              </span>
            )}
          </div>
          <p className="mt-0.5 text-xs text-ink-muted">
            Etiqueta:{' '}
            <span className="font-bold text-ink-soft">{variant.tag}</span>
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <ButtonModal
            idModal="update_variant"
            className={`${iconButton} hover:bg-brand-soft hover:text-brand`}
            onClick={setVariantSelected}
          >
            <FiEdit2 size={15} />
          </ButtonModal>
          <ButtonModal
            idModal="delete_variant"
            className={`${iconButton} hover:bg-error/10 hover:text-error`}
            onClick={setVariantSelected}
          >
            <FiTrash2 size={15} />
          </ButtonModal>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {variant.listValues.map((val) => (
          <span
            key={val}
            className="inline-flex items-center gap-1.5 rounded-full border border-line bg-base-100 px-3 py-1 text-xs font-bold text-ink"
          >
            {variant.type === 'color' && (
              <span
                className="h-3.5 w-3.5 rounded-full ring-1 ring-line"
                style={{ backgroundColor: val }}
              />
            )}
            {val}
          </span>
        ))}
      </div>
    </div>
  );
}
