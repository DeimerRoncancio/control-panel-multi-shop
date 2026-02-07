import { useQuery } from '@tanstack/react-query';
import {
  FaBoxOpen,
  FaLayerGroup,
  FaUsers,
  FaTags,
  FaTrophy,
} from 'react-icons/fa';
import { RequestProductID } from '../../products/interface/response-productid';
import { useNavigate } from 'react-router';
import axiosGetBearer from '../../../shared/requests/protectedRoutes/get';
import Cookie from 'js-cookie';
import { Content } from '../../../shared/interfaces/get-users-request';
import LatestProducts from '../components/LatestProducts';
import { CategoriesResponse } from '../../categories/interfaces/categories-response';
import LatestCategories from '../components/LatestCategories';
import LatestUsers from '../components/LatestUsers';
import QuickActions from '../components/QuickActions';

function Dashboard() {
  const navigate = useNavigate();
  const cookie = Cookie.get('accessToken');

  const { data: products = [] } = useQuery<RequestProductID[]>({
    queryKey: ['latest-products'],
    queryFn: async () => {
      return await axiosGetBearer({
        url: '/app/products/latest-products',
        token: cookie || ''
      })
    },
  });

  const {data: users = []} = useQuery<Content[]>({
    queryKey: ['latest-users'],
    queryFn: async () => {
      return await axiosGetBearer({
        url: '/app/users/latest-users',
        token: cookie || ''
      })
    },
  })

  const { data: categories = [] } = useQuery<CategoriesResponse[]>({
    queryKey: ['latest-categories'],
    queryFn: async () => {
      return await axiosGetBearer({
        url: '/app/categories/latest-categories',
        token: cookie || ''
      })
    },
  });

  const { data } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      return await axiosGetBearer({ 
        url: '/app/quantity', 
        token: cookie || ''
      });
    }
  })

  return (
    <div className="w-full h-full p-8 bg-base-100 overflow-y-auto">
      {/* Welcome Section */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-base-content mb-2">
          Panel de Control
        </h1>
        <p className="text-lg text-base-content/60">
          Gestiona tu tienda, productos y usuarios desde un solo lugar.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="card bg-primary text-primary-content shadow-xl">
          <div className="card-body flex-row items-center justify-between">
            <div>
              <h2 className="card-title text-3xl font-bold">{data?.products || 0}</h2>
              <p className="opacity-90">Productos Activos</p>
            </div>
            <FaBoxOpen className="text-5xl opacity-80" />
          </div>
        </div>

        <div className="card bg-secondary text-secondary-content shadow-xl">
          <div className="card-body flex-row items-center justify-between">
            <div>
              <h2 className="card-title text-3xl font-bold">{data?.categories || 0}</h2>
              <p className="opacity-90">Categorías</p>
            </div>
            <FaLayerGroup className="text-5xl opacity-80" />
          </div>
        </div>

        <div className="card bg-accent text-accent-content shadow-xl">
          <div className="card-body flex-row items-center justify-between">
            <div>
              <h2 className="card-title text-3xl font-bold">{data?.users || 0}</h2>
              <p className="opacity-90">Usuarios Registrados</p>
            </div>
            <FaUsers className="text-5xl opacity-80" />
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <FaTags className="text-primary" /> Acciones Rápidas
        </h3>
        <QuickActions />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Últimos Productos Agregados</h3>
            <button className="btn btn-link btn-sm no-underline text-base-content/60 hover:text-primary"
              onClick={() => navigate('/products')}
            >
              Ver catálogo completo
            </button>
          </div>

          <div className="overflow-x-auto bg-base-200 rounded-2xl p-4">
            <LatestProducts products={products} />
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              Productos en Tendencia
            </h3>
            <div className="bg-base-200 rounded-2xl p-4">
              <div className="flex flex-col gap-3">
                {[1, 2, 3].map((idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 bg-base-100 rounded-xl hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-warning/10 text-warning font-bold">
                        #{idx}
                      </div>
                      <div className="avatar">
                        <div className="w-12 h-12 rounded-lg bg-base-200">
                          <img 
                            src={`https://placehold.co/100x100?text=Top${idx}`} 
                            alt="Product" 
                          />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">Producto Estrella {idx}</h4>
                        <p className="text-xs opacity-60">Categoría Popular</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-primary">$299.99</div>
                      <div className="text-xs opacity-50 flex items-center justify-end gap-1">
                        <FaTrophy className="text-[10px] text-warning" /> Top Ventas
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Categorías Recientes</h3>
            <div className="bg-base-200 rounded-2xl p-4">
              <LatestCategories categories={categories} />
              <button className="btn btn-ghost btn-sm btn-block mt-3 text-xs uppercase tracking-wide opacity-50 hover:opacity-100"
              onClick={() => navigate("/categories")}>
                Ver todas las categorías
              </button>
            </div>
          </div>

          {/* Recent Users */}
          <div>
            <h3 className="text-xl font-bold mb-4">Usuarios Recientes</h3>
            <div className="bg-base-200 rounded-2xl p-4">
              <LatestUsers users={users} />
              <button className="btn btn-ghost btn-sm btn-block mt-3 text-xs uppercase tracking-wide opacity-50 hover:opacity-100"
              onClick={() => navigate("/users")}>
                Ver todos los usuarios
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
