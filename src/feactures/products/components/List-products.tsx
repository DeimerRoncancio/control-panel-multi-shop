import { CiImageOn } from 'react-icons/ci';
import { Link } from 'react-router';
import { ButtonModal } from '../../../shared/components/globalComponents/ButtonModal';
import { Content } from '../interface/response-products';

type Props = {
  products: Content[];
  isLoading: boolean;
  setProductUpdate: React.Dispatch<React.SetStateAction<Content | null>>;
}

export function ListProducts({ products, isLoading, setProductUpdate }: Props) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-600 p-4 shadow">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Producto</th>
            <th>Primeras categorías</th>
            <th>Precio</th>
            <th>Imagenes</th>
            <th>Variantes</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={4} className="text-center">
                <span className="loading loading-spinner loading-lg" />
              </td>
            </tr>
          ) : (
            products.map((product, index) => (
              <tr key={product.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar relative">
                      <div className="mask mask-squircle h-12 w-12 relative overflow-hidden">
                        <img
                          src={`${product.productImages[0]?.imageUrl}`}
                          alt="Avatar Tailwind CSS Component"
                          className="transition-all duration-200"
                        />
                      </div>
                    </div>
                    <div>
                      <Link
                        className="font-bold hover:underline w-48"
                        to={`/products/${product.id}`}
                      >
                        {product.productName}
                      </Link>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="flex flex-col gap-1">
                    {product?.categories.slice(0, 2).map((category) => (
                      <span
                        key={category.categoryName}
                        className="text-sm badge badge-primary p-2 rounded-lg max-w-[120px]"
                      >
                        <p className="truncate">
                          {category.categoryName}
                        </p> 
                      </span>
                    ))}
                    {product.categories.length > 2 && (
                      <span className="text-sm badge badge-secondary p-2 rounded-lg">
                        +{product.categories.length - 2} más
                      </span>
                    )}
                  </div>
                </td>
                <td className='w-28'>$ {new Intl.NumberFormat("es-ES").format(product.price)}</td>
                <td>
                  <div className="flex gap-2">
                    <CiImageOn size={20} /> {product.productImages.length}
                  </div>
                </td>
                <td>
                  <div className="text-sm text-gray-400">
                    {product.variants.length > 0 ? (
                      <span className='badge badge-primary badge-soft'>{product.variants.length} variantes</span>
                    ) : (
                      <span className='text-sm'>No hay variantes</span>
                    )}
                  </div>
                </td>
                <th>
                  <details className={`dropdown dropdown-center ${products.length == 1 && 'dropdown-left'}
                  ${index === products.length - 1 && 'dropdown-top'}`}>
                    <summary className="btn m-1">Detalles</summary>
                    <ul className="menu dropdown-content bg-base-100 border border-gray-700 rounded-box z-1
                    p-2 shadow-sm w-36 gap-2">
                      <li>
                        <Link
                          to={`/products/${product.id}`}
                          className="text-[12px] btn btn-sm"
                        >
                          Editar Producto
                        </Link>
                      </li>
                      <li>
                        <ButtonModal
                          onClick={() => setProductUpdate(product)}
                          idModal="delete_product"
                          className="text-xs btn btn-sm btn-error"
                        >
                          Eliminar Producto
                        </ButtonModal>
                      </li>
                    </ul>
                  </details>
                </th>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
