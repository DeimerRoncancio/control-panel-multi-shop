import { Link, useLocation } from 'react-router';
import {
  FiBox,
  FiChevronRight,
  FiFileText,
  FiGrid,
  FiHome,
  FiShield,
  FiUsers,
  FiX,
} from 'react-icons/fi';
import { Content } from '../../interfaces/get-users-request';
import UserAvatar from '../../ui/UserAvatar';

const NAV_GROUPS = [
  {
    title: 'General',
    items: [{ path: '/dashboard', label: 'Inicio', icon: FiHome }],
  },
  {
    title: 'Catálogo',
    items: [
      { path: '/products', label: 'Productos', icon: FiBox },
      { path: '/categories', label: 'Categorías', icon: FiGrid },
    ],
  },
  {
    title: 'Personas',
    items: [
      { path: '/users', label: 'Usuarios', icon: FiUsers },
      { path: '/admins', label: 'Administradores', icon: FiShield },
    ],
  },
  {
    title: 'Ventas',
    items: [
      { path: '/transactions', label: 'Transacciones', icon: FiFileText },
    ],
  },
];

type Props = {
  user: Content;
  open: boolean;
  onClose: () => void;
};

function Aside({ user, open, onClose }: Props) {
  const location = useLocation();

  return (
    <>
      <div
        aria-hidden
        onClick={onClose}
        className={`fixed inset-0 z-30 bg-ink/50 backdrop-blur-[2px] transition-opacity lg:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-line bg-base-100 transition-transform duration-200 lg:static lg:z-auto lg:w-64 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-line px-4 lg:hidden">
          <img
            src="/svg/logo.svg"
            alt="Multi Shop"
            className="-ml-2 h-12 w-auto"
          />
          <button
            type="button"
            aria-label="Cerrar menú"
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full text-ink-soft transition-colors hover:bg-cream"
          >
            <FiX size={20} />
          </button>
        </div>

        <nav
          className="flex-1 overflow-y-auto px-3 py-5"
          aria-label="Menú del panel"
        >
          {NAV_GROUPS.map((group) => (
            <div key={group.title} className="mb-4">
              <p className="mb-1.5 px-3 text-[11px] font-extrabold uppercase tracking-[0.12em] text-ink-muted">
                {group.title}
              </p>
              <ul className="flex flex-col gap-0.5">
                {group.items.map(({ path, label, icon: Icon }) => {
                  const isActive = location.pathname.startsWith(path);

                  return (
                    <li key={path}>
                      <Link
                        to={path}
                        onClick={onClose}
                        aria-current={isActive ? 'page' : undefined}
                        className={`group relative flex h-11 items-center gap-3 rounded-lg px-3 text-sm transition-colors ${
                          isActive
                            ? 'bg-brand-soft font-bold text-brand'
                            : 'font-semibold text-ink hover:bg-cream hover:text-brand'
                        }`}
                      >
                        {isActive && (
                          <span
                            aria-hidden
                            className="absolute inset-y-2 left-0 w-1 rounded-full bg-brand"
                          />
                        )}
                        <Icon size={18} />
                        <span className="flex-1">{label}</span>
                        <FiChevronRight
                          size={15}
                          className={`transition-transform group-hover:translate-x-0.5 ${
                            isActive ? '' : 'text-ink-muted'
                          }`}
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="border-t border-line p-3">
          <div className="flex items-center gap-3 rounded-xl bg-cream p-2.5">
            <UserAvatar
              name={user?.name}
              lastnames={user?.lastnames}
              imageUrl={user?.imageUser?.imageUrl}
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-extrabold text-ink">
                {user
                  ? `${user.name} ${user.lastnames?.split(' ')[0] ?? ''}`
                  : 'Cargando…'}
              </p>
              <p className="flex items-center gap-1.5 text-[11px] font-semibold text-success">
                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                En línea
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Aside;
