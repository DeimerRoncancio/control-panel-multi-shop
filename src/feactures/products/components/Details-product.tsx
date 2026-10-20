import { useQuery } from '@tanstack/react-query';
import Cookie from 'js-cookie';
import { FiBox, FiLayers } from 'react-icons/fi';
import axiosGetBearer from '../../../shared/requests/protectedRoutes/get';
import StatCard from '../../../shared/ui/StatCard';

function DetailsProduct() {
  const { data: stats } = useQuery<{
    totalProducts: number;
    productsWithVariants: number;
  }>({
    queryKey: ['product-stats'],
    queryFn: async () => {
      const cookie = Cookie.get('accessToken');
      return axiosGetBearer({
        url: '/app/products/stats',
        token: cookie || '',
      });
    },
  });

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <StatCard
        label="Total productos"
        value={stats?.totalProducts || 0}
        hint="Productos registrados"
        icon={FiBox}
      />
      <StatCard
        label="Con variantes"
        value={stats?.productsWithVariants || 0}
        hint="Tallas, colores u otras opciones"
        icon={FiLayers}
        tone="lilac"
      />
    </div>
  );
}
export default DetailsProduct;
