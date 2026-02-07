import { FaHistory } from "react-icons/fa";
import { Content } from "../../../shared/interfaces/get-users-request";

type Props = {
  users: Content[]
}

export default function LatestUsers({ users }: Props) {
  return (
    <div className="flex flex-col gap-3">
      {users.map((u) => (
        <div key={u.id} className="flex items-center gap-3 p-3 bg-base-100 rounded-xl">
          <div className="avatar">
            <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={`https://ui-avatars.com/api/?name=${u.name.charAt(0)}+${u.lastnames.charAt(0)}&background=random`}
                alt="user"
              />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-sm truncate">{u.name + " " + (u.secondName ?? "") + " " + u.lastnames}</div>
            <div className="text-xs opacity-50 flex items-center gap-1">
              <FaHistory className="text-[10px]" /> { }{new Date(u.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}