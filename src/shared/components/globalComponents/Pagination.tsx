import { GetUserRequest } from '../../interfaces/get-users-request';

function Pagination({
  pagination,
  setPagination,
  data,
}: {
  pagination: { page: number; size: number };
  setPagination: React.Dispatch<
    React.SetStateAction<{ page: number; size: number }>
  >;
  data: GetUserRequest | undefined;
}) {
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
