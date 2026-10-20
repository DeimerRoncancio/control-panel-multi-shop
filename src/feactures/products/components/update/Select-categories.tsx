import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { FiCheck } from 'react-icons/fi';
import { CategoriesRequest } from '../../../categories/interfaces/categories-response';
import { ProductType } from '../../../../shared/zod/products/product.zod';
import { categoryStyle } from '../../../../shared/helpers/category-color';
import { cardClass, formSectionTitleClass } from '../../../../shared/ui/styles';

type SelectCategoriesProps = {
  categories: CategoriesRequest | undefined;
  loading: boolean;
  watch: UseFormWatch<ProductType>;
  register: UseFormRegister<ProductType>;
};

export function SelectCategories({
  categories,
  loading,
  watch,
  register,
}: SelectCategoriesProps) {
  const selectedCategories = watch('categoriesList') || [];

  return (
    <div className="flex flex-col xl:col-span-1">
      <div className={`${cardClass} p-5 sm:p-6 xl:sticky xl:top-6`}>
        <h2 className={formSectionTitleClass}>Categorías</h2>

        {loading ? (
          <div className="flex flex-col gap-2">
            {[...Array(6)].map((_, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={i} className="h-11 animate-pulse rounded-lg bg-cream" />
            ))}
          </div>
        ) : (
          <div className="flex max-h-[400px] flex-col gap-2 overflow-y-auto">
            {categories?.content.map((category) => (
              <label
                htmlFor={`category-${category.categoryName}`}
                key={category.categoryName}
                style={categoryStyle(category.categoryName)}
                className="flex cursor-pointer items-center gap-3 rounded-lg border border-line px-3.5 py-2.5 text-sm transition-colors hover:border-ink-muted has-checked:border-(--cat) has-checked:bg-(--cat-soft)"
              >
                <input
                  type="checkbox"
                  id={`category-${category.categoryName}`}
                  className="peer sr-only"
                  value={category.categoryName}
                  {...register('categoriesList')}
                />
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-md border-2 border-line bg-base-100 text-transparent transition-colors peer-checked:border-(--cat) peer-checked:bg-(--cat) peer-checked:text-white">
                  <FiCheck size={13} strokeWidth={3.5} />
                </span>
                <span className="flex-1 font-bold text-ink">
                  {category.categoryName}
                </span>
                <span className="h-2.5 w-2.5 rounded-full bg-(--cat)" />
              </label>
            ))}
          </div>
        )}

        <p className="mt-4 rounded-xl bg-brand-soft px-3.5 py-2.5 text-sm text-ink-soft">
          <span className="font-extrabold text-brand">
            {selectedCategories.length}
          </span>{' '}
          {selectedCategories.length === 1
            ? 'categoría seleccionada'
            : 'categorías seleccionadas'}
        </p>
      </div>
    </div>
  );
}
