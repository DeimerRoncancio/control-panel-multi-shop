import { Transaction } from '../interfaces/transactions-response';
import EmptyState from '../../../shared/ui/EmptyState';
import PriceTag from '../../../shared/ui/PriceTag';
import { cardClass } from '../../../shared/ui/styles';

interface Props {
  transactions: Transaction[];
  isLoading: boolean;
}

const statuses = {
  completed: { label: 'Completada', className: 'bg-mint text-success' },
  pending: { label: 'Pendiente', className: 'bg-sun-soft text-ink' },
  cancelled: { label: 'Cancelada', className: 'bg-rose text-error' },
};

export default function ListTransactions({ transactions, isLoading }: Props) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-10">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (!transactions || transactions.length === 0) {
    return (
      <div className={cardClass}>
        <EmptyState
          title="No hay transacciones disponibles"
          description="Cuando haya pagos aparecerán aquí."
        />
      </div>
    );
  }

  return (
    <div className={`${cardClass} overflow-x-auto p-3`}>
      <table className="table w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Correo</th>
            <th>Monto</th>
            <th>Estado</th>
            <th>Fecha</th>
            <th className="text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => {
            const status = statuses[t.status] ?? statuses.cancelled;

            return (
              <tr key={t.id}>
                <td className="font-mono text-xs font-bold text-ink-muted">
                  #{t.id.substring(0, 8).toUpperCase()}
                </td>
                <td>
                  <div className="font-extrabold text-ink">
                    {t.customerName}
                  </div>
                  <div className="text-xs text-ink-muted">
                    {t.customerPhone}
                  </div>
                </td>
                <td className="text-sm text-ink-soft">{t.customerEmail}</td>
                <td>
                  <PriceTag price={t.amount} />
                </td>
                <td>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${status.className}`}
                  >
                    {status.label}
                  </span>
                </td>
                <td className="text-sm text-ink-soft">
                  {new Date(t.date).toLocaleDateString('es-CO')}
                </td>
                <td className="text-right">
                  <button
                    type="button"
                    className="h-8 rounded-full border border-line px-3 text-xs font-bold text-ink transition-colors hover:border-ink"
                  >
                    Detalles
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
