import { FaPencilAlt } from 'react-icons/fa';
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
          {isLoading ? (
            <tr>
              <td colSpan={4} className="text-center">
                <span className="loading loading-spinner loading-lg" />
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <ButtonModal
                      onClick={() => setUserUpdate(user)}
                      idModal="user_avatar"
                      className="avatar relative group cursor-pointer"
                    >
                      <div className="mask mask-squircle h-12 w-12 relative overflow-hidden">
                        <img
                          src={`${user.imageUser?.imageUrl}`}
                          alt="Avatar Tailwind CSS Component"
                          className="transition-all duration-200 group-hover:blur-sm"
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <FaPencilAlt className="text-white text-lg drop-shadow-lg" />
                        </div>
                      </div>
                    </ButtonModal>
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
                  <details className="dropdown dropdown-center">
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
