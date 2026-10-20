import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import ProductSchema, {
  ProductType,
} from '../../../../shared/zod/products/product.zod';
import { zodResolver } from '@hookform/resolvers/zod';
import ButtonModal from '../../../../shared/components/globalComponents/ButtonModal';
import {
  FiBox,
  FiCheck,
  FiEye,
  FiPlus,
  FiTrash2,
  FiUploadCloud,
} from 'react-icons/fi';
import ModalCreateVariant from './Modal-create-variant';
import Cookies from 'js-cookie';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosPostFormDataBearer from '../../../../shared/requests/protectedRoutes/post';
import successAlert from '../../../../shared/alerts/login/succes.alert';
import { errorAlert } from '../../../../shared/alerts';
import axiosGetBearer from '../../../../shared/requests/protectedRoutes/get';
import { CategoriesRequest } from '../../../categories/interfaces/categories-response';
import ModalHeader from '../../../../shared/ui/ModalHeader';
import { categoryStyle } from '../../../../shared/helpers/category-color';
import {
  formSectionTitleClass,
  inputClass,
  labelTextClass,
  outlineButtonClass,
  primaryButtonClass,
} from '../../../../shared/ui/styles';

function ModalProductCreate() {
  const modal = document.getElementById('create_product') as HTMLDialogElement;

  const { data: requestCategories } = useQuery<CategoriesRequest>({
    queryKey: ['categories'],
    queryFn: async () => {
      const token = Cookies.get('accessToken');
      return axiosGetBearer({
        url: '/app/categories',
        token: token || '',
        params: { page: 0, size: 20 },
      });
    },
  });

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
    },
  });

  const newImages = watch('images');
  const queryClient = useQueryClient();

  const { mutate, isPending: loading } = useMutation({
    mutationFn: axiosPostFormDataBearer,
    onSuccess: (data) => {
      if (data?.status !== 200)
        return errorAlert({ message: 'No se pudo crear el producto' });

      successAlert('Producto creado con éxito');
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['latest-products'] });
      modal.close();
    },
  });

  const onSubmit: SubmitHandler<ProductType> = (data) => {
    const token = Cookies.get('accessToken');

    const lastSeparator = Math.max(data.price.lastIndexOf(','));
    const integerPart =
      lastSeparator !== -1
        ? data.price.slice(0, lastSeparator).replace(/\D/g, '')
        : data.price;

    const formData = new FormData();

    formData.append('productName', data.productName);
    if (data.description) formData.append('description', data.description);
    formData.append('price', parseInt(integerPart).toString());
    // Spring arma la List<String> con el parámetro repetido; mandarlo unido
    // por comas rompe cualquier categoría que lleve una coma en el nombre.
    data.categoriesList.forEach((category) =>
      formData.append('categoriesList', category)
    );
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
  };

  const closeModal = () => {
    reset();
    modal.close();
  };

  const errorText =
    'mt-1 flex items-center gap-1.5 text-xs font-semibold text-error';

  return (
    <>
      <dialog id="create_product" className="modal">
        <div className="modal-box max-h-[95vh] w-full max-w-3xl">
          <ModalHeader
            icon={<FiBox size={20} />}
            title="Nuevo producto"
            description="Completa los datos, elige categorías y sube al menos una foto."
            onClose={closeModal}
          />
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <section className="flex flex-col gap-4">
              <h4 className={formSectionTitleClass}>Información principal</h4>
              <label htmlFor="new-product-name" className="flex flex-col">
                <span className={labelTextClass}>Nombre del producto</span>
                <input
                  {...register('productName')}
                  id="new-product-name"
                  type="text"
                  defaultValue=""
                  placeholder="Ej: Mando X-BOX Series X"
                  className={inputClass}
                />
                {errors.productName && (
                  <p className={errorText}>{errors.productName.message}</p>
                )}
              </label>
              <label
                htmlFor="new-product-description"
                className="flex flex-col"
              >
                <span className={labelTextClass}>Descripción</span>
                <textarea
                  {...register('description')}
                  id="new-product-description"
                  className={`${inputClass} h-24 py-2.5 leading-relaxed ${errors.description ? 'border-error' : ''}`}
                  placeholder="Describe las características del producto"
                />
                {errors.description && (
                  <p className={errorText}>{errors.description.message}</p>
                )}
              </label>
              <label htmlFor="new-product-price" className="flex flex-col">
                <span className={labelTextClass}>Precio (COP)</span>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3.5 top-1/2 z-10 -translate-y-1/2 text-sm font-extrabold text-ink">
                    $
                  </span>
                  <Controller
                    name="price"
                    control={control}
                    render={({ field }) => (
                      <NumericFormat
                        {...field}
                        id="new-product-price"
                        thousandSeparator="."
                        decimalSeparator=","
                        decimalScale={2}
                        fixedDecimalScale
                        placeholder="0,00"
                        className={`${inputClass} pl-8 font-bold tabular-nums`}
                        onValueChange={(values) => {
                          field.onChange(values.formattedValue);
                          clearErrors('price');
                        }}
                      />
                    )}
                  />
                </div>
                {errors.price && (
                  <p className={errorText}>{errors.price.message}</p>
                )}
              </label>
            </section>

            <section>
              <h4 className={formSectionTitleClass}>Categorías</h4>
              <div className="grid max-h-52 grid-cols-1 gap-2 overflow-y-auto sm:grid-cols-2">
                {requestCategories?.content?.map((category) => (
                  <label
                    htmlFor={`new-category-${category.categoryName}`}
                    key={category.categoryName}
                    style={categoryStyle(category.categoryName)}
                    className="flex cursor-pointer items-center gap-3 rounded-lg border border-line px-3.5 py-2.5 text-sm transition-colors hover:border-ink-muted has-checked:border-(--cat) has-checked:bg-(--cat-soft)"
                  >
                    <input
                      type="checkbox"
                      id={`new-category-${category.categoryName}`}
                      className="peer sr-only"
                      value={category.categoryName}
                      {...register('categoriesList')}
                    />
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-md border-2 border-line bg-base-100 text-transparent transition-colors peer-checked:border-(--cat) peer-checked:bg-(--cat) peer-checked:text-white">
                      <FiCheck size={13} strokeWidth={3.5} />
                    </span>
                    <span className="flex-1 font-bold text-ink">
                      {category.categoryName}
                    </span>
                    <span className="h-2.5 w-2.5 rounded-full bg-(--cat)" />
                  </label>
                ))}
              </div>
              {errors.categoriesList && (
                <p className={errorText}>{errors.categoriesList.message}</p>
              )}
            </section>

            <section>
              <h4 className={formSectionTitleClass}>Imágenes del producto</h4>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <label
                  htmlFor="new-image"
                  className="group flex aspect-square cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-line p-3 text-center transition-colors hover:border-brand hover:bg-brand-soft/50"
                >
                  <input
                    id="new-image"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      if (!e.target.files) return;
                      const currentFiles = watch('images') || [];
                      const newFiles = Array.from(e.target.files || []);
                      setValue('images', [...currentFiles, ...newFiles]);
                      e.target.value = '';
                    }}
                  />
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-cream text-ink transition-colors group-hover:bg-brand group-hover:text-white">
                    <FiUploadCloud size={18} />
                  </span>
                  <span className="text-sm font-bold text-ink group-hover:text-brand">
                    Agregar imagen
                  </span>
                  <span className="text-[11px] text-ink-muted">
                    PNG, JPG hasta 10 MB
                  </span>
                </label>
                {newImages?.map((file, index) => (
                  <div className="group" key={file.name}>
                    <div className="relative aspect-square overflow-hidden rounded-xl border border-success bg-cream">
                      <img
                        src={URL.createObjectURL(file)}
                        alt=""
                        className="h-full w-full object-contain mix-blend-darken"
                      />
                      {index === 0 && (
                        <span className="absolute left-2 top-2 rounded-full bg-brand px-2 py-0.5 text-[10px] font-extrabold uppercase text-white">
                          Portada
                        </span>
                      )}
                      <div className="absolute inset-0 flex items-center justify-center gap-2 bg-ink/45 opacity-0 transition-opacity group-hover:opacity-100">
                        <button
                          type="button"
                          aria-label="Quitar imagen"
                          className="grid h-9 w-9 place-items-center rounded-full bg-base-100 text-ink transition-colors hover:bg-error hover:text-white"
                          onClick={(evt) => {
                            evt.preventDefault();
                            const currentFiles = watch('images') || [];
                            setValue(
                              'images',
                              currentFiles.filter((_, i) => i !== index)
                            );
                          }}
                        >
                          <FiTrash2 size={16} />
                        </button>
                        <ButtonModal
                          idModal=""
                          className="grid h-9 w-9 place-items-center rounded-full bg-base-100 text-ink transition-colors hover:bg-brand hover:text-white"
                        >
                          <FiEye size={16} />
                        </ButtonModal>
                      </div>
                    </div>
                    <p className="mt-1.5 truncate text-xs font-semibold text-ink-muted">
                      {file.name}
                    </p>
                  </div>
                ))}
              </div>
              {errors.images && (
                <p className={errorText}>{errors.images.message}</p>
              )}
            </section>

            <section>
              <div className="mb-3 flex items-center justify-between gap-3">
                <h4 className={`${formSectionTitleClass} mb-0`}>
                  Variantes del producto
                </h4>
                <ButtonModal
                  idModal="create_variant"
                  className={`${outlineButtonClass} h-9 px-4`}
                >
                  <FiPlus size={15} />
                  Agregar variante
                </ButtonModal>
              </div>

              <div className="flex flex-col gap-2">
                {watch('variants')?.map((variant, index) => (
                  <div
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    className="flex items-start justify-between gap-3 rounded-xl border border-line p-3"
                  >
                    <div className="min-w-0">
                      <p className="flex flex-wrap items-center gap-2">
                        <span className="font-extrabold text-ink">
                          {variant.name}
                        </span>
                        <span className="rounded-full bg-lilac px-2 py-0.5 text-[11px] font-bold text-lilac-strong">
                          {variant.type === 'color' ? 'Color' : 'Texto'}
                        </span>
                        <span className="text-xs text-ink-muted">
                          Etiqueta: {variant.tag}
                        </span>
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {variant.listValues.map((val) => (
                          <span
                            key={val}
                            className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-0.5 text-xs font-bold text-ink"
                          >
                            {variant.type === 'color' && (
                              <span
                                className="h-3.5 w-3.5 rounded-full ring-1 ring-line"
                                style={{ backgroundColor: val }}
                              />
                            )}
                            {val}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button
                      type="button"
                      aria-label="Quitar variante"
                      onClick={() => {
                        const current = watch('variants') || [];
                        setValue(
                          'variants',
                          current.filter((_, i) => i !== index)
                        );
                      }}
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-ink-soft transition-colors hover:bg-error/10 hover:text-error"
                    >
                      <FiTrash2 size={15} />
                    </button>
                  </div>
                ))}
                {(!watch('variants') || watch('variants')?.length === 0) && (
                  <p className="rounded-xl border-2 border-dashed border-line py-4 text-center text-sm font-semibold text-ink-muted">
                    No hay variantes agregadas
                  </p>
                )}
              </div>
              {errors.variants && (
                <p className={errorText}>{errors.variants.message}</p>
              )}
            </section>

            <div className="flex flex-wrap justify-end gap-2.5 border-t border-line pt-4">
              <button
                type="button"
                className={outlineButtonClass}
                onClick={closeModal}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className={`${primaryButtonClass} min-w-40`}
                disabled={loading}
              >
                {loading ? (
                  <span className="loading loading-spinner loading-sm text-white" />
                ) : (
                  'Crear producto'
                )}
              </button>
            </div>
          </form>
        </div>
        <form
          method="dialog"
          className="modal-backdrop"
          onClick={() => reset()}
        >
          <button type="submit">cerrar</button>
        </form>
      </dialog>
      <ModalCreateVariant setValue={setValue} watch={watch} />
    </>
  );
}

export default ModalProductCreate;
