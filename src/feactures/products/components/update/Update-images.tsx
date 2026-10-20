import {
  FiEye,
  FiInfo,
  FiRotateCcw,
  FiTrash2,
  FiUploadCloud,
} from 'react-icons/fi';
import { ProductImage } from '../../interface/response-products';
import ButtonModal from '../../../../shared/components/globalComponents/ButtonModal';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { ProductType } from '../../../../shared/zod/products/product.zod';
import {
  cardClass,
  formSectionTitleClass,
  outlineButtonClass,
} from '../../../../shared/ui/styles';

type Props = {
  images: ProductImage[];
  imagesToRemove?: string[];
  watch: UseFormWatch<ProductType>;
  setValue: UseFormSetValue<ProductType>;
  removeImages: (imageIds: string[], clean?: boolean) => void;
};

export function UpdateImages({
  images,
  imagesToRemove,
  watch,
  setValue,
  removeImages,
}: Props) {
  const newImages = watch('images');

  const deleteImages = (
    evt: React.MouseEvent<HTMLButtonElement>,
    imageId: string
  ) => {
    evt.preventDefault();
    removeImages([imageId]);
  };

  const cleanDeletedImages = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    setValue('images', []);
    removeImages([], true);
  };

  const tileClass =
    'relative aspect-square overflow-hidden rounded-xl border bg-cream transition-colors';
  const overlayClass =
    'absolute inset-0 flex items-center justify-center gap-2 bg-ink/45 opacity-0 transition-opacity group-hover:opacity-100';
  const iconButton =
    'grid h-9 w-9 place-items-center rounded-full bg-base-100 text-ink transition-colors';

  return (
    <div className={`${cardClass} p-5 sm:p-6`}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className={formSectionTitleClass}>Imágenes del producto</h2>
          <p className="-mt-2 text-sm text-ink-muted">
            La primera se usa como portada en la tienda.
          </p>
        </div>
        <button
          type="button"
          className={`${outlineButtonClass} h-9 px-4`}
          onClick={cleanDeletedImages}
        >
          <FiRotateCcw size={15} />
          Deshacer cambios
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {images.map((image) => (
          <div
            className="group"
            key={image.imageId}
            style={{
              display: imagesToRemove?.includes(image.imageId)
                ? 'none'
                : 'block',
            }}
          >
            <div className={`${tileClass} border-line hover:border-brand`}>
              <img
                src={image?.imageUrl}
                alt=""
                className="h-full w-full object-contain mix-blend-darken"
              />
              <div className={overlayClass}>
                <button
                  type="button"
                  aria-label="Quitar imagen"
                  className={`${iconButton} hover:bg-error hover:text-white`}
                  onClick={(evt) => deleteImages(evt, image.imageId)}
                >
                  <FiTrash2 size={16} />
                </button>
                <ButtonModal
                  idModal=""
                  className={`${iconButton} hover:bg-brand hover:text-white`}
                >
                  <FiEye size={16} />
                </ButtonModal>
              </div>
            </div>
            <p className="mt-1.5 truncate text-xs font-semibold text-ink-muted">
              {image.name}
            </p>
          </div>
        ))}

        {newImages?.map((file, index) => (
          <div className="group" key={file.name}>
            <div className={`${tileClass} border-success`}>
              <img
                src={URL.createObjectURL(file)}
                alt=""
                className="h-full w-full object-contain mix-blend-darken"
              />
              <span className="absolute left-2 top-2 rounded-full bg-success px-2 py-0.5 text-[10px] font-extrabold uppercase text-white">
                Nueva
              </span>
              <div className={overlayClass}>
                <button
                  type="button"
                  aria-label="Quitar imagen"
                  className={`${iconButton} hover:bg-error hover:text-white`}
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
                  className={`${iconButton} hover:bg-brand hover:text-white`}
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

        <label
          htmlFor="new-image"
          className="group flex aspect-square cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-line p-4 text-center transition-colors hover:border-brand hover:bg-brand-soft/50"
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
          <span className="grid h-11 w-11 place-items-center rounded-full bg-cream text-ink transition-colors group-hover:bg-brand group-hover:text-white">
            <FiUploadCloud size={20} />
          </span>
          <span className="text-sm font-bold text-ink group-hover:text-brand">
            Agregar imagen
          </span>
          <span className="text-xs text-ink-muted">PNG, JPG hasta 10 MB</span>
        </label>
      </div>

      <div className="mt-5 flex items-start gap-3 rounded-xl bg-sky px-4 py-3 text-sm">
        <FiInfo size={17} className="mt-0.5 shrink-0 text-sky-strong" />
        <div>
          <p className="mb-1 font-bold text-ink">Sobre las imágenes</p>
          <ul className="flex flex-col gap-0.5 text-ink-soft">
            <li>Máximo 10 imágenes por producto</li>
            <li>Formatos permitidos: PNG, JPG, JPEG</li>
            <li>Tamaño máximo: 10 MB por imagen</li>
            <li>Resolución recomendada: 1200 × 1200 px</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
