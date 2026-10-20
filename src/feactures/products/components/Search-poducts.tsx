import SearchCard from '../../../shared/ui/SearchCard';
import { selectClass } from '../../../shared/ui/styles';

function SearchProducts() {
  return (
    <SearchCard placeholder="Buscar productos…">
      <select defaultValue="" className={selectClass}>
        <option value="">Selecciona por categoría</option>
        <option>Nombre</option>
        <option>Numero Telefonico</option>
        <option>Email</option>
      </select>
    </SearchCard>
  );
}

export default SearchProducts;
