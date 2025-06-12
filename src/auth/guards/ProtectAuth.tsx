import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Outlet, useNavigate } from 'react-router';
import axiosGet from '../../shared/requests/basicRequests/get';
import envs from '../../configs/envs';

function ProtectAuth() {
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
    <div className="min-h-screen bg-base-200">
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <span className="loading loading-spinner loading-lg" />
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
}

export default ProtectAuth;
