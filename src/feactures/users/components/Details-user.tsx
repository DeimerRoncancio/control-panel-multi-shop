import { FaUserCheck, FaUsers, FaUserTimes } from 'react-icons/fa';

function DetailsUser() {
  return (
    <div className="stats shadow w-full border border-gray-600">
      <div className="stat">
        <div className="stat-figure text-primary">
          <FaUsers size={35} />
        </div>
        <div className="stat-title">Total Usuarios</div>
        <div className="stat-value text-primary">6</div>
        <div className="stat-desc">usuarios registrados</div>
      </div>

      <div className="stat">
        <div className="stat-figure text-success">
          <FaUserCheck size={35} />
        </div>
        <div className="stat-title">Usuarios Activos</div>
        <div className="stat-value text-success">5</div>
        <div className="stat-desc">usuarios conectados</div>
      </div>

      <div className="stat">
        <div className="stat-figure text-warning">
          <FaUserTimes size={35} />
        </div>
        <div className="stat-title">Usuarios Inactivos</div>
        <div className="stat-value text-warning">1</div>
        <div className="stat-desc">usuarios desconectados</div>
      </div>
    </div>
  );
}
export default DetailsUser;
