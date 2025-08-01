import {
  FieldErrors,
  FieldValues,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';

export function FormUpdate({
  register,
  handleSubmit,
  formState: { errors },
}: {
  register: UseFormRegister<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues, FieldValues>;
  formState: FieldErrors<FieldValues>;
}) {
  return (
    <div className="xl:col-span-2 space-y-6 border rounded-lg border-gray-600 flex flex-col">
      <div className="card  shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-xl mb-6">Información Principal</h2>

          <div className="space-y-4">
            {/* Product Name */}
            <div className="form-control">
              <label htmlFor="product-name" className="flex flex-col">
                <span className="label-text text-start font-semibold">
                  Nombre del Producto *
                </span>
                <input
                  {...register('productName')}
                  id="product-name"
                  type="text"
                  defaultValue="Mando X-BOX Series X"
                  className="input input-bordered w-full "
                />
              </label>
            </div>

            {/* Description */}
            <div className="form-control">
              <label htmlFor="product-description" className="flex flex-col">
                <span className="label-text font-semibold">Descripción *</span>
                <textarea
                  {...register('productDescription')}
                  id="product-description"
                  className="textarea textarea-bordered h-32 w-full"
                  defaultValue="Mando personalizado, purpura para consola X-BOX"
                />
              </label>
            </div>

            {/* Price */}
            <div className="form-control">
              <label htmlFor="price" className="flex flex-col">
                <span className="label-text font-semibold">Precio (COP) *</span>
                <input
                  {...register('price', { valueAsNumber: true })}
                  id="price"
                  type="number"
                  defaultValue="190000"
                  className="input input-bordered w-full"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
