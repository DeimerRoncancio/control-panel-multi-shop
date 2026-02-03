import { SubmitHandler, useForm, UseFormSetValue, UseFormWatch, useWatch } from "react-hook-form";
import VariantValues from "../variants/Variant-values";
import { VariantSchema, VariantType } from "../../../../shared/zod/products/variant.zod";
import { ProductType } from "../../../../shared/zod/products/product.zod";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toVariantType } from "../../mappers/products.mapper";

type Props = {
  variant: VariantType;
  setValue: UseFormSetValue<ProductType>;
  watch: UseFormWatch<ProductType>;
}

export default function ModalUpdateVariant({ variant, setValue: setProductValue, watch: productWatch }: Props) {
  const modal = document.getElementById("update_variant") as HTMLDialogElement;
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
    formState: { errors }
  } = useForm<VariantType>({
    resolver: zodResolver(VariantSchema)
  });

  const type = useWatch({ name: "type", control });
  const variants = productWatch("variants") || [];

  const onSubmit: SubmitHandler<VariantType> = (data) => {
    setProductValue("variants", [...variants.filter(v => v.id !== variant.id), data]);
    modal.close();
    setColorValues([]);
    setTextValues([]);
    reset();
  }

  const handleError = (clear?: boolean, val?: string) => {
    if (clear) {
      clearErrors("listValues");
      return;
    }
    setError("listValues", { type: "manual", message: val });
  }

  const handleTextValue = (val?: string[]): string[] => {
    val && setTextValues([...val]);
    return textValues;
  }

  const handleColorValue = (val?: string[]): string[] => {
    val && setColorValues([...val]);
    return colorValues;
  }

  const resetForm = () => {
    reset(toVariantType(variant));
    setTextValues(variant.type === 'text' ? variant.listValues : []);
    setColorValues(variant.type === 'color' ? variant.listValues : []);
  }

  useEffect(() => resetForm(), [variant, reset]);

  return (
    <dialog id="update_variant" className="modal">
      <div className="modal-box max-h-[95vh]">
        <h3 className="font-semibold text-lg">Crear Nuevo Producto</h3>
        <p className="mb-4 font-thin">Completa los datos del producto que deseas crear</p>
        <form className="space-y-5 pr-1" onSubmit={handleSubmit(onSubmit)}>
          <label className="flex flex-col gap-2">
            <span className="font-normal">Nombre de la Variante</span>
            <input
              type="text"
              className="input input-bordered w-full bg-gray-700"
              placeholder="Ej: Color, Tamaño, Material"
              {...register("name")}
            />
          </label>
          {errors.name && (
            <span className="text-sm text-red-500">{errors.name.message}</span>
          )}
          <label className="flex flex-col gap-2">
            <span className="font-normal">Tag de la Variante</span>
            <input
              type="text"
              className="input input-bordered w-full bg-gray-700"
              placeholder="Ej: color, size, material"
              {...register("tag")}
            />
          </label>
          {errors.tag && (
            <span className="text-sm text-red-500">{errors.tag.message}</span>
          )}
          <div>
            <label className="flex flex-col gap-2">
              <span className="font-normal">Tipo de Variante</span>
              <select className="select select-bordered w-full bg-gray-700" {...register("type")}>
                <option value="select">Seleccionar</option>
                <option value="text">Texto</option>
                <option value="color">Color</option>
              </select>
            </label>
            {type === 'select' && (
              <p className={`text-sm text-gray-400 mt-2 ${errors.type && 'text-red-500'}`}>
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
          {errors.listValues && type !== "select" && (
            <span className="text-sm text-red-500">{errors.listValues.message}</span>
          )}
          <div className="modal-action mt-10 grid grid-cols-2 gap-4">
            <button type="button" className="btn btn-error btn-soft"
              onClick={() => {
                resetForm();
                modal.close()
              }}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              Actualizar Variante
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
