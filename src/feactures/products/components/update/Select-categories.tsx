import { useEffect, useState } from 'react';
import { CategoriesRequest } from '../../../categories/interfaces/categories-response';

export function SelectCategories({
  categoriesData,
  categoriesLoading,
  defectSelectedCategories,
  setSelectedCategories,
  selectedCategories,
}: {
  categoriesData: CategoriesRequest | undefined;
  categoriesLoading: boolean;
  defectSelectedCategories: { categoryName: string }[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  selectedCategories: string[];
}) {
  // Initialize selected categories from defectSelectedCategories
  useEffect(() => {
    if (defectSelectedCategories.length > 0) {
      const initialCategories = defectSelectedCategories.map(
        (category) => category.categoryName
      );
      setSelectedCategories(initialCategories);
    }
  }, [defectSelectedCategories, setSelectedCategories]);

  const handleCategoryChange = (categoryId: string) => {
    console.log('Category ID:', categoryId);
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? // eslint-disable-next-line @typescript-eslint/no-shadow
          prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <div className="xl:col-span-1flex flex-col">
      <div className="card h-auto shadow-xl border border-gray-600 rounded-lg">
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
                  htmlFor={`category-${category.categoryName}`}
                  key={category.categoryName}
                  className="label cursor-pointer justify-start gap-3 hover:bg-base-200 rounded-lg p-2 transition-colors"
                >
                  <input
                    type="checkbox"
                    id={`category-${category.categoryName}`}
                    className="checkbox checkbox-primary"
                    checked={selectedCategories.includes(category.categoryName)}
                    onChange={() => handleCategoryChange(category.categoryName)}
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
