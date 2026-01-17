import { CategoriesRequest } from '../../../feactures/categories/interfaces/categories-response';

type Props = {
  pagination: { page: number; size: number };
  setPagination: React.Dispatch<React.SetStateAction<{ page: number; size: number }>>;
  data: CategoriesRequest | undefined;
}

function Pagination({ pagination, setPagination, data }: Props) {
  return (
    <div className="flex items-center justify-center mt-4">
      <div className="join">
        <button
          onClick={() =>
            setPagination({ ...pagination, page: pagination.page - 1 })
          }
          type="button"
          className="join-item btn"
          disabled={pagination.page === 0}
        >
          «
        </button>
        <button type="button" className="join-item btn">
          {pagination.page + 1}
        </button>
        <button
          onClick={() =>
            setPagination({ ...pagination, page: pagination.page + 1 })
          }
          type="button"
          className="join-item btn"
          disabled={data?.totalPages === pagination.page + 1}
        >
          »
        </button>
      </div>
    </div>
  );
}

export default Pagination;
