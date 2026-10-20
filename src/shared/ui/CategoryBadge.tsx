import { categoryStyle } from '../helpers/category-color';

type CategoryBadgeProps = {
  name: string;
};

export default function CategoryBadge({ name }: CategoryBadgeProps) {
  return (
    <span
      style={categoryStyle(name)}
      className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-(--cat-soft) px-2.5 py-0.5
        text-xs font-bold text-(--cat)"
    >
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-(--cat)" />
      {name}
    </span>
  );
}
