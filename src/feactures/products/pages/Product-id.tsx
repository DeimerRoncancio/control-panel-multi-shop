import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { SelectCategories } from '../components/update/Select-categories';
import { FormUpdate } from '../components/update/Form-update';
import { HeaderProduct } from '../components/update/Header-product';
import { UpdateImages } from '../components/update/Update-images';
// import { setValuesUpdateProduct } from '../helpers/set-values';
import UpdateProductSchema, { UpdateProductType } from '../../../shared/zod/products/update.zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ToastContainer } from 'react-toastify';
import useProducts from '../hooks/useProducts';
import { toUpdateProductType } from '../mappers/products.mapper';

export function ProductId() {
  const { productData, categoriesData, categoriesLoading, updateProduct } = useProducts();

  const {
    control,
    watch,
    reset,
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<UpdateProductType>({ resolver: zodResolver(UpdateProductSchema) });

  useEffect(() => {
    if (productData) reset(toUpdateProductType({ product: productData }));
  }, [productData, reset]);

  return (
    <form
      onSubmit={handleSubmit(updateProduct)}
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
              fieldErrors={errors}
            />
            <UpdateImages images={productData?.productImages || []} />
          </div>

          <SelectCategories
            watch={watch}
            register={register}
            categories={categoriesData}
            loading={categoriesLoading}
          />
        </div>
      </div>
    </form>
  );
}
