import { CategoriesResponse } from '../../categories/interfaces/categories-response';
import { categoryStyle } from '../../../shared/helpers/category-color';

type Props = {
  categories: CategoriesResponse[];
};

export default function LatestCategories({ categories }: Props) {
  if (categories.length === 0)
    return (
      <p className="my-4 text-center text-sm text-ink-muted">
        No hay categorías disponibles
      </p>
    );

  return (
    <ul className="flex flex-col gap-2">
      {categories.map((cat) => (
        <li
          key={cat.categoryName}
          style={categoryStyle(cat.categoryName)}
          className="flex items-center gap-3 rounded-xl bg-(--cat-soft) px-3 py-2.5"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-(--cat)" />
          <span className="text-sm font-extrabold text-(--cat)">
            {cat.categoryName}
          </span>
        </li>
      ))}
    </ul>
  );
}
