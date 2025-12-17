import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SelectCategories } from '../components/update/Select-categories';
import { FormUpdate } from '../components/update/Form-update';
import { HeaderProduct } from '../components/update/Header-product';
import { UpdateImages } from '../components/update/Update-images';
// import { setValuesUpdateProduct } from '../helpers/set-values';
import ProductSchema, { ProductType } from '../../../shared/zod/products/update.zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ToastContainer } from 'react-toastify';
import useProducts from '../hooks/useProducts';
import { toUpdateProductType } from '../mappers/products.mapper';
import UpdateVariant from '../components/update/Update-variants';

export function ProductId() {
  const {
    control,
    watch,
    reset,
    register,
    setValue,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<ProductType>({ resolver: zodResolver(ProductSchema) });

  const {
    productData,
    categoriesData,
    categoriesLoading,
    imagesToRemove,
    handleRemoveImages,
    sendProduct 
  } = useProducts();

  const onSubmit: SubmitHandler<ProductType> = (data) => {
    sendProduct(data);
  }

  useEffect(() => {
    if (productData) reset(toUpdateProductType({ product: productData }));
  }, [productData, reset]);

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
              fieldErrors={errors}
            />
            <UpdateImages
              images={productData?.productImages || []}
              imagesToRemove={imagesToRemove}
              removeImages={handleRemoveImages}
              watch={watch}
              setValue={setValue}
            />

            <UpdateVariant variants={productData?.variants} />
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
