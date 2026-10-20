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
import { ProductType } from '../../../../shared/zod/products/product.zod';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { toVariantType } from '../../mappers/products.mapper';
import { FiEdit2 } from 'react-icons/fi';
import ModalHeader from '../../../../shared/ui/ModalHeader';
import {
  formFooterClass,
  inputClass,
  labelTextClass,
  outlineButtonClass,
  primaryButtonClass,
} from '../../../../shared/ui/styles';

type Props = {
  variant: VariantType;
  setValue: UseFormSetValue<ProductType>;
  watch: UseFormWatch<ProductType>;
};

export default function ModalUpdateVariant({
  variant,
  setValue: setProductValue,
  watch: productWatch,
}: Props) {
  const modal = document.getElementById('update_variant') as HTMLDialogElement;
  const [textValues, setTextValues] = useState<string[]>([]);
  const [colorValues, setColorValues] = useState<string[]>([]);

  const {
    control,
    reset,
    setError,
    clearErrors,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<VariantType>({
    resolver: zodResolver(VariantSchema),
  });

  const type = useWatch({ name: 'type', control });
  const variants = productWatch('variants') || [];

  const onSubmit: SubmitHandler<VariantType> = (data) => {
    setProductValue('variants', [
      ...variants.filter((v) => v.id !== variant.id),
      data,
    ]);
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

  const resetForm = () => {
    reset(toVariantType(variant));
    setTextValues(variant.type === 'text' ? variant.listValues : []);
    setColorValues(variant.type === 'color' ? variant.listValues : []);
  };

  useEffect(() => resetForm(), [variant, reset]);

  return (
    <dialog id="update_variant" className="modal">
      <div className="modal-box max-h-[95vh]">
        <ModalHeader
          icon={<FiEdit2 size={19} />}
          title="Editar variante"
          description="Cambia el nombre, la etiqueta o los valores."
          onClose={() => {
            resetForm();
            modal.close();
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
          </label>
          {errors.name && (
            <span className="mt-1 text-xs font-semibold text-error">
              {errors.name.message}
            </span>
          )}
          <label className="flex flex-col">
            <span className={labelTextClass}>Tag de la Variante</span>
            <input
              type="text"
              className={inputClass}
              placeholder="Ej: color, size, material"
              {...register('tag')}
            />
          </label>
          {errors.tag && (
            <span className="mt-1 text-xs font-semibold text-error">
              {errors.tag.message}
            </span>
          )}
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
              setValue={setValue}
              errors={handleError}
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
                resetForm();
                modal.close();
              }}
            >
              Cancelar
            </button>
            <button type="submit" className={primaryButtonClass}>
              Guardar variante
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button type="submit" onClick={() => resetForm()} />
      </form>
    </dialog>
  );
}
