import { MdAdd, MdInfoOutline } from "react-icons/md";
import { Variants } from "../../interface/response-productid";
import VariantItem from "./variants/Variant-item";

type Props = {
  variants?: Variants[];
}

export default function UpdateVariant({ variants }: Props) {
  return (
    <div className="mt-12 border rounded-lg border-gray-600 col-span-2 bg-base-100">
      <div className="card shadow-xl">
        <div className="card-body p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h2 className="card-title text-xl flex items-center gap-2">
                Variantes del Producto
              </h2>
              <p className="text-base-content/70 text-sm mt-1">
                Gestiona las diferentes opciones disponibles para este producto.
              </p>
            </div>
            <button type="button" className="btn btn-primary gap-2">
              <MdAdd size={20} />
              Crear variante
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {variants && variants.length > 0 ? variants.map((variant) => (
              <VariantItem key={variant.id} variant={variant} />
            )) : (
              <div className="flex flex-col items-center justify-center py-8 bg-base-200 border border-base-300 rounded-lg text-base-content/60">
                <MdInfoOutline size={24} className="mb-2 opacity-50" />
                <span className="text-sm font-medium">No hay variantes creadas</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
