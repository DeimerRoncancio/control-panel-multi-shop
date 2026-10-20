import { useForm } from 'react-hook-form';
import { FiSearch } from 'react-icons/fi';
import { SearchProducts } from '../../../feactures/products/interface/search-products';
import {
  cardClass,
  searchFieldClass,
  sectionTitleClass,
  selectClass,
} from '../../ui/styles';

function SearchUsers({
  setSearchUsers,
}: {
  setSearchUsers: React.Dispatch<React.SetStateAction<SearchProducts | null>>;
}) {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    const identifier = (data.search || '').trim();

    if (!identifier) return setSearchUsers(null);

    setSearchUsers({
      identifier,
      isEnabled: data.status || null,
      field: data.searchType || null,
    });
  };

  return (
    <div className={`${cardClass} my-4 p-4`}>
      <p className={`${sectionTitleClass} mb-3`}>
        Búsqueda y filtros{' '}
        <span className="font-semibold normal-case tracking-normal text-ink-muted">
          (opcional)
        </span>
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2.5 md:flex-row md:items-center"
      >
        <label className={`${searchFieldClass} md:flex-1`}>
          <FiSearch size={16} className="shrink-0 text-ink-muted" />
          <input
            {...register('search')}
            type="search"
            className="h-full grow bg-transparent outline-none placeholder:text-ink-muted"
            placeholder="Buscar y presionar Enter…"
          />
        </label>
        <select {...register('searchType')} className={selectClass}>
          <option value="">Tipo de búsqueda</option>
          <option value="NAME">Nombre</option>
          <option value="NUMBER">Número telefónico</option>
          <option value="EMAIL">Correo</option>
        </select>
        <select {...register('status')} className={selectClass}>
          <option value="">Cualquier estado</option>
          <option value="true">Habilitado</option>
          <option value="false">Deshabilitado</option>
        </select>
      </form>
    </div>
  );
}

export default SearchUsers;
