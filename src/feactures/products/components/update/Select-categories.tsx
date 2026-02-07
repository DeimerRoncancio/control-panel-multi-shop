import { CategoriesRequest } from '../../../categories/interfaces/categories-response';
import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { ProductType } from '../../../../shared/zod/products/product.zod';

type SelectCategoriesProps = {
  categories: CategoriesRequest | undefined;
  loading: boolean;
  watch: UseFormWatch<ProductType>;
  register: UseFormRegister<ProductType>;
};

export function SelectCategories({ categories, loading, watch, register }: SelectCategoriesProps) {
  const selectedCategories = watch('categoriesList') || [];

  return (
    <div className="xl:col-span-1 flex flex-col">
      <div className="card h-auto shadow-xl border border-gray-600 rounded-lg">
        <div className="card-body">
          <h2 className="card-title text-xl mb-6">Categorías</h2>

          {loading ? (
            <div className="space-y-3">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="skeleton w-4 h-4 rounded" />
                  <div className="skeleton h-4 w-24" />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto">
              {categories?.content.map((category) => (
                <label
                  htmlFor={`category-${category.categoryName}`}
                  key={category.categoryName}
                  className="label cursor-pointer justify-start gap-3 hover:bg-base-200 rounded-lg p-2 transition-colors"
                >
                  <input
                    type="checkbox"
                    id={`category-${category.categoryName}`}
                    className="checkbox checkbox-primary bg-gray-700"
                    value={category.categoryName}
                    {...register('categoriesList')}
                  />
                  <span className="">{category.categoryName}</span>
                </label>
              ))}
            </div>
          )}

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
  );
}
