import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import DetailsProduct from '../components/Details-product';
import { ListProducts } from '../components/List-products';
import SearchProducts from '../components/Search-poducts';
import axiosGetBearer from '../../../shared/requests/protectedRoutes/get';
import { Content } from '../interface/response-products';
import { ButtonModal } from '../../../shared/components/globalComponents/ButtonModal';
import Pagination from '../../../shared/components/globalComponents/Pagination';
import ModalProductCreate from '../components/create/Modal-create-product';
import ModalProductDelete from '../components/delete/Modal-delete-product';

function Products() {
  const [pagination, setPagination] = useState({ page: 0, size: 10 });
  const [productUpdate, setProductUpdate] = useState<Content | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['products', pagination],
    queryFn: async () => {
      const token = Cookies.get('accessToken');
      return axiosGetBearer({
        url: '/app/products?size=12&page=0',
        token: token || '',
      });
    },
  });

  return (
    <>
      <ModalProductCreate />
      <ModalProductDelete />
      <div className="p-6 text-white rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">Gestion de Productos</h1>
            <p className="mt-2 text-sm text-gray-400 mb-4">
              Administra los productos de la aplicacion.
            </p>
          </div>
          <ButtonModal idModal="create_product" className="btn btn-success">
            Crear Producto
          </ButtonModal>
        </div>
        <DetailsProduct totalProducts={data?.totalElements} />
        <SearchProducts />
        <ListProducts
          products={data?.content || []}
          isLoading={isLoading}
          setProductUpdate={setProductUpdate}
        />
        <Pagination
          pagination={pagination}
          setPagination={setPagination}
          data={data}
        />
      </div>
    </>
  );
}

export default Products;
