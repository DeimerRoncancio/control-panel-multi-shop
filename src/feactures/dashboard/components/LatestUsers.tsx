import { FiMail } from 'react-icons/fi';
import { Content } from '../../../shared/interfaces/get-users-request';
import UserAvatar from '../../../shared/ui/UserAvatar';

type Props = {
  users: Content[];
};

export default function LatestUsers({ users }: Props) {
  if (users.length === 0)
    return (
      <p className="my-4 text-center text-sm text-ink-muted">
        No hay usuarios disponibles
      </p>
    );

  return (
    <ul className="flex flex-col gap-2">
      {users.map((u) => (
        <li
          key={u.id}
          className="flex items-center gap-3 rounded-xl border border-line p-2.5"
        >
          <UserAvatar
            name={u.name}
            lastnames={u.lastnames}
            imageUrl={u.imageUser?.imageUrl}
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-extrabold text-ink">
              {`${u.name} ${u.secondName ?? ''} ${u.lastnames}`.replace(
                /\s+/g,
                ' '
              )}
            </p>
            <p className="flex items-center gap-1 truncate text-xs text-ink-muted">
              <FiMail size={11} className="shrink-0 text-brand" /> {u.email}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
