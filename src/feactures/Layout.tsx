import { Outlet, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Aside from '../shared/components/Aside';
import Navbar from '../shared/components/Navbar';
import envs from '../configs/envs';
import axiosGet from '../shared/requests/basicRequests/get';

function Layout() {
  const token = Cookies.get('accessToken');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axiosGet({ url: `${envs.API}/app/users/token-validation/${token}` })
      .then(() => {})
      .catch(() => navigate('/'))
      .finally(() => setLoading(false));
  }, [token, navigate]);

  return (
    <main className="w-full h-screen flex flex-col">
      <Navbar />
      <div className="flex w-full h-full">
        <Aside />
        <section className="w-[80%] h-full flex flex-col overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center w-full h-full">
              <span className="loading loading-spinner loading-lg" />
            </div>
          ) : (
            <Outlet />
          )}
        </section>
      </div>
    </main>
  );
}

export default Layout;
