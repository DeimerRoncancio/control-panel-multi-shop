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
import axiosGet from '../../../shared/requests/basicRequests/get';
import { ToastContainer } from 'react-toastify';
import usePagination from '../../../shared/hooks/usePagination';

function Products() {
  const [productUpdate, setProductUpdate] = useState<Content | null>(null);
  const { pagination, setSearchParams } = usePagination();

  const { data, isLoading } = useQuery({
    queryKey: ['products', pagination],
    queryFn: async () => {
      const token = Cookies.get('accessToken');
      return axiosGetBearer({
        url: '/app/products',
        token: token || '',
        params: { page: Number(pagination.page), size: Number(pagination.size) }
      });
    },
  });

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      return axiosGet({
        url: '/app/categories',
      });
    }
  });

  return (
    <>
      <ModalProductCreate categories={categoriesData?.content || []} />
      <ModalProductDelete productId={productUpdate?.id || ''} />
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
        <DetailsProduct />
        <SearchProducts />
        <ListProducts
          products={data?.content || []}
          isLoading={isLoading}
          setProductUpdate={setProductUpdate}
        />
        <Pagination
          page={pagination.page}
          setPagination={setSearchParams}
          data={data}
        />
      </div>
      <ToastContainer />
    </>
  );
}

export default Products;
