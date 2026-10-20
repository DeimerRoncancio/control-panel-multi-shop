import {
  FiEdit2,
  FiMail,
  FiMoreHorizontal,
  FiPhone,
  FiTrash2,
} from 'react-icons/fi';
import { Content } from '../../interfaces/get-users-request';
import { ButtonModal } from '../globalComponents/ButtonModal';
import UserAvatar from '../../ui/UserAvatar';
import EmptyState from '../../ui/EmptyState';
import {
  actionsButtonClass,
  cardClass,
  menuDangerRowClass,
  menuPanelClass,
  menuRowClass,
} from '../../ui/styles';

type ListUsersProps = {
  users: Content[];
  isAdmin: boolean;
  isLoading: boolean;
  setUserUpdate: React.Dispatch<React.SetStateAction<Content | null>>;
};

export function ListUsers({
  users,
  isAdmin,
  isLoading,
  setUserUpdate,
}: ListUsersProps) {
  return (
    <div className={`${cardClass} overflow-x-auto p-3`}>
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Correo electrónico</th>
            <th>Estado</th>
            <th className="text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 && !isLoading && (
            <tr>
              <td colSpan={5}>
                <EmptyState
                  title={
                    isAdmin
                      ? 'No se encontraron administradores'
                      : 'No se encontraron usuarios'
                  }
                  description="Intenta ajustar los filtros de búsqueda."
                />
              </td>
            </tr>
          )}
          {isLoading ? (
            <tr>
              <td colSpan={5} className="py-10 text-center">
                <span className="loading loading-spinner loading-lg" />
              </td>
            </tr>
          ) : (
            users.map((user, index) => (
              <tr key={user.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <UserAvatar
                      name={user.name}
                      lastnames={user.lastnames}
                      imageUrl={user.imageUser?.imageUrl}
                    />
                    <div>
                      <div className="font-extrabold text-ink">{`${user?.name ?? ''} ${user?.secondName ?? ''}`}</div>
                      <div className="text-sm text-ink-muted">
                        {user?.lastnames ?? ''}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  {user?.phoneNumber ? (
                    <span className="inline-flex items-center gap-1.5 text-sm text-ink-soft tabular-nums">
                      <FiPhone size={14} className="text-brand" />
                      +57 {user.phoneNumber}
                    </span>
                  ) : (
                    <span className="text-sm text-ink-muted">Sin teléfono</span>
                  )}
                </td>
                <td>
                  {user?.email ? (
                    <span className="inline-flex items-center gap-1.5 text-sm text-ink-soft">
                      <FiMail size={14} className="text-brand" />
                      {user.email}
                    </span>
                  ) : (
                    <span className="text-sm text-ink-muted">Sin correo</span>
                  )}
                </td>
                <td>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                      user.enabled
                        ? 'bg-mint text-success'
                        : 'bg-rose text-error'
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${user.enabled ? 'bg-success' : 'bg-error'}`}
                    />
                    {user.enabled ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="text-right">
                  <details
                    className={`dropdown dropdown-end ${index === users.length - 1 && users.length > 1 ? 'dropdown-top' : ''}`}
                  >
                    <summary className={actionsButtonClass}>
                      <FiMoreHorizontal size={16} />
                      Acciones
                    </summary>
                    <ul className={`${menuPanelClass} w-56`}>
                      <li>
                        <ButtonModal
                          onClick={() => setUserUpdate(user)}
                          idModal="update_user"
                          className={menuRowClass}
                        >
                          <FiEdit2 size={15} className="text-brand" />
                          {isAdmin ? 'Editar administrador' : 'Editar usuario'}
                        </ButtonModal>
                      </li>
                      <li>
                        <ButtonModal
                          onClick={() => setUserUpdate(user)}
                          idModal="delete_user"
                          className={menuDangerRowClass}
                        >
                          <FiTrash2 size={15} />
                          {isAdmin
                            ? 'Eliminar administrador'
                            : 'Eliminar usuario'}
                        </ButtonModal>
                      </li>
                    </ul>
                  </details>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
