import { FaPencilAlt } from 'react-icons/fa';
import { CiImageOn } from 'react-icons/ci';
import { Link } from 'react-router';
import { ButtonModal } from '../../../shared/components/globalComponents/ButtonModal';
import { Content } from '../interface/response-products';

export function ListProducts({
  products,
  isLoading,
  setProductUpdate,
}: {
  products: Content[];
  isLoading: boolean;
  setProductUpdate: React.Dispatch<React.SetStateAction<Content | null>>;
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-600 p-4 shadow">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Producto</th>
            <th>Categorías</th>
            <th>Precio</th>
            <th>Imagenes</th>
            <th>Descripción</th>
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
            products.map((product) => (
              <tr key={product.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <ButtonModal
                      onClick={() => setProductUpdate(product)}
                      idModal="user_avatar"
                      className="avatar relative group cursor-pointer"
                    >
                      <div className="mask mask-squircle h-12 w-12 relative overflow-hidden">
                        <img
                          src={`${product.productImages[0]?.imageUrl}`}
                          alt="Avatar Tailwind CSS Component"
                          className="transition-all duration-200 group-hover:blur-sm"
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <FaPencilAlt className="text-white text-lg drop-shadow-lg" />
                        </div>
                      </div>
                    </ButtonModal>
                    <div>
                      <Link
                        className="font-bold hover:underline"
                        to={`/products/${product.id}`}
                      >
                        {`${product?.productName ?? ''}`}
                      </Link>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="flex flex-col gap-1">
                    {product?.categories.map((category) => (
                      <span
                        key={category.categoryName}
                        className="text-sm badge badge-info p-2 rounded-lg"
                      >
                        {category.categoryName}
                      </span>
                    ))}
                  </div>
                </td>
                <td>$ {product?.price ? product.price : 'No price'}</td>
                <td>
                  <div className="flex gap-2">
                    <CiImageOn size={20} /> {product.productImages.length}
                  </div>
                </td>
                <td>
                  <div className="text-sm text-gray-400">
                    {product.description.slice(0, 30)}...
                  </div>
                </td>
                <th>
                  <details className="dropdown">
                    <summary className="btn m-1">Detalles</summary>
                    <ul className="menu dropdown-content bg-base-100 rounded-box z-1 p-2 shadow-sm w-36">
                      <li>
                        <Link
                          to={`/products/${product.id}`}
                          className="text-[12px] btn btn-primary btn-sm"
                        >
                          Actualizar Producto
                        </Link>
                      </li>
                      <li>
                        <ButtonModal
                          onClick={() => setProductUpdate(product)}
                          idModal="delete_product"
                          className="text-sm btn-sm btn-warning"
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
        {/* foot */}
        <tfoot>
          <tr>
            <th>Producto</th>
            <th>Categorías</th>
            <th>Precio</th>
            <th>Imagenes</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
