import Cookies from 'js-cookie';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import axiosGetBearer from '../../../shared/requests/protectedRoutes/get';
import { CategoriesRequest } from '../../categories/interfaces/categories-response';
import { SelectCategories } from '../components/update/Select-categories';
import { FormUpdate } from '../components/update/Form-update';
import { HeaderProduct } from '../components/update/Header-product';
import { UpdateImages } from '../components/update/Update-images';
import { RequestProductID } from '../interface/response-productid';
// import { setValuesUpdateProduct } from '../helpers/set-values';
import UpdateProductSchema, { UpdateProductType } from '../../../shared/zod/products/update.zod';
import { zodResolver } from '@hookform/resolvers/zod';
import successAlert from '../../../shared/alerts/login/succes.alert';
import axiosPutBearer from '../../../shared/requests/protectedRoutes/put';
import envs from '../../../configs/envs';
import { errorAlert } from '../../../shared/alerts';
import { ToastContainer } from 'react-toastify';

export function ProductId() {
  const { id } = useParams();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const { data } = useQuery<RequestProductID>({
    queryKey: ['products'],
    queryFn: async () => {
      const token = Cookies.get('accessToken');
      return axiosGetBearer({
        url: `/app/products/${id}`,
        token: token || '',
      });
    },
  });

  const {
    reset,
    register,
    setValue,
    handleSubmit,
    clearErrors,
    control,
    formState: { errors },
  } = useForm<UpdateProductType>({
    resolver: zodResolver(UpdateProductSchema),
    defaultValues: {
      productName: data?.productName ? data.productName : '',
      description: data?.description ? data.description : '',
      price: data?.price ? data.price.toString() : '',
    },
  });

  const { data: categoriesData, isLoading: categoriesLoading } = useQuery<CategoriesRequest>({
    queryKey: ['categories'],
    queryFn: async () => {
      const token = Cookies.get('accessToken');
      return axiosGetBearer({
        url: '/app/categories',
        token: token || '',
        params: { page: 0, size: 20 }
      });
    },
  });

  const { mutate } = useMutation({
    mutationFn: axiosPutBearer,
    onSuccess: () => successAlert("Producto actualizado con éxito"),
    onError: (error: any) => errorAlert({ message: 'Error al actualizar el producto' + error.message }),
  });

  const onSubmit: SubmitHandler<UpdateProductType> = (data) => {
    const token = Cookies.get('accessToken');

    const priceString = data.price.toString();
    const lastSeparator = Math.max(priceString.lastIndexOf(","));
    const integerPart = priceString.slice(0, lastSeparator).replace(/\D/g, "");

    const requestData = {
      productName: data.productName,
      description: data.description,
      price: parseInt(integerPart),
      categoriesList: 'Gamer, Videojuegos',
      variantsList: 'talla-fc-barcelona-1',
    };

    mutate({
      url: `${envs.API}/app/products/${id}`,
      data: requestData,
      token: token || '',
    });
  };

  useEffect(() => {
    if (data) reset({
      productName: data.productName,
      description: data.description,
      price: data.price.toString(),
    });
  }, [data, setValue]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="min-h-screen transition-colors duration-300"
    >
      <ToastContainer />
      <div className="shadow-lg">
        <HeaderProduct />
      </div>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 space-y-6 rounded-lg flex flex-col">
            <FormUpdate
              clearErrors={clearErrors}
              control={control}
              register={register}
              handleSubmit={handleSubmit}
              fieldErrors={errors}
            />
            <UpdateImages images={data?.productImages || []} />
          </div>

          <SelectCategories
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            categoriesData={categoriesData}
            categoriesLoading={categoriesLoading}
            defectSelectedCategories={data?.categories || []}
          />
        </div>

        {/* Product Images Section */}
      </div>
    </form>
  );
}
