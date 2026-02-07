import { RequestProductID } from '../../products/interface/response-productid';


type Props = {
  products: RequestProductID[];
}

export default function LatestProducts({  products }: Props) {
  return (
    <table className="table">
      <thead>
        <tr className="text-base-content/70 border-b-base-content/10">
          <th>Producto</th>
          <th>Categoría</th>
          <th>Precio</th>
          <th>Variantes</th>
        </tr>
      </thead>
      <tbody>
        {products.map((item) => (
          <tr key={item.id} className="hover:bg-base-100 transition-colors">
            <td>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12 bg-base-300">
                    <img
                      src={`${item.productImages[0]?.imageUrl}`}
                      alt="Producto"
                    />
                  </div>
                </div>
                <div>
                  <div className="font-bold">{item.productName}</div>
                  <div className="text-xs opacity-50">
                    {item.description.split(' ').slice(0, 5).join(' ')}...
                  </div>
                </div>
              </div>
            </td>
            <td>
              {item.categories.length > 0 ? (
                <span className="badge badge-soft badge-sm">
                  {item.categories[0].categoryName}
                </span>
              ) : (
                <span className="badge badge-ghost badge-sm">
                  Sin Categoría
                </span>
              )}
            </td>
            <td className="font-semibold text-primary">
              $ {new Intl.NumberFormat("es-ES").format(item.price)}
            </td>
            <td>
              {
                item.variants.length === 0 ? (
                  <span className="text-xs opacity-50">Sin variantes</span>
                ) : (
                  <span className="badge badge-accent badge-soft badge-sm">
                    {item.variants.length} variantes
                  </span>
                )
              }
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
