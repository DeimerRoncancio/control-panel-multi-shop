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
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    axios(`${envs.API}/app/users/me`, {
      headers: {
        token: token || '',
        Authorization: `Bearer ${token || ''}`,
      },
    })
      .then((response) => {
        if (response.data.admin === false) navigate('/');
        setUser(response.data);
      })
      .catch(() => navigate('/'))
      .finally(() => setLoading(false));
  }, [token, navigate]);

  return (
    <main className="w-full h-screen flex flex-col">
      <Navbar user={user} />
      <div className="flex w-full h-full overflow-y-auto">
        <Aside user={user} />
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
