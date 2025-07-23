import { Content } from '../interfaces/get-users-request';
import { ButtonModal } from './ButtonModal';

export function ListUsers({
  users,
  isAdmin,
}: {
  users: Content[];
  isAdmin: boolean;
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-600 p-4 shadow">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Telefono</th>
            <th>Correo Electronico</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {users.map((user) => (
            <tr>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={`${user.imageUser.imageUrl}`}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
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
                <details className="dropdown">
                  <summary className="btn m-1">Detalles</summary>
                  <ul className="menu dropdown-content bg-base-100 rounded-box z-1 p-2 shadow-sm w-36">
                    <li>
                      <ButtonModal
                        idModal="update_user"
                        className="text-[12px] btn btn-primary btn-sm"
                      >
                        {isAdmin
                          ? 'Actualizar Administrador'
                          : 'Actualizar Usuario'}
                      </ButtonModal>
                    </li>
                    <li>
                      <ButtonModal
                        idModal="delete_user"
                        className="text-[12px] btn btn-warning btn-sm"
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
          ))}
        </tbody>
        {/* foot */}
        <tfoot>
          <tr>
            <th>Nombre</th>
            <th>Telefono</th>
            <th>Correo Electronico</th>
            <th>Acciones</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
