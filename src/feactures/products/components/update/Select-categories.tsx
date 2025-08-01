import { useState } from 'react';
import { CategoriesRequest } from '../../../categories/interfaces/categories-response';

export function SelectCategories({
  categoriesData,
  categoriesLoading,
}: {
  categoriesData: CategoriesRequest | undefined;
  categoriesLoading: boolean;
}) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? // eslint-disable-next-line @typescript-eslint/no-shadow
          prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <div className="xl:col-span-1 border rounded-lg border-gray-600 flex flex-col">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title text-xl mb-6">Categorías *</h2>

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
  );
}
