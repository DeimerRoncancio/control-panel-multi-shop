import { SubmitHandler, useForm, UseFormSetValue, UseFormWatch, useWatch } from "react-hook-form";
import VariantValues from "../variants/Variant-values";
import { VariantSchema, VariantType } from "../../../../shared/zod/products/variant.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductType } from "../../../../shared/zod/products/product.zod";
import { useState } from "react";

type Props = {
  setValue: UseFormSetValue<ProductType>;
  watch: UseFormWatch<ProductType>;
}

export default function ModalCreateVariant({  setValue: setProductValue, watch: productWatch}: Props) {
  const modal = document.getElementById("create_variant") as HTMLDialogElement;
  const [textValues, setTextValues] = useState<string[]>([]);
  const [colorValues, setColorValues] = useState<string[]>([]);

  const {
    control,
    reset,
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
    setProductValue("variants", [ ...variants, data ]);
    modal.close();
    setColorValues([]);
    setTextValues([]);
    reset();
  }

  const handleTextValue = (val?: string[]): string[] => {
    val && setTextValues([ ...val ]);
    return textValues;
  }

  const handleColorValue = (val?: string[]): string[] => {
    val && setColorValues([ ...val ]);
    return colorValues;
  }

  return (
    <dialog id="create_variant" className="modal">
      <div className="modal-box max-h-[95vh]">
        <h3 className="font-semibold text-lg">Crear Nuevo Producto</h3>
        <p className="mb-4 font-thin">Completa los datos del producto que deseas crear</p>
        <form className="space-y-5 pr-1" onSubmit={handleSubmit(onSubmit)}>
          <label className="flex flex-col gap-2">
            <span className="font-normal">Nombre de la Variante</span>
            <input
              type="text"
              className="input input-bordered w-full"
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
              className="input input-bordered w-full"
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
              <select className="select select-bordered w-full" {...register("type")}>
                <option value="select" defaultChecked>Seleccionar</option>
                <option value="text">Texto</option>
                <option value="color">Color</option>
              </select>
            </label>
            {errors.type && (
              <span className="text-sm text-red-500">{errors.type.message}</span>
            )}
            <VariantValues
              type={type}
              setValue={setValue}
              handleTextValue={handleTextValue}
              handleColorValue={handleColorValue}
            />
          </div>
          {errors.listValues && (
            <span className="text-sm text-red-500">{errors.listValues.message}</span>
          )}
          <div className="modal-action mt-10 grid grid-cols-2 gap-4">
            <button type="button" className="btn btn-error btn-soft"
            onClick={() => {
              modal.close();
              reset();
            }}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
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
