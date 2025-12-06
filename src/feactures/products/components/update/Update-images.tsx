import { ProductImage } from "../../interface/response-products";

export function UpdateImages({ images }: { images: ProductImage[] }) {
  return (
    <div className="mt-12 border rounded-lg border-gray-600 col-span-2">
      <div className="card shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-6 flex items-center gap-2">
            Imágenes del Producto
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Imagen existente */}
            <div className="relative group">
              <div className="aspect-square bg-gray-100 rounded-lg border-2 border-gray-200 overflow-hidden hover:border-primary transition-colors">
                <img
                  src={images[0]?.imageUrl}
                  alt="Imagen del producto"
                  className="w-full h-full object-cover"
                />
                {/* Overlay con botones */}
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-50 transition-opacity flex items-center justify-center gap-2">
                  <button type="button" className="btn btn-sm btn-error">
                    🗑️
                  </button>
                  <button type="button" className="btn btn-sm btn-primary">
                    👁️
                  </button>
                </div>
              </div>
              {/* Badge de imagen */}
              <div className="absolute bottom-2 left-2">
                <div className="badge badge-neutral badge-sm">Imagen 1</div>
              </div>
            </div>

            {/* Zona para agregar nueva imagen */}
            <div className="aspect-square">
              <label
                htmlFor="new-image"
                className="w-full h-full border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <input
                  id="new-image"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  multiple
                />
                <div className="text-center">
                  <div className="mb-3 group-hover:scale-110 transition-transform">
                    <svg
                      className="w-12 h-12 mx-auto text-gray-400 group-hover:text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-600 group-hover:text-primary mb-1">
                    Agregar imagen
                  </p>
                  <p className="text-xs text-gray-400">PNG, JPG hasta 10MB</p>
                </div>
              </label>
            </div>

            {/* Placeholders para más imágenes */}
          </div>

          {/* Info y límites */}
          <div className="mt-6 p-4 bg-info/10 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="text-info">ℹ️</div>
              <div className="text-sm">
                <p className="font-medium text-info mb-1">
                  Información sobre las imágenes:
                </p>
                <ul className="text-gray-400 space-y-1">
                  <li>• Máximo 10 imágenes por producto</li>
                  <li>• Formatos permitidos: PNG, JPG, JPEG</li>
                  <li>• Tamaño máximo: 10MB por imagen</li>
                  <li>• Resolución recomendada: 1200x1200px</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
