import { Link } from 'react-router';
import { FiEdit2, FiImage, FiMoreHorizontal, FiTrash2 } from 'react-icons/fi';
import { ButtonModal } from '../../../shared/components/globalComponents/ButtonModal';
import { Content } from '../interface/response-products';
import CategoryBadge from '../../../shared/ui/CategoryBadge';
import EmptyState from '../../../shared/ui/EmptyState';
import PriceTag from '../../../shared/ui/PriceTag';
import {
  actionsButtonClass,
  cardClass,
  menuDangerRowClass,
  menuPanelClass,
  menuRowClass,
} from '../../../shared/ui/styles';

type Props = {
  products: Content[];
  isLoading: boolean;
  setProductUpdate: React.Dispatch<React.SetStateAction<Content | null>>;
};

export function ListProducts({ products, isLoading, setProductUpdate }: Props) {
  return (
    <div className={`${cardClass} overflow-x-auto p-3`}>
      <table className="table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Categorías</th>
            <th>Precio</th>
            <th>Imágenes</th>
            <th>Variantes</th>
            <th className="text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 && !isLoading && (
            <tr>
              <td colSpan={6}>
                <EmptyState
                  title="No se encontraron productos"
                  description="Intenta ajustar los filtros de búsqueda."
                />
              </td>
            </tr>
          )}
          {isLoading ? (
            <tr>
              <td colSpan={6} className="py-10 text-center">
                <span className="loading loading-spinner loading-lg" />
              </td>
            </tr>
          ) : (
            products.map((product, index) => (
              <tr key={product.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <span className="block h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-cream p-1">
                      <img
                        src={`${product.productImages[0]?.imageUrl}`}
                        alt=""
                        className="h-full w-full object-contain mix-blend-darken"
                      />
                    </span>
                    <Link
                      className="line-clamp-2 max-w-56 font-extrabold text-ink transition-colors hover:text-brand"
                      to={`/products/${product.id}`}
                    >
                      {product.productName}
                    </Link>
                  </div>
                </td>
                <td>
                  <div className="flex max-w-56 flex-wrap gap-1">
                    {product?.categories
                      .slice(0, 2)
                      .map((category) => (
                        <CategoryBadge
                          key={category.categoryName}
                          name={category.categoryName}
                        />
                      ))}
                    {product.categories.length > 2 && (
                      <span className="rounded-full bg-cream px-2.5 py-0.5 text-xs font-bold text-ink-soft">
                        +{product.categories.length - 2} más
                      </span>
                    )}
                  </div>
                </td>
                <td>
                  <PriceTag price={product.price} />
                </td>
                <td>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-soft">
                    <FiImage size={16} className="text-ink-muted" />
                    {product.productImages.length}
                  </span>
                </td>
                <td>
                  {product.variants.length > 0 ? (
                    <span className="rounded-full bg-lilac px-2.5 py-0.5 text-xs font-bold text-lilac-strong">
                      {product.variants.length}{' '}
                      {product.variants.length === 1 ? 'variante' : 'variantes'}
                    </span>
                  ) : (
                    <span className="text-sm text-ink-muted">
                      Sin variantes
                    </span>
                  )}
                </td>
                <td className="text-right">
                  <details
                    className={`dropdown dropdown-end ${index === products.length - 1 && products.length > 1 ? 'dropdown-top' : ''}`}
                  >
                    <summary className={actionsButtonClass}>
                      <FiMoreHorizontal size={16} />
                      Acciones
                    </summary>
                    <ul className={menuPanelClass}>
                      <li>
                        <Link
                          to={`/products/${product.id}`}
                          className={menuRowClass}
                        >
                          <FiEdit2 size={15} className="text-brand" />
                          Editar producto
                        </Link>
                      </li>
                      <li>
                        <ButtonModal
                          onClick={() => setProductUpdate(product)}
                          idModal="delete_product"
                          className={menuDangerRowClass}
                        >
                          <FiTrash2 size={15} />
                          Eliminar producto
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
