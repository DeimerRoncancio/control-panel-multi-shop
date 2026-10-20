import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { FiAlertCircle, FiGrid } from 'react-icons/fi';
import axiosGetBearer from '../../../shared/requests/protectedRoutes/get';
import StatCard from '../../../shared/ui/StatCard';

export default function DetailsCategories() {
  const { data: stats } = useQuery({
    queryKey: ['categories-stats'],
    queryFn: async () => {
      const token = Cookies.get('accessToken');
      return axiosGetBearer({
        url: '/app/categories/stats',
        token: token || '',
      });
    },
  });

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <StatCard
        label="Total categorías"
        value={stats?.totalCategories || 0}
        hint="Categorías registradas"
        icon={FiGrid}
      />
      <StatCard
        label="Sin productos"
        value={stats?.obsoleteCategories || 0}
        hint="Categorías en desuso"
        icon={FiAlertCircle}
        tone="sun"
      />
    </div>
  );
}
