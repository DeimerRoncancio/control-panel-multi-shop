import { FiEdit2, FiMoreHorizontal, FiTrash2 } from 'react-icons/fi';
import ButtonModal from '../../../shared/components/globalComponents/ButtonModal';
import { Content } from '../interfaces/categories-response';
import { categoryStyle } from '../../../shared/helpers/category-color';
import EmptyState from '../../../shared/ui/EmptyState';
import {
  actionsButtonClass,
  cardClass,
  menuDangerRowClass,
  menuPanelClass,
  menuRowClass,
} from '../../../shared/ui/styles';

type Props = {
  isLoading: boolean;
  categories: Content[] | undefined;
  selectCategory: (category: Content) => void;
};

export default function ListCategories({
  categories,
  isLoading,
  selectCategory,
}: Props) {
  return (
    <div className={`${cardClass} overflow-x-auto p-3`}>
      <table className="table">
        <thead>
          <tr>
            <th>Categoría</th>
            <th>Productos</th>
            <th>Total</th>
            <th className="text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categories?.length === 0 && !isLoading && (
            <tr>
              <td colSpan={4}>
                <EmptyState
                  title="No se encontraron categorías"
                  description="Intenta ajustar los filtros de búsqueda."
                />
              </td>
            </tr>
          )}
          {isLoading ? (
            <tr>
              <td colSpan={4} className="py-10 text-center">
                <span className="loading loading-spinner loading-lg" />
              </td>
            </tr>
          ) : (
            categories?.map((category, index) => (
              <tr
                key={category.id}
                style={categoryStyle(category.categoryName)}
              >
                <td>
                  <span className="flex items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-(--cat-soft)">
                      <span className="h-3 w-3 rounded-full bg-(--cat)" />
                    </span>
                    <span className="font-extrabold text-ink">
                      {category.categoryName}
                    </span>
                  </span>
                </td>
                <td>
                  <div className="flex max-w-md flex-wrap gap-1.5">
                    {category.products.slice(0, 3).map((product) => (
                      <span
                        key={product.id}
                        className="max-w-44 truncate rounded-full border border-line px-2.5 py-0.5 text-xs font-semibold text-ink-soft"
                      >
                        {product.productName}
                      </span>
                    ))}
                    {category.products.length > 3 && (
                      <span className="rounded-full bg-(--cat-soft) px-2.5 py-0.5 text-xs font-bold text-(--cat)">
                        +{category.products.length - 3} más
                      </span>
                    )}
                    {category.products.length === 0 && (
                      <span className="text-sm text-ink-muted">
                        No hay productos
                      </span>
                    )}
                  </div>
                </td>
                <td>
                  <span className="text-sm font-bold text-ink tabular-nums">
                    {category.products.length < 1
                      ? 'Sin'
                      : category.products.length}{' '}
                    <span className="font-semibold text-ink-muted">
                      {category.products.length === 1
                        ? 'producto'
                        : 'productos'}
                    </span>
                  </span>
                </td>
                <td className="text-right">
                  <details
                    className={`dropdown dropdown-end ${index === categories.length - 1 && categories.length > 1 ? 'dropdown-top' : ''}`}
                  >
                    <summary className={actionsButtonClass}>
                      <FiMoreHorizontal size={16} />
                      Acciones
                    </summary>
                    <ul className={menuPanelClass}>
                      <li>
                        <ButtonModal
                          idModal="update_category"
                          className={menuRowClass}
                          onClick={() => selectCategory(category)}
                        >
                          <FiEdit2 size={15} className="text-brand" />
                          Editar categoría
                        </ButtonModal>
                      </li>
                      <li>
                        <ButtonModal
                          idModal="delete_category"
                          className={menuDangerRowClass}
                          onClick={() => selectCategory(category)}
                        >
                          <FiTrash2 size={15} />
                          Eliminar categoría
                        </ButtonModal>
                      </li>
                    </ul>
                  </details>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
