import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { FiUserCheck, FiUsers, FiUserX } from 'react-icons/fi';
import axiosGetBearer from '../../requests/protectedRoutes/get';
import StatCard from '../../ui/StatCard';

function DetailsUser({ isAdmin }: { isAdmin: boolean }) {
  const { data: stats } = useQuery({
    queryKey: ['user-stats', isAdmin],
    queryFn: async () => {
      const token = Cookies.get('accessToken');
      return axiosGetBearer({
        url: '/app/users/stats',
        params: { isAdmin },
        token: token || '',
      });
    },
  });

  const noun = isAdmin ? 'Administradores' : 'Usuarios';

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <StatCard
        label={`Total ${noun.toLowerCase()}`}
        value={stats?.totalUsers ?? 0}
        hint={`${noun} registrados`}
        icon={FiUsers}
      />
      <StatCard
        label="Activos"
        value={stats?.enabledUsers ?? 0}
        hint="Pueden iniciar sesión"
        icon={FiUserCheck}
        tone="success"
      />
      <StatCard
        label="Inactivos"
        value={stats?.disabledUsers ?? 0}
        hint="Cuentas deshabilitadas"
        icon={FiUserX}
        tone="error"
      />
    </div>
  );
}

export default DetailsUser;
