import { RequestProductID } from '../../products/interface/response-productid';
import CategoryBadge from '../../../shared/ui/CategoryBadge';
import PriceTag from '../../../shared/ui/PriceTag';
import EmptyState from '../../../shared/ui/EmptyState';

type Props = {
  products: RequestProductID[];
};

export default function LatestProducts({ products }: Props) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Producto</th>
          <th>Categoría</th>
          <th>Precio</th>
          <th>Variantes</th>
        </tr>
      </thead>
      <tbody>
        {products.length > 0 ? (
          products.map((item) => (
            <tr key={item.id}>
              <td>
                <div className="flex items-center gap-3">
                  <span className="block h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-cream p-1">
                    <img
                      src={`${item.productImages[0]?.imageUrl}`}
                      alt=""
                      className="h-full w-full object-contain mix-blend-darken"
                    />
                  </span>
                  <div className="min-w-0">
                    <div className="font-extrabold text-ink">
                      {item.productName}
                    </div>
                    <div className="max-w-56 truncate text-xs text-ink-muted">
                      {item.description}
                    </div>
                  </div>
                </div>
              </td>
              <td>
                {item.categories.length > 0 ? (
                  <CategoryBadge name={item.categories[0].categoryName} />
                ) : (
                  <span className="text-xs text-ink-muted">Sin categoría</span>
                )}
              </td>
              <td>
                <PriceTag price={item.price} />
              </td>
              <td>
                {item.variants.length === 0 ? (
                  <span className="text-xs text-ink-muted">Sin variantes</span>
                ) : (
                  <span className="rounded-full bg-lilac px-2.5 py-0.5 text-xs font-bold text-lilac-strong">
                    {item.variants.length}{' '}
                    {item.variants.length === 1 ? 'variante' : 'variantes'}
                  </span>
                )}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={4}>
              <EmptyState title="No se encontraron productos" />
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
