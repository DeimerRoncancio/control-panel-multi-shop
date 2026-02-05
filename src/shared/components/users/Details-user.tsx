import { FaUserCheck, FaUsers, FaUserTimes } from 'react-icons/fa';
import axiosGetBearer from '../../requests/protectedRoutes/get';
import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';

function DetailsUser({ isAdmin }: { isAdmin: boolean }) {
  const { data: stats } = useQuery({
    queryKey: ['user-stats'],
    queryFn: async () => {
      const token = Cookies.get('accessToken');
      return axiosGetBearer({
        url: `/app/users/stats?isAdmin=${isAdmin}`,
        token: token || '',
      });
    },
  });

  return (
    <div className="stats shadow w-full border border-gray-600">
      <div className="stat">
        <div className="stat-figure text-primary">
          <FaUsers size={35} />
        </div>
        <div className="stat-title">
          {isAdmin ? 'Total Administradores' : 'Total Usuarios'}
        </div>
        <div className="stat-value text-primary">{stats?.totalUsers}</div>
        <div className="stat-desc">
          {isAdmin ? 'Administradores registrados' : 'Usuarios registrados'}
        </div>
      </div>

      <div className="stat">
        <div className="stat-figure text-success">
          <FaUserCheck size={35} />
        </div>
        <div className="stat-title">
          {isAdmin ? 'Administradores Activos' : 'Usuarios Activos'}
        </div>
        <div className="stat-value text-success">{stats?.enabledUsers}</div>
        <div className="stat-desc">
          {isAdmin ? 'Administradores conectados' : 'Usuarios conectados'}
        </div>
      </div>

      <div className="stat">
        <div className="stat-figure text-warning">
          <FaUserTimes size={35} />
        </div>
        <div className="stat-title">
          {isAdmin ? 'Administradores Inactivos' : 'Usuarios Inactivos'}
        </div>
        <div className="stat-value text-warning">{stats?.disabledUsers}</div>
        <div className="stat-desc">
          {isAdmin ? 'Administradores desconectados' : 'Usuarios desconectados'}
        </div>
      </div>
    </div>
  );
}

export default DetailsUser;
