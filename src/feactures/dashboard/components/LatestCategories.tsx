import { FaCalendarAlt, FaLayerGroup } from "react-icons/fa";
import { CategoriesResponse } from '../../categories/interfaces/categories-response';

type Props = {
  categories: CategoriesResponse[];
}

export default function LatestCategories({ categories }: Props) {
  return (
    <div className="flex flex-col gap-3">
      {categories.map((cat, idx) => (
        <div key={idx} className="flex items-center justify-between p-3 bg-base-100 rounded-xl">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-accent/10 text-accent`}>
              <FaLayerGroup />
            </div>
            <div>
              <div className="font-bold text-sm">{cat.categoryName}</div>
              <div className="text-xs opacity-50 flex items-center gap-1">
                <FaCalendarAlt className="text-[10px]" /> {cat.createdAt.split('T')[0]}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}