import { MdEdit, MdDelete } from 'react-icons/md';
import { Variants } from '../../../interface/response-productid';

type Props = {
  variant: Variants;
}

export default function VariantItem({ variant }: Props) {
  return (
    <div
      key={variant.id}
      className="card bg-base-200 border border-base-300 hover:border-primary/50 transition-colors duration-200"
    >
      <div className="card-body p-3 sm:p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base text-base-content">
                {variant.name}
              </h3>
              <span className={`badge badge-xs badge-primary`}>
                {variant.type === 'color' ? 'Color' : 'Texto'}
              </span>
            </div>
            <div className="text-xs text-base-content/80">
              <span className="opacity-70">Tag: </span>
              <span className="font-medium">{variant.tag}</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="btn btn-square btn-md btn-ghost hover:bg-base-300 text-base-content/70 rounded-lg"
              title="Editar variante"
            >
              <MdEdit size={16} />
            </button>
            <button
              type="button"
              className="btn btn-square btn-md btn-ghost hover:bg-error/10 hover:text-error rounded-lg"
              title="Eliminar variante"
            >
              <MdDelete size={16} />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {variant.listValues.map((val) => (
            <span
              key={val}
              className="flex items-center px-3 py-1 rounded-md border border-primary bg-base-100 text-primary text-xs
              font-medium shadow-sm hover:shadow-md transition-shadow cursor-default"
            >
              {variant.type === 'color' && (
                <span
                  className="inline-block w-4 h-4 rounded-full border border-primary mr-1"
                  style={{ backgroundColor: val }}
                />
              )}
              {val}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
