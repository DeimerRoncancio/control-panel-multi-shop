import { useSearchParams } from "react-router";
import ButtonModal from "../../../shared/components/globalComponents/ButtonModal";
import Pagination from "../../../shared/components/globalComponents/Pagination";
import ListTransactions from "../components/List-transactions";
import SearchTransactions from "../components/SearchTransactions";
import TransactionsDetails from "../components/TransactionsDetails";
import useTransactions from "../hooks/useTransactions";

export default function Transactions() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "0");
  const size = 10;
  
  // const { transactions, isLoading, isError } = useTransactions(page, size);

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
      {/* <ListTransactions 
        transactions={transactions?.content || []} 
        isLoading={isLoading} 
      /> */}
      {/* {!isLoading && !isError && transactions && (
        <Pagination 
          page={page} 
          setPagination={setSearchParams} 
          data={transactions} 
        />
      )} */}
    </div>
  );
}
