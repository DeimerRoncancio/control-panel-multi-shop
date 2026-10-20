import { Link } from 'react-router';
import {
  FiBell,
  FiLogOut,
  FiMenu,
  FiSearch,
  FiSettings,
  FiUser,
} from 'react-icons/fi';
import { Content } from '../../interfaces/get-users-request';
import UserAvatar from '../../ui/UserAvatar';

type Props = {
  user: Content;
  onOpenMenu: () => void;
};

const rowClass = `flex items-center gap-3 rounded-xl px-2.5 py-2 text-sm font-bold text-ink transition-colors
  hover:bg-cream`;

function Navbar({ user, onOpenMenu }: Props) {
  const firstLastname = user?.lastnames?.split(' ')[0] ?? '';

  return (
    <nav className="relative z-30 flex h-16 w-full shrink-0 items-center gap-3 border-t-4 border-brand-dark bg-brand px-4 text-white sm:px-6">
      <button
        type="button"
        aria-label="Abrir menú"
        onClick={onOpenMenu}
        className="grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-white/15 lg:hidden"
      >
        <FiMenu size={20} />
      </button>

      <Link
        to="/dashboard"
        className="flex shrink-0 items-center gap-2.5 transition-transform hover:-rotate-1"
      >
        <img
          src="/svg/logo-fondo-naranja.svg"
          alt="Multi Shop"
          className="-ml-2 hidden h-12 w-auto sm:block"
        />
        <img
          src="/svg/simbolo-blanco.svg"
          alt="Multi Shop"
          className="h-8 w-auto sm:hidden"
        />
        <span className="rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-[0.12em] ring-1 ring-white/25">
          Panel
        </span>
      </Link>

      <label className="relative ml-auto hidden w-full max-w-md md:block">
        <FiSearch
          size={16}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted"
        />
        <input
          type="text"
          placeholder="Buscar en el panel…"
          className="h-10 w-full rounded-full border-2 border-white bg-base-100 pl-10 pr-4 text-sm text-ink outline-none placeholder:text-ink-muted focus:ring-4 focus:ring-white/30"
        />
      </label>

      <div className="ml-auto flex items-center gap-1.5 md:ml-2">
        <button
          type="button"
          aria-label="Notificaciones"
          className="relative grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-white/15"
        >
          <FiBell size={19} />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-sun ring-2 ring-brand" />
        </button>

        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="flex items-center gap-2.5 rounded-full py-1 pl-1 pr-1 transition-colors hover:bg-white/15 sm:pr-3"
          >
            <UserAvatar
              name={user?.name}
              lastnames={user?.lastnames}
              imageUrl={user?.imageUser?.imageUrl}
              className="ring-2 ring-white"
            />
            <span className="hidden text-left leading-tight sm:block">
              <span className="block text-sm font-extrabold">
                {user ? `${user.name} ${firstLastname}` : 'Cargando…'}
              </span>
              <span className="block text-[11px] font-semibold text-white/80">
                Administrador
              </span>
            </span>
          </div>
          <div
            tabIndex={0}
            className="dropdown-content z-40 mt-3 w-64 overflow-hidden rounded-2xl border border-line bg-base-100 text-ink shadow-xl"
          >
            <div className="flex items-center gap-3 border-b border-line bg-brand-soft/60 px-3 py-3">
              <UserAvatar
                name={user?.name}
                lastnames={user?.lastnames}
                imageUrl={user?.imageUser?.imageUrl}
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-extrabold">
                  {user ? `${user.name} ${firstLastname}` : ''}
                </p>
                <p className="truncate text-xs text-ink-muted">{user?.email}</p>
              </div>
            </div>
            <ul className="flex flex-col gap-0.5 p-2">
              <li>
                <Link to="/profile" className={rowClass}>
                  <FiUser size={16} className="text-brand" />
                  Perfil
                </Link>
              </li>
              <li>
                <Link to="/settings" className={rowClass}>
                  <FiSettings size={16} className="text-brand" />
                  Configuración
                </Link>
              </li>
            </ul>
            <div className="border-t border-line p-2">
              <Link
                to="/"
                className="flex items-center gap-3 rounded-xl px-2.5 py-2 text-sm font-bold text-error transition-colors hover:bg-error/10"
              >
                <FiLogOut size={16} />
                Cerrar sesión
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
