import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { Category } from "../../interface/response-products";
import ProductSchema, { ProductType } from "../../../../shared/zod/products/product.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ButtonModal from "../../../../shared/components/globalComponents/ButtonModal";
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ModalCreateVariant from "./Modal-create-variant";
import Cookies from "js-cookie";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosPostFormDataBearer from "../../../../shared/requests/protectedRoutes/post";
import successAlert from "../../../../shared/alerts/login/succes.alert";
import { errorAlert } from "../../../../shared/alerts";

type Props = {
  categories: Category[];
};

function ModalProductCreate({ categories }: Props) {
  const modal = document.getElementById("create_product") as HTMLDialogElement;

  const {
    control,
    reset,
    watch,
    setValue,
    register,
    clearErrors,
    formState: { errors },
    handleSubmit,
  } = useForm<ProductType>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      productName: '',
      description: '',
      price: '',
      categoriesList: [],
      images: [],
      variants: [],
    }
  });

  const newImages = watch("images");
  const queryClient = useQueryClient();

  const { mutate, isPending: loading } = useMutation({
    mutationFn: axiosPostFormDataBearer,
    onSuccess: (data) => {
      if (data?.status !== 200)
        return errorAlert({ message: 'No se pudo crear el producto' });

      successAlert("Producto creado con éxito");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      modal.close();
    }
  })

  const onSubmit: SubmitHandler<ProductType> = (data) => {
    const token = Cookies.get('accessToken');

    const lastSeparator = Math.max(data.price.lastIndexOf(","));
    const integerPart = data.price.slice(0, lastSeparator).replace(/\D/g, "");
    const formData = new FormData();

    formData.append('productName', data.productName);
    if (data.description) formData.append('description', data.description);
    formData.append('price', parseInt(integerPart).toString());
    formData.append('categoriesList', data.categoriesList.join(', '));
    data.images?.forEach((file) => formData.append('images', file));

    data.variants?.forEach((variant, index) => {
      if (variant.id) formData.append(`variants[${index}].id`, variant.id);
      formData.append(`variants[${index}].name`, variant.name);
      formData.append(`variants[${index}].tag`, variant.tag);
      formData.append(`variants[${index}].type`, variant.type);
      variant.listValues.forEach((value, valueIndex) => {
        formData.append(`variants[${index}].listValues[${valueIndex}]`, value);
      });
    });

    mutate({
      url: '/app/products',
      data: formData,
      token: token || '',
    });
  }

  return (
    <>
      <dialog id="create_product" className="modal">
        <div className="modal-box max-h-[95vh]">
          <h3 className="font-semibold text-lg">Crear Nuevo Producto</h3>
          <p className="mb-4 font-thin">Completa los datos del producto que deseas crear</p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 pr-1">
            <label htmlFor="product-name" className="flex flex-col">
              <span className="font-normal mb-3">
                Nombre del Producto
              </span>
              <input
                {...register('productName')}
                id="product-name"
                type="text"
                defaultValue=""
                placeholder="Ej: Mando X-BOX Series X"
                className="input input-bordered w-full bg-gray-700"
              />
              {errors.productName && (
                <p className="text-sm text-error">
                  {errors.productName.message}
                </p>
              )}
            </label>
            <label htmlFor="product-description" className="flex flex-col">
              <span className="mb-3">Descripción</span>
              <textarea
                {...register('description')}
                id="product-description"
                className="textarea textarea-bordered h-20 w-full bg-gray-700"
                placeholder="Describe las características del producto"
                style={errors.description && { borderColor: "#fb2c36" }}
              />
            </label>
            {errors.description && (
              <p className="mt-1 text-sm text-error">
                {errors.description.message}
              </p>
            )}
            <label htmlFor="price" className="flex flex-col">
              <span className="label-text font-normal mb-3">Precio (COP)</span>
              <div className="relative">
                <span className="absolute left-4 top-1/2 z-50 -translate-y-1/2 font-semibold text-white">
                  $
                </span>
                <Controller
                  name="price"
                  control={control}
                  render={({ field }) => (
                    <NumericFormat
                      {...field}
                      thousandSeparator="."
                      decimalSeparator=","
                      decimalScale={2}
                      fixedDecimalScale={true}
                      placeholder="00,0"
                      className="input input-bordered w-full pl-8 bg-gray-700"
                      onValueChange={(values) => {
                        field.onChange(values.formattedValue);
                        clearErrors('price');
                      }}
                    />
                  )}
                />
              </div>
            </label>
            {errors.price && (
              <p className="mt-1 text-sm text-error">
                {errors.price.message}
              </p>
            )}
            <div>
              <span>Categorías</span>
              <div className="grid grid-cols-1 mt-4 xl:grid-cols-2 max-h-50 overflow-y-auto rounded-lg">
                {categories?.map((category) => (
                  <label
                    htmlFor={`category-${category.categoryName}`}
                    key={category.categoryName}
                    className="label cursor-pointer justify-start gap-3 hover:bg-base-200 rounded-lg p-2 transition-colors"
                  >
                    <input
                      type="checkbox"
                      id={`category-${category.categoryName}`}
                      className="checkbox checkbox-primary bg-gray-700"
                      value={category.categoryName}
                      {...register('categoriesList')}
                    />
                    <span className="">{category.categoryName}</span>
                  </label>
                ))}
              </div>
            </div>
            {errors.categoriesList && (
              <p className="mt-1 text-sm text-error">
                {errors.categoriesList.message}
              </p>
            )}
            <div>
              <span>Imágenes del productos</span>
              <div className="grid mt-4 grid-cols-3 gap-6">
                <div className="aspect-square">
                  <label
                    htmlFor="new-image"
                    className="w-full h-full border-2 border-dashed border-gray-300 rounded-lg flex 
                  flex-col items-center justify-center cursor-pointer hover:border-primary 
                  hover:bg-primary/5 transition-all group"
                  >
                    <input
                      id="new-image"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      multiple
                      onChange={(e) => {
                        if (!e.target.files) return;
                        const currentFiles = watch("images") || [];
                        const newFiles = Array.from(e.target.files || []);
                        setValue("images", [...currentFiles, ...newFiles]);
                        e.target.value = "";
                      }}
                    />
                    <div className="text-center">
                      <div className="mb-3 group-hover:scale-110 transition-transform ">
                        <svg className="w-12 h-12 mx-auto text-gray-400 group-hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      </div>
                      <p className="text-sm font-medium text-gray-600 group-hover:text-primary mb-1">
                        Agregar imagen
                      </p>
                      <p className="text-xs text-gray-400">PNG, JPG hasta 10MB</p>
                    </div>
                  </label>
                </div>
                {newImages?.map((file, index) => (
                  <div className="relative group" key={file.name}>
                    <div className="aspect-square bg-gray-100 rounded-lg outline-2 outline-success
                  overflow-hidden transition-colors">
                      <img
                        src={URL.createObjectURL(file)}
                        alt="Imagen del producto"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute hover:opacity-100 opacity-0 inset-0 flex items-center 
                    justify-center gap-2 transition-all z-100">
                        <div className="absolute bg-[#1c1c1c7c] h-full w-full -z-10 rounded-lg"></div>
                        <button className="btn btn-sm btn-error" onClick={(evt) => {
                          evt.preventDefault();
                          const currentFiles = watch("images") || [];
                          setValue("images", currentFiles.filter((_, i) => i !== index));
                        }}>
                          <MdDelete size={20} />
                        </button>
                        <ButtonModal idModal="" className="btn btn-sm btn-primary">
                          <FaEye size={20} />
                        </ButtonModal>
                      </div>
                    </div>
                    {/* Badge de imagen */}
                    <div className="badge badge-neutral badge-sm absolute bottom-2 left-2 w-[122px] overflow-hidden">
                      <div className="truncate">{file.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {errors.images && (
              <p className="mt-1 text-sm text-error">
                {errors.images.message}
              </p>
            )}

            {/* Variantes */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="font-normal">Variantes del producto</span>
                <ButtonModal
                  idModal="create_variant"
                  className="btn btn-sm btn-primary btn-outline"
                >
                  Agregar Variante
                </ButtonModal>
              </div>

              <div className="space-y-3">
                {watch('variants')?.map((variant, index) => (
                  <div
                    key={index}
                    className="collapse collapse-arrow bg-base-200 border border-base-300"
                  >
                    <input type="checkbox" />
                    <div className="collapse-title flex justify-between items-center pr-12">
                      <span className="font-medium">
                        {variant.name} <span className="text-xs font-normal opacity-70">({variant.type})</span>
                      </span>
                    </div>
                    <div className="collapse-content flex flex-col gap-2">
                      <div className="flex gap-2 text-sm text-gray-400">
                        <span>Tag: {variant.tag}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {variant.listValues.map((val) => (
                          <span key={val} className="badge badge-neutral">
                            {variant.type === 'color' ? (
                              <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: val }}></div>
                            ) : null}
                            {val}
                          </span>
                        ))}
                      </div>
                      <div className="flex justify-end mt-2">
                        <button
                          type="button"
                          onClick={() => {
                            const current = watch('variants') || [];
                            setValue('variants', current.filter((_, i) => i !== index));
                          }}
                          className="btn btn-xs btn-error btn-outline self-end"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {(!watch('variants') || watch('variants')?.length === 0) && (
                  <div className="text-gray-500 text-sm italic py-4 text-center bg-base-200/50 rounded-lg">
                    No hay variantes agregadas
                  </div>
                )}
              </div>
              {errors.variants && (
                <p className="mt-1 text-sm text-error">
                  {errors.variants.message}
                </p>
              )}
            </div>

            <div className="modal-action grid grid-cols-2 gap-4 mt-15">
              <button type="button" className="btn btn-error btn-outline"
                onClick={() => {
                  reset();
                  modal.close();
                }
                }>
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? (
                  <span className="loading loading-spinner loading-sm" />
                ) : (
                  'Crear Producto'
                )}
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop" onClick={() => reset()}>
          <button type="submit">cerrar</button>
        </form>
      </dialog>
      <ModalCreateVariant setValue={setValue} watch={watch} />
    </>
  );
}

export default ModalProductCreate;
