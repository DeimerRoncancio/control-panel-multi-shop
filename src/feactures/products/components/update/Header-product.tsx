import { useNavigate } from 'react-router';
import { FiArrowLeft, FiSave } from 'react-icons/fi';
import { primaryButtonClass } from '../../../../shared/ui/styles';

type Props = {
  isUpdating: boolean;
  productName?: string;
};

export function HeaderProduct({ isUpdating, productName }: Props) {
  const navigate = useNavigate();

  return (
    <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          aria-label="Volver a productos"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line bg-base-100 text-ink transition-colors hover:border-ink"
          onClick={() => navigate('/products')}
        >
          <FiArrowLeft size={18} />
        </button>
        <div className="min-w-0">
          <p className="text-xs font-extrabold uppercase tracking-[0.08em] text-brand">
            Editar producto
          </p>
          <h1 className="truncate text-2xl font-extrabold text-ink">
            {productName || 'Cargando…'}
          </h1>
        </div>
      </div>

      <button
        type="submit"
        className={`${primaryButtonClass} min-w-44`}
        disabled={isUpdating}
      >
        {isUpdating ? (
          <span className="loading loading-spinner loading-sm text-white" />
        ) : (
          <>
            <FiSave size={16} />
            Guardar cambios
          </>
        )}
      </button>
    </div>
  );
}
