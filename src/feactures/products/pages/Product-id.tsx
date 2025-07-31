import Cookies from 'js-cookie';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { useState } from 'react';
import axiosGetBearer from '../../../shared/requests/protectedRoutes/get';
import { CategoriesRequest } from '../../categories/interfaces/categories-response';

export function ProductId() {
  const { id } = useParams();
  console.log(id);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const { data: categoriesData, isLoading: categoriesLoading } =
    useQuery<CategoriesRequest>({
      queryKey: ['categories'],
      queryFn: async () => {
        const token = Cookies.get('accessToken');
        return axiosGetBearer({
          url: '/app/categories',
          token: token || '',
        });
      },
    });

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? // eslint-disable-next-line @typescript-eslint/no-shadow
          prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <div className="min-h-screen transition-colors duration-300">
      <div className="shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button type="button" className="btn btn-ghost btn-sm">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Actualizar Producto
                </h1>
                <p className="text-sm opacity-70">
                  Modificando: Mando X-BOX Series X
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                className="btn btn-primary bg-gradient-to-r from-purple-500 to-pink-500 border-none"
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column - Product Information */}
          <div className="xl:col-span-2 space-y-6">
            <div className="card  shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-xl mb-6">
                  Información Principal
                </h2>

                <div className="space-y-4">
                  {/* Product Name */}
                  <div className="form-control">
                    <label htmlFor="product-name" className="flex flex-col">
                      <span className="label-text text-start font-semibold">
                        Nombre del Producto *
                      </span>
                      <input
                        id="product-name"
                        type="text"
                        defaultValue="Mando X-BOX Series X"
                        className="input input-bordered w-full "
                      />
                    </label>
                  </div>

                  {/* Description */}
                  <div className="form-control">
                    <label
                      htmlFor="product-description"
                      className="flex flex-col"
                    >
                      <span className="label-text font-semibold">
                        Descripción *
                      </span>
                      <textarea
                        id="product-description"
                        className="textarea textarea-bordered h-32 w-full"
                        defaultValue="Mando personalizado, purpura para consola X-BOX"
                      />
                    </label>
                  </div>

                  {/* Price */}
                  <div className="form-control">
                    <label htmlFor="price" className="flex flex-col">
                      <span className="label-text font-semibold">
                        Precio (COP) *
                      </span>
                      <input
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

          {/* Right Column - Categories */}
          <div className="xl:col-span-1">
            <div className="card shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-xl mb-6">🏷️ Categorías *</h2>

                {categoriesLoading ? (
                  <div className="space-y-3">
                    {[...Array(8)].map((_, i) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <div key={i} className="flex items-center gap-3">
                        <div className="skeleton w-4 h-4 rounded" />
                        <div className="skeleton h-4 w-24" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col gap-3 max-h-96 overflow-y-auto">
                    {categoriesData?.content.map((category) => (
                      <label
                        htmlFor={`category-${category.id}`}
                        key={category.id}
                        className="label cursor-pointer justify-start gap-3 hover:bg-base-200 rounded-lg p-2 transition-colors"
                      >
                        <input
                          type="checkbox"
                          id={`category-${category.id}`}
                          className="checkbox checkbox-primary"
                          checked={selectedCategories.includes(category.id)}
                          onChange={() => handleCategoryChange(category.id)}
                        />
                        <span className="">{category.categoryName}</span>
                      </label>
                    ))}
                  </div>
                )}

                {/* Selected Categories Counter */}
                <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                  <p className="text-sm">
                    <span className="font-bold text-primary">
                      {selectedCategories.length}
                    </span>{' '}
                    categorías seleccionadas
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
