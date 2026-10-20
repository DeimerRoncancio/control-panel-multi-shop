import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { ToastContainer } from 'react-toastify';
import { FiPlus } from 'react-icons/fi';
import DetailsProduct from '../components/Details-product';
import { ListProducts } from '../components/List-products';
import SearchProducts from '../components/Search-poducts';
import axiosGetBearer from '../../../shared/requests/protectedRoutes/get';
import { Content } from '../interface/response-products';
import { ButtonModal } from '../../../shared/components/globalComponents/ButtonModal';
import Pagination from '../../../shared/components/globalComponents/Pagination';
import ModalProductCreate from '../components/create/Modal-create-product';
import ModalProductDelete from '../components/delete/Modal-delete-product';
import usePagination from '../../../shared/hooks/usePagination';
import PageHeader from '../../../shared/ui/PageHeader';
import { pageClass, primaryButtonClass } from '../../../shared/ui/styles';

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
        params: {
          page: Number(pagination.page),
          size: Number(pagination.size),
        },
      });
    },
  });

  return (
    <>
      <ModalProductCreate />
      <ModalProductDelete productId={productUpdate?.id || ''} />
      <div className={pageClass}>
        <PageHeader
          eyebrow="Catálogo"
          title="Productos"
          description="Crea, edita y organiza los productos de la tienda."
          actions={
            <ButtonModal
              idModal="create_product"
              className={primaryButtonClass}
            >
              <FiPlus size={16} />
              Crear producto
            </ButtonModal>
          }
        />
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
