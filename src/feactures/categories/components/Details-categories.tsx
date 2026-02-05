import { AiFillProduct } from "react-icons/ai";
import { FaBoxOpen } from "react-icons/fa";
import axiosGetBearer from "../../../shared/requests/protectedRoutes/get";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

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
    <div className="stats shadow w-full border border-gray-600">
      <div className="stat">
        <div className="stat-figure text-primary">
          <FaBoxOpen size={35} />
        </div>
        <div className="stat-title">Total Categorias</div>
        <div className="stat-value text-primary">{stats?.totalCategories || 0}</div>
        <div className="stat-desc">Categorias registradas</div>
      </div>
      <div className="stat">
        <div className="stat-figure text-success">
          <AiFillProduct size={35} />
        </div>
        <div className="stat-title">Categorias sin productos</div>
        <div className="stat-value text-success">{stats?.obsoleteCategories || 0}</div>
        <div className="stat-desc">Categorias en desuso</div>
      </div>
    </div>
  );
}