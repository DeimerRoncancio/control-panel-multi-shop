import {
  Control,
  Controller,
  FieldErrors,
  UseFormClearErrors,
  UseFormRegister,
} from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { FiAlertCircle } from 'react-icons/fi';
import { ProductType } from '../../../../shared/zod/products/product.zod';
import {
  cardClass,
  formSectionTitleClass,
  inputClass,
  labelTextClass,
} from '../../../../shared/ui/styles';

type FormUpdateProps = {
  control: Control<ProductType>;
  fieldErrors: FieldErrors<ProductType>;
  clearErrors: UseFormClearErrors<ProductType>;
  register: UseFormRegister<ProductType>;
};

function FieldError({ message }: { message?: string }) {
  if (!message) return null;

  return (
    <span className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-error">
      <FiAlertCircle size={13} />
      {message}
    </span>
  );
}

export function FormUpdate({
  control,
  fieldErrors,
  clearErrors,
  register,
}: FormUpdateProps) {
  const errorBorder = 'border-error focus:border-error focus:ring-error/15';

  return (
    <div className={`${cardClass} p-5 sm:p-6`}>
      <h2 className={formSectionTitleClass}>Información principal</h2>

      <div className="flex flex-col gap-4">
        <label htmlFor="product-name" className="flex flex-col">
          <span className={labelTextClass}>Nombre del producto</span>
          <input
            {...register('productName')}
            id="product-name"
            type="text"
            defaultValue="Mando X-BOX Series X"
            className={`${inputClass} ${fieldErrors.productName ? errorBorder : ''}`}
          />
          <FieldError message={fieldErrors.productName?.message} />
        </label>

        <label htmlFor="product-description" className="flex flex-col">
          <span className={labelTextClass}>Descripción</span>
          <textarea
            {...register('description')}
            id="product-description"
            className={`${inputClass} h-32 py-2.5 leading-relaxed ${fieldErrors.description ? errorBorder : ''}`}
            defaultValue="Mando personalizado, purpura para consola X-BOX"
          />
          <FieldError message={fieldErrors.description?.message} />
        </label>

        <label htmlFor="price" className="flex flex-col">
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
                  id="price"
                  thousandSeparator="."
                  decimalSeparator=","
                  decimalScale={2}
                  fixedDecimalScale
                  className={`${inputClass} pl-8 font-bold tabular-nums ${fieldErrors.price ? errorBorder : ''}`}
                  onValueChange={(values) => {
                    field.onChange(values.formattedValue);
                    clearErrors('price');
                  }}
                />
              )}
            />
          </div>
          <FieldError message={fieldErrors.price?.message} />
        </label>
      </div>
    </div>
  );
}
