import { Content } from '../../interfaces/get-users-request';
import { ButtonModal } from '../globalComponents/ButtonModal';

type ListUsersProps = {
  users: Content[];
  isAdmin: boolean;
  isLoading: boolean;
  setUserUpdate: React.Dispatch<React.SetStateAction<Content | null>>;
};

export function ListUsers({ users, isAdmin, isLoading, setUserUpdate }: ListUsersProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-600 p-4 shadow">
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Telefono</th>
            <th>Correo Electronico</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 && !isLoading && (
            <tr>
              <td colSpan={4} className="text-center py-10">
              <div className="flex flex-col items-center justify-center text-gray-500">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-12 h-12 mb-2"
                >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
                </svg>
                <p className="text-lg font-medium">No se encontraron usuarios</p>
                <p className="text-sm">Intenta ajustar los filtros de búsqueda</p>
              </div>
              </td>
            </tr>
          )}
          {isLoading ? (
            <tr>
              <td colSpan={4} className="text-center">
                <span className="loading loading-spinner loading-lg" />
              </td>
            </tr>
          ) : (
            users.map((user, index) => (
              <tr key={user.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="mask mask-squircle h-12 w-12 relative overflow-hidden flex
                    items-center justify-center bg-gray-700 text-xl font-bold">
                      <p>{user?.name?.charAt(0) ?? ''}</p>
                    </div>
                    <div>
                      <div className="font-bold">
                        {`${user?.name ?? ''} ${user?.secondName ?? ''}`}
                      </div>
                      <div className="text-sm opacity-50">
                        {user?.lastnames ?? ''}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  {user?.phoneNumber ? user.phoneNumber : 'No phone number'}
                </td>
                <td>{user?.email ? user.email : 'No email'}</td>
                <th>
                  <details className={`dropdown dropdown-center ${index === users.length - 1 && 'dropdown-top'}`}>
                    <summary className="btn m-1">Detalles</summary>
                    <ul className="menu dropdown-content bg-base-100 rounded-box z-1 border border-gray-700
                    p-2 shadow-sm w-44 space-y-2">
                      <li>
                        <ButtonModal
                          onClick={() => setUserUpdate(user)}
                          idModal="update_user"
                          className="text-[12px] btn btn-sm"
                        >
                          {isAdmin
                            ? 'Editar Administrador'
                            : 'Editar Usuario'}
                        </ButtonModal>
                      </li>
                      <li>
                        <ButtonModal
                          onClick={() => setUserUpdate(user)}
                          idModal="delete_user"
                          className="text-[12px] btn btn-error btn-sm"
                        >
                          {isAdmin
                            ? 'Eliminar Administrador'
                            : 'Eliminar Usuario'}
                        </ButtonModal>
                      </li>
                    </ul>
                  </details>
                </th>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
