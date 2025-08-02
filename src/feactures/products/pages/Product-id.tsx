import Cookies from 'js-cookie';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import axiosGetBearer from '../../../shared/requests/protectedRoutes/get';
import { CategoriesRequest } from '../../categories/interfaces/categories-response';
import { SelectCategories } from '../components/update/Select-categories';
import { FormUpdate } from '../components/update/Form-update';
import { HeaderProduct } from '../components/update/Header-product';
import { UpdateImages } from '../components/update/Update-images';
import { setValuesUpdate } from '../../../shared/helpers/set-values-update';
import { RequestProductID } from '../interface/response-productid';
import { setValuesUpdateProduct } from '../helpers/set-values';

export function ProductId() {
  const { id } = useParams();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const { data, isLoading } = useQuery<RequestProductID>({
    queryKey: ['products'],
    queryFn: async () => {
      const token = Cookies.get('accessToken');
      return axiosGetBearer({
        url: `/app/products/${id}`,
        token: token || '',
      });
    },
  });

  const { data: categoriesData, isLoading: categoriesLoading } =
    useQuery<CategoriesRequest>({
      queryKey: ['categories'],
      queryFn: async () => {
        const token = Cookies.get('accessToken');
        return axiosGetBearer({
          url: '/app/categories',
          token: token || '',
        });
      },
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<RequestProductID>({
    defaultValues: {},
  });

  useEffect(() => {
    if (data) {
      setValuesUpdateProduct.forEach((value) => {
        const fieldValue = data[value];
        setValue(value, fieldValue === null ? '' : fieldValue.toString());
      });
    }
  }, [data, setValue]);

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="min-h-screen transition-colors duration-300"
    >
      <div className="shadow-lg">
        <HeaderProduct />
      </div>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 space-y-6 rounded-lg flex flex-col">
            <FormUpdate
              register={register}
              handleSubmit={handleSubmit}
              fieldErrors={errors}
            />
            <UpdateImages />
          </div>

          {/* Right Column - Categories */}
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
