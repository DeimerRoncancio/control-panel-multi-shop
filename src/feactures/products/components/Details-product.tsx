import { useQuery } from '@tanstack/react-query';
import { AiFillProduct } from 'react-icons/ai';
import { FaBoxOpen } from 'react-icons/fa6';
import axiosGetBearer from '../../../shared/requests/protectedRoutes/get';
import Cookie from 'js-cookie';

function DetailsProduct() {
  const { data: stats } = useQuery<{ totalProducts: number, productsWithVariants: number }>({
    queryKey: ['product-stats'],
    queryFn: async () => {
      const cookie = Cookie.get('accessToken');
      return await axiosGetBearer({
        url: '/app/products/stats',
        token: cookie || '',
      });
    },
  })

  return (
    <div className="stats shadow w-full border border-gray-600">
      <div className="stat">
        <div className="stat-figure text-primary">
          <FaBoxOpen size={35} />
        </div>
        <div className="stat-title">Total Productos</div>
        <div className="stat-value text-primary">{stats?.totalProducts || 0}</div>
        <div className="stat-desc">Productos registrados</div>
      </div>
      <div className="stat">
        <div className="stat-figure text-success">
          <AiFillProduct size={35} />
        </div>
        <div className="stat-title">Productos variables</div>
        <div className="stat-value text-success">{stats?.productsWithVariants || 0}</div>
        <div className="stat-desc">Productos versátiles</div>
      </div>
    </div>
  );
}
export default DetailsProduct;
