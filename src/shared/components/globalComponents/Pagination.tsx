import { SetURLSearchParams } from 'react-router';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { CategoriesRequest } from '../../../feactures/categories/interfaces/categories-response';
import { GetUserRequest } from '../../interfaces/get-users-request';
import { TransactionsResponse } from '../../../feactures/transactions/interfaces/transactions-response';

type Props = {
  page: number;
  setPagination: SetURLSearchParams;
  data: CategoriesRequest | GetUserRequest | TransactionsResponse | undefined;
};

const arrowClass = `grid h-10 w-10 place-items-center rounded-full border border-line bg-base-100 text-ink
  transition-colors hover:border-ink disabled:pointer-events-none disabled:opacity-40`;

function Pagination({ page, setPagination, data }: Props) {
  if (data?.totalPages === 0 || data?.totalPages === 1) {
    return null;
  }

  return (
    <nav
      className="mt-5 flex items-center justify-center gap-2"
      aria-label="Paginación"
    >
      <button
        onClick={() =>
          setPagination && setPagination({ page: String(Number(page) - 1) })
        }
        type="button"
        aria-label="Página anterior"
        className={arrowClass}
        disabled={page === 0}
      >
        <FiChevronLeft size={18} />
      </button>
      <span className="flex h-10 items-center rounded-full bg-ink px-4 text-sm font-bold text-white tabular-nums">
        Página {page + 1}
        {data?.totalPages ? (
          <span className="ml-1 font-semibold text-white/60">
            de {data.totalPages}
          </span>
        ) : null}
      </span>
      <button
        onClick={() =>
          setPagination && setPagination({ page: String(page + 1) })
        }
        type="button"
        aria-label="Página siguiente"
        className={arrowClass}
        disabled={data?.totalPages === page + 1}
      >
        <FiChevronRight size={18} />
      </button>
    </nav>
  );
}

export default Pagination;
