import { Link, useLocation } from 'react-router';

function Aside() {
  const location = useLocation();
  const style =
    'bg-gradient-to-r from-[#1e1c3a] to-[#2b1f46] text-[#c5a0f7] hover:bg-[#2a2140] transition ';

  return (
    <aside className="h-full w-[20%] border-r-2 border-gray-700 py-2">
      <div className="flex flex-col h-full">
        <ul className="w-full">
          <li className="w-full flex flex-col items-center">
            <Link
              to="/dashboard"
              className={`flex items-center gap-2 rounded-xl px-4 py-4 text-sm w-[90%] ${location.pathname === '/dashboard' ? style : 'hover:bg-gray-800'} `}
            >
              <span className="text-white z-10 font-bold ">Inicio</span>
            </Link>
            <Link
              to="/products"
              className={`flex items-center gap-2 rounded-xl px-4 py-4 text-sm w-[90%] ${location.pathname === '/products' ? style : 'hover:bg-gray-800'} `}
            >
              <span className="text-white z-10 font-bold ">Productos</span>
            </Link>
            <Link
              to="/categories"
              className={`flex items-center gap-2 rounded-xl px-4 py-4 text-sm w-[90%] ${location.pathname === '/categories' ? style : 'hover:bg-gray-800'} `}
            >
              <span className="text-white z-10 font-bold ">Categorías</span>
            </Link>
            <Link
              to="/users"
              className={`flex items-center gap-2 rounded-xl px-4 py-4 text-sm w-[90%] ${location.pathname === '/users' ? style : 'hover:bg-gray-800'} `}
            >
              <span className="text-white z-10 font-bold ">Usuarios</span>
            </Link>
            <Link
              to="/admins"
              className={`flex items-center gap-2 rounded-xl px-4 py-4 text-sm w-[90%] ${location.pathname === '/admins' ? style : 'hover:bg-gray-800'} `}
            >
              <span className="text-white z-10 font-bold ">
                Administradores
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default Aside;
