import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { ListUsers } from '../components/List-users';
import axiosGetBearer from '../../../shared/requests/protectedRoutes/get';

function Users() {
  const { data } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const token = Cookies.get('accessToken');
      return axiosGetBearer({ url: '/app/users', token: token || '' });
    },
  });

  return (
    <div className="p-6 text-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold">Users Page</h1>

      <p className="mt-4">This is the users page content.</p>

      <ListUsers />
    </div>
  );
}

export default Users;
