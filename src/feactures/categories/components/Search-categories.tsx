import SearchCard from '../../../shared/ui/SearchCard';
import { selectClass } from '../../../shared/ui/styles';

export default function SearchCategories() {
  return (
    <SearchCard placeholder="Buscar categorías…">
      <select defaultValue="" className={selectClass}>
        <option value="">Selecciona por categoría</option>
        <option>Nombre</option>
        <option>Numero Telefonico</option>
        <option>Email</option>
      </select>
    </SearchCard>
  );
}
