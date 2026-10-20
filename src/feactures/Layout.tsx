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
  const [menuOpen, setMenuOpen] = useState(false);

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
    <main className="flex h-screen w-full flex-col bg-cream">
      <Navbar user={user} onOpenMenu={() => setMenuOpen(true)} />
      <div className="flex min-h-0 w-full flex-1">
        <Aside user={user} open={menuOpen} onClose={() => setMenuOpen(false)} />
        <section className="flex min-w-0 flex-1 flex-col overflow-auto">
          {loading ? (
            <div className="flex h-full w-full items-center justify-center">
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
