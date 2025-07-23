import { FaUserCheck, FaUsers, FaUserTimes } from 'react-icons/fa';

function DetailsUser({ isAdmin }: { isAdmin: boolean }) {
  return (
    <div className="stats shadow w-full border border-gray-600">
      <div className="stat">
        <div className="stat-figure text-primary">
          <FaUsers size={35} />
        </div>
        <div className="stat-title">
          {isAdmin ? 'Total Administradores' : 'Total Usuarios'}
        </div>
        <div className="stat-value text-primary">6</div>
        <div className="stat-desc">
          {isAdmin ? 'administradores registrados' : 'usuarios registrados'}
        </div>
      </div>

      <div className="stat">
        <div className="stat-figure text-success">
          <FaUserCheck size={35} />
        </div>
        <div className="stat-title">
          {isAdmin ? 'Administradores Activos' : 'Usuarios Activos'}
        </div>
        <div className="stat-value text-success">5</div>
        <div className="stat-desc">
          {isAdmin ? 'administradores conectados' : 'usuarios conectados'}
        </div>
      </div>

      <div className="stat">
        <div className="stat-figure text-warning">
          <FaUserTimes size={35} />
        </div>
        <div className="stat-title">
          {isAdmin ? 'Administradores Inactivos' : 'Usuarios Inactivos'}
        </div>
        <div className="stat-value text-warning">1</div>
        <div className="stat-desc">
          {isAdmin ? 'administradores desconectados' : 'usuarios desconectados'}
        </div>
      </div>
    </div>
  );
}
export default DetailsUser;
