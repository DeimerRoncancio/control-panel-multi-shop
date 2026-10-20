import { useQuery } from '@tanstack/react-query';
import { FiArrowRight, FiAward, FiBox, FiGrid, FiUsers } from 'react-icons/fi';
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
import PageHeader from '../../../shared/ui/PageHeader';
import StatCard from '../../../shared/ui/StatCard';
import PriceTag from '../../../shared/ui/PriceTag';
import {
  cardClass,
  pageClass,
  sectionTitleClass,
} from '../../../shared/ui/styles';

function Dashboard() {
  const navigate = useNavigate();
  const cookie = Cookie.get('accessToken');

  const { data: products = [] } = useQuery<RequestProductID[]>({
    queryKey: ['latest-products'],
    queryFn: async () => {
      return await axiosGetBearer({
        url: '/app/products/latest-products',
        token: cookie || '',
      });
    },
  });

  const { data: users = [] } = useQuery<Content[]>({
    queryKey: ['latest-users'],
    queryFn: async () => {
      return await axiosGetBearer({
        url: '/app/users/latest-users',
        token: cookie || '',
      });
    },
  });

  const { data: categories = [] } = useQuery<CategoriesResponse[]>({
    queryKey: ['latest-categories'],
    queryFn: async () => {
      return await axiosGetBearer({
        url: '/app/categories/latest-categories',
        token: cookie || '',
      });
    },
  });

  const { data } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      return await axiosGetBearer({
        url: '/app/quantity',
        token: cookie || '',
      });
    },
  });

  return (
    <div className={pageClass}>
      <PageHeader
        eyebrow="Inicio"
        title="Panel de control"
        description="Gestiona tu tienda, productos y usuarios desde un solo lugar."
      />

      <div className="mb-8 grid gap-3 md:grid-cols-3">
        <StatCard
          label="Productos activos"
          value={data?.products || 0}
          hint="En el catálogo"
          icon={FiBox}
        />
        <StatCard
          label="Categorías"
          value={data?.categories || 0}
          hint="Con su color en la tienda"
          icon={FiGrid}
          tone="lilac"
        />
        <StatCard
          label="Usuarios registrados"
          value={data?.users || 0}
          hint="Clientes con cuenta"
          icon={FiUsers}
          tone="sky"
        />
      </div>

      <section className="mb-8">
        <h2 className={`${sectionTitleClass} mb-3`}>Acciones rápidas</h2>
        <QuickActions />
      </section>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="flex flex-col gap-6 xl:col-span-2">
          <section className={`${cardClass} p-4 sm:p-5`}>
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 className="text-lg font-extrabold text-ink">
                Últimos productos
              </h2>
              <button
                type="button"
                className="inline-flex items-center gap-1 text-sm font-bold text-brand hover:underline"
                onClick={() => navigate('/products')}
              >
                Ver catálogo
                <FiArrowRight size={15} />
              </button>
            </div>
            <div className="overflow-x-auto">
              <LatestProducts products={products} />
            </div>
          </section>

          <section className={`${cardClass} p-4 sm:p-5`}>
            <h2 className="mb-3 text-lg font-extrabold text-ink">
              Productos en tendencia
            </h2>
            <div className="flex flex-col gap-2">
              {[1, 2, 3].map((idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-3 rounded-xl border border-line p-3 transition-colors hover:border-brand/40"
                >
                  <div className="flex items-center gap-3">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-sun-soft text-sm font-extrabold text-ink">
                      #{idx}
                    </span>
                    <span className="block h-12 w-12 overflow-hidden rounded-xl bg-cream">
                      <img
                        src={`https://placehold.co/100x100?text=Top${idx}`}
                        alt=""
                      />
                    </span>
                    <div>
                      <h3 className="text-sm font-extrabold text-ink">
                        Producto Estrella {idx}
                      </h3>
                      <p className="text-xs text-ink-muted">
                        Categoría Popular
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <PriceTag price={299} />
                    <span className="flex items-center gap-1 text-xs font-semibold text-ink-muted">
                      <FiAward size={12} className="text-brand" /> Top ventas
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="flex flex-col gap-6">
          <section className={`${cardClass} p-4 sm:p-5`}>
            <h2 className="mb-3 text-lg font-extrabold text-ink">
              Categorías recientes
            </h2>
            <LatestCategories categories={categories} />
            <button
              type="button"
              className="mt-3 inline-flex w-full items-center justify-center gap-1 rounded-full border border-line py-2 text-sm font-bold text-ink transition-colors hover:border-ink"
              onClick={() => navigate('/categories')}
            >
              Ver todas las categorías
            </button>
          </section>

          <section className={`${cardClass} p-4 sm:p-5`}>
            <h2 className="mb-3 text-lg font-extrabold text-ink">
              Usuarios recientes
            </h2>
            <LatestUsers users={users} />
            <button
              type="button"
              className="mt-3 inline-flex w-full items-center justify-center gap-1 rounded-full border border-line py-2 text-sm font-bold text-ink transition-colors hover:border-ink"
              onClick={() => navigate('/users')}
            >
              Ver todos los usuarios
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
