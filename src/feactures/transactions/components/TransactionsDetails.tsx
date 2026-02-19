import { FaUserCheck, FaUsers, FaUserTimes } from "react-icons/fa";

export default function TransactionsDetails() {
  return (
    <div className="stats shadow w-full border border-gray-600">
      <div className="stat">
        <div className="stat-figure text-primary">
          <FaUsers size={35} />
        </div>
        <div className="stat-title">
          Transacciones Totales
        </div>
        <div className="stat-value text-primary">150</div>
        <div className="stat-desc">
          Transacciones realizadas.
        </div>
      </div>

      <div className="stat">
        <div className="stat-figure text-success">
          <FaUserCheck size={35} />
        </div>
        <div className="stat-title">
          Transacciones Pendientes
        </div>
        <div className="stat-value text-success">120</div>
        <div className="stat-desc">
          Transacciones en proceso de pago.
        </div>
      </div>

      <div className="stat">
        <div className="stat-figure text-warning">
          <FaUserTimes size={35} />
        </div>
        <div className="stat-title">
          Transacciones Canceladas
        </div>
        <div className="stat-value text-warning">30</div>
        <div className="stat-desc">
          Transacciones rechazadas o canceladas.
        </div>
      </div>
    </div>
  )
}