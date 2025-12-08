import {
  Control,
  Controller,
  FieldErrors,
  UseFormClearErrors,
  UseFormRegister,
} from 'react-hook-form';
import { UpdateProductType } from '../../../../shared/zod/products/update.zod';
import { NumericFormat } from "react-number-format";

type FormUpdateProps = {
  control: Control<UpdateProductType>;
  fieldErrors: FieldErrors<UpdateProductType>;
  clearErrors: UseFormClearErrors<UpdateProductType>;
  register: UseFormRegister<UpdateProductType>;
};

export function FormUpdate({ control, fieldErrors, clearErrors, register }: FormUpdateProps) {
  return (
    <div className="xl:col-span-2 space-y-6 border rounded-lg border-gray-600 flex flex-col">
      <div className="card  shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-xl">Información Principal</h2>

          <div className="space-y-4">
            <div className="form-control">
              <label htmlFor="product-name" className="flex flex-col">
                <span className="label-text text-start font-semibold mb-3">
                  Nombre del Producto
                </span>
                <input
                  {...register('productName')}
                  id="product-name"
                  type="text"
                  defaultValue="Mando X-BOX Series X"
                  className="input input-bordered w-full"
                  style={ fieldErrors.productName && { borderColor: "#fb2c36" } }
                />
                {fieldErrors.productName && (
                  <span className="text-red-500 text-sm mt-1">
                    {fieldErrors.productName.message}
                  </span>
                )}
              </label>
            </div>

            <div className="form-control">
              <label htmlFor="product-description" className="flex flex-col">
                <span className="label-text font-semibold mb-3">Descripción</span>
                <textarea
                  {...register('description')}
                  id="product-description"
                  className="textarea textarea-bordered h-32 w-full"
                  defaultValue="Mando personalizado, purpura para consola X-BOX"
                  style={ fieldErrors.description && { borderColor: "#fb2c36" } }
                />
                {fieldErrors.description && (
                  <span className="text-red-500 text-sm mt-1">
                    {fieldErrors.description.message}
                  </span>
                )}
              </label>
            </div>

            <div className="form-control">
              <label htmlFor="price" className="flex flex-col">
                <span className="label-text font-semibold mb-3">Precio (COP)</span>
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
                        className="input input-bordered w-full pl-8"
                        style={fieldErrors.price && { borderColor: '#fb2c36' }}
                        onValueChange={(values) => {
                          field.onChange(values.formattedValue);
                          clearErrors('price');
                        }}
                      />
                    )}
                  />
                </div>
                {fieldErrors.price && (
                  <span className="text-red-500 text-sm mt-1">
                    {fieldErrors.price.message}
                  </span>
                )}
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
