import { Transaction } from "../interfaces/transactions-response";

interface Props {
  transactions: Transaction[];
  isLoading: boolean;
}

export default function ListTransactions({ transactions, isLoading }: Props) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!transactions || transactions.length === 0) {
    return (
      <div className="text-center py-10 text-gray-400">
        No hay transacciones disponibles
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-gray-600 rounded-lg">
      <table className="table w-full">
        <thead>
          <tr className="bg-base-200">
            <th>ID</th>
            <th>Cliente</th>
            <th>Email</th>
            <th>Monto</th>
            <th>Estado</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id} className="hover:bg-base-200/50">
              <td className="font-mono text-xs opacity-70">{t.id.substring(0, 8)}...</td>
              <td>
                <div className="font-bold">{t.customerName}</div>
                <div className="text-xs opacity-50">{t.customerPhone}</div>
              </td>
              <td>{t.customerEmail}</td>
              <td className="font-bold text-success">${t.amount.toFixed(2)}</td>
              <td>
                <div
                  className={`badge gap-2 ${
                    t.status === 'completed'
                      ? 'badge-success badge-outline'
                      : t.status === 'pending'
                      ? 'badge-warning badge-outline'
                      : 'badge-error badge-outline'
                  }`}
                >
                  {t.status === 'completed' ? 'Completada' : t.status === 'pending' ? 'Pendiente' : 'Cancelada'}
                </div>
              </td>
              <td className="text-sm">{new Date(t.date).toLocaleDateString()}</td>
              <th>
                <button className="btn btn-ghost btn-xs">Detalles</button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
