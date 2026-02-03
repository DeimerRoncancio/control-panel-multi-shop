import ButtonModal from "../../../shared/components/globalComponents/ButtonModal";
import { Content } from "../interfaces/categories-response";
import { AiFillProduct } from "react-icons/ai";
import { IoPricetagsOutline } from "react-icons/io5";

type Props = {
  isLoading: boolean;
  categories: Content[] | undefined;
  selectCategory: (category: Content) => void;
}

export default function ListCategories({ categories, isLoading, selectCategory }: Props) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-600 p-4 shadow">
      <table className="table">
        <thead>
          <tr>
            <th>Nombre de categoria</th>
            <th>Productos de categoria</th>
            <th>Productos totales</th>
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
            categories?.map((category, index) => (
              <tr key={category.id}>
                <td>
                  <p className="flex items-center gap-2">
                    <IoPricetagsOutline size={20} />
                    {category.categoryName}
                  </p>
                </td>
                <td>
                  <div className="w-80 h-full flex flex-wrap gap-2">
                    {category.products.slice(0, 3).map((product) => (
                      <div key={product.id} className="badge badge-primary">{product.productName}</div>
                    ))}
                    {category.products.length > 3
                      && <div className="badge badge-secondary">+{category.products.length - 3} más</div>}
                    {category.products.length === 0 && <p className="text-gray-400">No hay productos</p>}
                  </div>
                </td>
                <td>
                  <p className="flex items-center gap-2">
                    <AiFillProduct size={20} />
                    {category.products.length < 1 ? 'Sin' : category.products.length}
                    {' '} Producto(s)
                  </p>
                </td>
                <td>
                  <details className={`dropdown dropdown-center ${categories.length == 1 && 'dropdown-left'}
                  ${index === categories.length - 1 && 'dropdown-top'}`}>
                    <summary className="btn m-1">Detalles</summary>
                    <ul className="menu dropdown-content bg-base-100 border border-gray-700 rounded-box z-1
                    p-2 shadow-sm w-36 gap-2">
                      <li>
                        <ButtonModal
                          idModal="update_category"
                          className="text-xs btn btn-sm btn-warning"
                          onClick={() => selectCategory(category)}
                        >
                          Editar Categoria
                        </ButtonModal>
                      </li>
                      <li>
                        <ButtonModal
                          idModal="delete_category"
                          className="text-xs btn btn-sm btn-error"
                          onClick={() => selectCategory(category)}
                        >
                          Eliminar Categoria
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