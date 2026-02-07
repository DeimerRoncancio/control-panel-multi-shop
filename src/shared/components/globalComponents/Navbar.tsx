import { Link } from 'react-router';
import { FiSearch, FiBell, FiSettings, FiLogOut, FiUser } from 'react-icons/fi';
import { Content } from '../../interfaces/get-users-request';

type Props = {
  user: Content;
}

function Navbar({ user }: Props) {
  return (
    <nav className="h-16 w-full bg-[#1d232a] border-b border-[#2d2d3b] flex items-center justify-between px-6 z-20 shadow-xl relative">
      <div className="flex flex-col">
        <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text tracking-tight">
          Hola, {user?.name + ' ' + (user?.secondName ? user?.secondName : user?.lastnames.split(' ')[0])} 👋
        </h1>
        <span className="text-xs text-gray-500 font-medium">Bienvenido de nuevo a tu panel</span>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative hidden md:block group">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
          <input
            type="text"
            placeholder="Buscar..."
            className="bg-[#252538] border border-[#2d2d3b] text-gray-200 text-sm rounded-xl pl-10 pr-4 py-2 w-64 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all placeholder:text-gray-600 shadow-inner"
          />
        </div>

        <button className="relative p-2 rounded-full text-gray-400 hover:text-white hover:bg-[#252538] transition-all duration-300">
          <FiBell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-pink-500 ring-2 ring-[#1a1a2e] animate-pulse" />
        </button>

        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar online ring-2 ring-[#2d2d3b] ring-offset-2 ring-offset-[#1a1a2e] hover:ring-purple-500/50 transition-all duration-300"
          >
            <div className="w-10 rounded-full">
              <img
                alt="User Avatar"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-2xl bg-[#1d232a] rounded-xl w-56 border border-[#2d2d3b] text-gray-300 transform transition-all duration-200"
          >
            <li className="mb-1 border-b border-[#2d2d3b] pb-2 px-2 pt-1">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">Cuenta</span>
            </li>
            <li>
              <Link to="/profile" className="hover:bg-[#2d2d3b] hover:text-white flex items-center gap-3 py-2 px-3 rounded-lg active:bg-purple-600/20">
                <FiUser size={16} />
                Perfil
                <span className="badge badge-sm bg-purple-500 border-none text-white text-[10px] ml-auto">Nuevo</span>
              </Link>
            </li>
            <li>
              <Link to="/settings" className="hover:bg-[#2d2d3b] hover:text-white flex items-center gap-3 py-2 px-3 rounded-lg active:bg-purple-600/20">
                <FiSettings size={16} />
                Configuración
              </Link>
            </li>
            <div className="divider my-1 before:bg-[#2d2d3b] after:bg-[#2d2d3b]"></div>
            <li>
              <Link to="/" className="text-red-400 hover:bg-red-500/10 hover:text-red-300 flex items-center gap-3 py-2 px-3 rounded-lg active:bg-red-500/20">
                <FiLogOut size={16} />
                Cerrar Sesión
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
