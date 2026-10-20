import {
  SubmitHandler,
  useForm,
  UseFormSetValue,
  UseFormWatch,
  useWatch,
} from 'react-hook-form';
import VariantValues from '../variants/Variant-values';
import {
  VariantSchema,
  VariantType,
} from '../../../../shared/zod/products/variant.zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProductType } from '../../../../shared/zod/products/product.zod';
import { useState } from 'react';
import { initialValues } from '../../helpers/variant-initial-values';
import { FiLayers } from 'react-icons/fi';
import ModalHeader from '../../../../shared/ui/ModalHeader';
import {
  formFooterClass,
  inputClass,
  labelTextClass,
  outlineButtonClass,
  primaryButtonClass,
} from '../../../../shared/ui/styles';

type Props = {
  setValue: UseFormSetValue<ProductType>;
  watch: UseFormWatch<ProductType>;
};

export default function ModalCreateVariant({
  setValue: setProductValue,
  watch: productWatch,
}: Props) {
  const modal = document.getElementById('create_variant') as HTMLDialogElement;
  const [textValues, setTextValues] = useState<string[]>([]);
  const [colorValues, setColorValues] = useState<string[]>([]);

  const {
    control,
    reset,
    register,
    setValue,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<VariantType>({
    resolver: zodResolver(VariantSchema),
    defaultValues: initialValues,
  });

  const variants = productWatch('variants') || [];
  const type = useWatch({ name: 'type', control });

  const onSubmit: SubmitHandler<VariantType> = (data) => {
    setProductValue('variants', [...variants, data]);
    modal.close();
    setColorValues([]);
    setTextValues([]);
    reset();
  };

  const handleError = (clear?: boolean, val?: string) => {
    if (clear) {
      clearErrors('listValues');
      return;
    }
    setError('listValues', { type: 'manual', message: val });
  };

  const handleTextValue = (val?: string[]): string[] => {
    val && setTextValues([...val]);
    return textValues;
  };

  const handleColorValue = (val?: string[]): string[] => {
    val && setColorValues([...val]);
    return colorValues;
  };

  return (
    <dialog id="create_variant" className="modal">
      <div className="modal-box max-h-[95vh]">
        <ModalHeader
          icon={<FiLayers size={19} />}
          title="Nueva variante"
          description="Por ejemplo talla o color, con sus valores."
          onClose={() => {
            modal.close();
            reset();
          }}
        />
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <label className="flex flex-col">
            <span className={labelTextClass}>Nombre de la Variante</span>
            <input
              type="text"
              className={inputClass}
              placeholder="Ej: Color, Tamaño, Material"
              {...register('name')}
            />
            {errors.name && (
              <span className="mt-1 text-xs font-semibold text-error">
                {errors.name.message}
              </span>
            )}
          </label>
          <label className="flex flex-col">
            <span className={labelTextClass}>Tag de la Variante</span>
            <input
              type="text"
              className={inputClass}
              placeholder="Ej: color, size, material"
              {...register('tag')}
            />
            {errors.tag && (
              <span className="mt-1 text-xs font-semibold text-error">
                {errors.tag.message}
              </span>
            )}
          </label>
          <div>
            <label className="flex flex-col">
              <span className={labelTextClass}>Tipo de Variante</span>
              <select className={inputClass} {...register('type')}>
                <option value="select">Seleccionar</option>
                <option value="text">Texto</option>
                <option value="color">Color</option>
              </select>
            </label>
            {type === 'select' && (
              <p
                className={`mt-2 text-xs text-ink-muted ${errors.type && 'font-semibold text-error'}`}
              >
                Selecciona un tipo de variante
              </p>
            )}
            <VariantValues
              type={type}
              errors={handleError}
              setValue={setValue}
              handleTextValue={handleTextValue}
              handleColorValue={handleColorValue}
            />
          </div>
          {errors.listValues && type !== 'select' && (
            <span className="mt-1 text-xs font-semibold text-error">
              {errors.listValues.message}
            </span>
          )}
          <div className={formFooterClass}>
            <button
              type="button"
              className={outlineButtonClass}
              onClick={() => {
                modal.close();
                reset();
              }}
            >
              Cancelar
            </button>
            <button type="submit" className={primaryButtonClass}>
              Crear Variante
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button type="submit" onClick={() => reset()} />
      </form>
    </dialog>
  );
}
