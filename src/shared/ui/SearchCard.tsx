import { ReactNode } from 'react';
import { FiSearch } from 'react-icons/fi';
import { cardClass, searchFieldClass, sectionTitleClass } from './styles';

type SearchCardProps = {
  placeholder: string;
  children?: ReactNode;
};

export default function SearchCard({ placeholder, children }: SearchCardProps) {
  return (
    <div className={`${cardClass} my-4 p-4`}>
      <p className={`${sectionTitleClass} mb-3`}>
        Búsqueda y filtros{' '}
        <span className="font-semibold normal-case tracking-normal text-ink-muted">
          (opcional)
        </span>
      </p>
      <div className="flex flex-col gap-2.5 md:flex-row md:items-center">
        <label className={`${searchFieldClass} md:flex-1`}>
          <FiSearch size={16} className="shrink-0 text-ink-muted" />
          <input
            type="search"
            className="h-full grow bg-transparent outline-none placeholder:text-ink-muted"
            placeholder={placeholder}
          />
        </label>
        {children}
      </div>
    </div>
  );
}
