import { Outlet, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import Aside from '../shared/components/globalComponents/Aside';
import Navbar from '../shared/components/globalComponents/Navbar';
import envs from '../configs/envs';

function Layout() {
  const token = Cookies.get('accessToken');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios(`${envs.API}/app/users/token-validation`, {
      headers: {
        token: token || '',
      },
    })
      .then(() => {})
      .catch(() => navigate('/'))
      .finally(() => setLoading(false));
  }, [token, navigate]);

  return (
    <main className="w-full h-screen flex flex-col">
      <Navbar />
      <div className="flex w-full h-full overflow-y-auto">
        <Aside />
        <section className="w-[80%] h-full flex flex-col overflow-auto">
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
