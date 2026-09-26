import ButtonModal from "../../../shared/components/globalComponents/ButtonModal";
import SearchTransactions from "../components/SearchTransactions";
import TransactionsDetails from "../components/TransactionsDetails";

export default function Transactions() {
  return (
    <div className="p-6 text-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold">Gestion de Transacciones</h1>
          <p className="mt-2 text-sm text-gray-400 mb-4">
            Administra las transacciones de la aplicacion.
          </p>
        </div>
        <ButtonModal idModal="create_transaction" className="btn btn-success">
          Crear Transacción
        </ButtonModal>
      </div>
      <TransactionsDetails />
      <SearchTransactions />
    </div>
  );
}
