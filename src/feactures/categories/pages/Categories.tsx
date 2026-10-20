import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { FiPlus } from 'react-icons/fi';
import ButtonModal from '../../../shared/components/globalComponents/ButtonModal';
import axiosGet from '../../../shared/requests/basicRequests/get';
import DetailsCategories from '../components/Details-categories';
import ListCategories from '../components/List-categories';
import SearchCategories from '../components/Search-categories';
import Pagination from '../../../shared/components/globalComponents/Pagination';
import { CategoriesRequest, Content } from '../interfaces/categories-response';
import ModalCreateCategory from '../components/Modal-create-category';
import ModalDeleteCategory from '../components/Modal-delete-category';
import usePagination from '../../../shared/hooks/usePagination';
import ModalUpdateCategory from '../components/Modal-update-category';
import PageHeader from '../../../shared/ui/PageHeader';
import { pageClass, primaryButtonClass } from '../../../shared/ui/styles';

function Categories() {
  const [categorySelected, setCategorySelected] = useState<Content>(
    {} as Content
  );
  const { pagination, setSearchParams } = usePagination();
  const { page, size } = pagination;

  const { data: categoriesData } = useQuery<CategoriesRequest>({
    queryKey: ['categories', page, size],
    queryFn: async () => {
      return axiosGet({
        url: '/app/categories',
        params: { page: Number(page), size: Number(size) },
      });
    },
  });

  const selectCategory = (category: Content) => setCategorySelected(category);

  return (
    <>
      <ModalCreateCategory />
      <ModalUpdateCategory category={categorySelected} />
      <ModalDeleteCategory category={categorySelected} />
      <div className={pageClass}>
        <PageHeader
          eyebrow="Catálogo"
          title="Categorías"
          description="Cada categoría tiene su color en la tienda y agrupa productos."
          actions={
            <ButtonModal
              idModal="create_category"
              className={primaryButtonClass}
            >
              <FiPlus size={16} />
              Crear categoría
            </ButtonModal>
          }
        />
        <DetailsCategories />
        <SearchCategories />
        <ListCategories
          categories={categoriesData?.content}
          selectCategory={selectCategory}
          isLoading={false}
        />
        <Pagination
          page={page}
          setPagination={setSearchParams}
          data={categoriesData}
        />
      </div>
      <ToastContainer />
    </>
  );
}

export default Categories;
