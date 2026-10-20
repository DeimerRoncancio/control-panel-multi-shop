import { FiPlus } from 'react-icons/fi';
import ButtonModal from '../../../shared/components/globalComponents/ButtonModal';
import SearchTransactions from '../components/SearchTransactions';
import TransactionsDetails from '../components/TransactionsDetails';
import PageHeader from '../../../shared/ui/PageHeader';
import { pageClass, primaryButtonClass } from '../../../shared/ui/styles';

export default function Transactions() {
  return (
    <div className={pageClass}>
      <PageHeader
        eyebrow="Ventas"
        title="Transacciones"
        description="Pagos y pedidos hechos en la tienda."
        actions={
          <ButtonModal
            idModal="create_transaction"
            className={primaryButtonClass}
          >
            <FiPlus size={16} />
            Crear transacción
          </ButtonModal>
        }
      />
      <TransactionsDetails />
      <SearchTransactions />
    </div>
  );
}
