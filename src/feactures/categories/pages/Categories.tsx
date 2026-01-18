import { useQuery } from "@tanstack/react-query";
import ButtonModal from "../../../shared/components/globalComponents/ButtonModal";
import axiosGet from "../../../shared/requests/basicRequests/get";
import DetailsCategories from "../components/Details-categories";
import ListCategories from "../components/List-categories";
import SearchCategories from "../components/Search-categories";
import { useState } from "react";
import Pagination from "../../../shared/components/globalComponents/Pagination";
import { CategoriesRequest, Content } from "../interfaces/categories-response";
import ModalCreateCategory from "../components/Modal-create-category";
import { ToastContainer } from "react-toastify";
import ModalDeleteCategory from "../components/Modal-delete-category";
import usePagination from "../../../shared/hooks/usePagination";

function Categories() {
  const [categorySelected, setCategorySelected] = useState<Content>({} as Content);
  const { pagination, setSearchParams } = usePagination();

  const { data: categoriesData } = useQuery<CategoriesRequest>({
    queryKey: ['categories', pagination],
    queryFn: async () => {
      return axiosGet({
        url: '/app/categories',
        params: { page: Number(pagination.page), size: Number(pagination.size) }
      });
    }
  });

  const selectCategory = (category: Content) => setCategorySelected(category);

  return (
    <>
      <ModalCreateCategory />
      <ModalDeleteCategory category={categorySelected} />
      <div className="p-6 text-white rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">Gestion de Categorias</h1>
            <p className="mt-2 text-sm text-gray-400 mb-4">
              Administra las categorias de la aplicacion.
            </p>
          </div>
          <ButtonModal idModal="create_category" className="btn btn-success">
            Crear Categoria
          </ButtonModal>
        </div>
        <DetailsCategories />
        <SearchCategories />
        <ListCategories
          categories={categoriesData?.content}
          selectCategory={selectCategory}
          isLoading={false}
        />
        <Pagination
          page={pagination.page}
          setPagination={setSearchParams}
          data={categoriesData}
        />
      </div>
      <ToastContainer />
    </>
  );
}

export default Categories;
