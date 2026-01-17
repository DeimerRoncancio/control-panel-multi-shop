import { useQuery } from "@tanstack/react-query";
import ButtonModal from "../../../shared/components/globalComponents/ButtonModal";
import axiosGet from "../../../shared/requests/basicRequests/get";
import DetailsCategories from "../components/Details-categories";
import ListCategories from "../components/List-categories";
import SearchCategories from "../components/Search-categories";
import { useState } from "react";
import Pagination from "../../../shared/components/globalComponents/Pagination";
import { CategoriesRequest } from "../interfaces/categories-response";
import ModalCreateCategory from "../components/Modal-create-category";
import { ToastContainer } from "react-toastify";

function Categories() {
  const [pagination, setPagination] = useState({ page: 0, size: 10 });

  const { data: categoriesData } = useQuery<CategoriesRequest>({
    queryKey: ['categories'],
    queryFn: async () => {
      return axiosGet({
        url: '/app/categories',
      });
    }
  });

  return (
    <>
      <ModalCreateCategory />
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
        <ListCategories categories={categoriesData?.content} isLoading={false} />
        <Pagination
          pagination={pagination}
          setPagination={setPagination}
          data={categoriesData}
        />
      </div>
      <ToastContainer />
    </>
  );
}

export default Categories;
