import { useForm } from 'react-hook-form';
import { SearchProducts } from '../../../feactures/products/interface/search-products';

function SearchUsers({
  setSearchUsers,
}: {
  setSearchUsers: React.Dispatch<React.SetStateAction<SearchProducts | null>>;
}) {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    setSearchUsers({
      identifier: data.search,
      isEnabled: data.status.length > 0 ? data.status : null,
      field: data.searchType,
    });
  };

  return (
    <div className="flex flex-col gap-4 mb-4 border border-gray-600 p-4 rounded-lg my-4">
      <h2 className="text-lg font-semibold">
        Busqueda y Filtros{' '}
        <span className="text-sm text-gray-400">(Opcional)</span>
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:flex-row gap-2 items-center"
      >
        <div className="input border-0 flex-3/5">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </g>
          </svg>
          <input
            {...register('search')}
            type="search"
            className="grow"
            placeholder="Search"
          />
          <kbd className="kbd kbd-sm">⌘</kbd>
          <kbd className="kbd kbd-sm">K</kbd>
        </div>
        <select {...register('searchType')} className="select border-0">
          <option value="">Selecciona tipo de busqueda</option>
          <option value="NAME">Nombre</option>
          <option value="NUMBER">Numero Telefonico</option>
          <option value="EMAIL">Email</option>
        </select>
        <select {...register('status')} className="select border-0">
          <option value="">Selecciona estado</option>
          <option value="true">Habilitado</option>
          <option value="false">Deshabilitado</option>
        </select>
      </form>
    </div>
  );
}

export default SearchUsers;
