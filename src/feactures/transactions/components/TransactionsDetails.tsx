import { FiCheckCircle, FiClock, FiXCircle } from 'react-icons/fi';
import StatCard from '../../../shared/ui/StatCard';

export default function TransactionsDetails() {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <StatCard
        label="Totales"
        value={150}
        hint="Transacciones realizadas"
        icon={FiCheckCircle}
        tone="success"
      />
      <StatCard
        label="Pendientes"
        value={120}
        hint="En proceso de pago"
        icon={FiClock}
        tone="sun"
      />
      <StatCard
        label="Canceladas"
        value={30}
        hint="Rechazadas o canceladas"
        icon={FiXCircle}
        tone="error"
      />
    </div>
  );
}
