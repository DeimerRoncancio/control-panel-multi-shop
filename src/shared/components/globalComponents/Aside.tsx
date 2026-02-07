import { Link, useLocation } from 'react-router';
import { FaStore, FaUsers } from 'react-icons/fa';
import { BiSolidCategory } from 'react-icons/bi';
import { RiAdminFill } from "react-icons/ri";
import { AiFillHome } from 'react-icons/ai';
import { Content } from '../../interfaces/get-users-request';

const NAV_ITEMS = [
  { path: '/dashboard', label: 'Inicio', icon: AiFillHome },
  { path: '/products', label: 'Productos', icon: FaStore },
  { path: '/categories', label: 'Categorías', icon: BiSolidCategory },
  { path: '/users', label: 'Usuarios', icon: FaUsers },
  { path: '/admins', label: 'Administradores', icon: RiAdminFill },
];

type Props = {
  user: Content
}

function Aside({ user }: Props) {
  const location = useLocation();

  return (
    <aside className="h-full w-[20%] border-r border-[#343e4f] bg-[#1d232a] text-gray-300 flex flex-col shadow-xl">
      <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto custom-scrollbar">
        {NAV_ITEMS.map(({ path, label, icon: Icon }) => {
          const isActive = location.pathname.startsWith(path);

          return (
            <Link
              key={path}
              to={path}
              className={`
                relative group flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300
                ${isActive
                  ? 'bg-gradient-to-r from-[#3e3c61] to-[#2b2a4a] text-white shadow-lg shadow-purple-900/20 translate-x-1'
                  : 'hover:bg-[#252538] hover:text-white hover:translate-x-1'
                }
              `}
            >
              <div className={`
                p-2 rounded-lg transition-colors duration-300
                ${isActive 
                  ? 'bg-purple-600/30 text-purple-300' 
                  : 'bg-gray-800/40 text-gray-400 group-hover:bg-purple-500/20 group-hover:text-purple-300'
                }
              `}>
                <Icon size={18} />
              </div>

              <span className={`font-medium tracking-wide ${isActive ? 'font-semibold' : ''}`}>
                {label}
              </span>

              {isActive && (
                <div className="absolute right-4 w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_10px_rgba(192,132,252,0.8)]" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[#2d2d3b]">
        <div className="flex items-center gap-3 p-2 rounded-lg bg-[#252538]/50 border border-[#2d2d3b]/50">
           <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold text-white shadow-md">
             {user?.name?.[0]}{user?.lastnames?.[0]}
           </div>
           <div className="flex flex-col">
              <span className="text-xs font-semibold text-white">
                {user?.name + ' ' + user?.lastnames.split(' ')[0]}
              </span>
              <span className="text-[10px] text-gray-500">Online</span>
           </div>
        </div>
      </div>
    </aside>
  );
}

export default Aside;
