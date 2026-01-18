import { SetURLSearchParams } from 'react-router';
import { CategoriesRequest } from '../../../feactures/categories/interfaces/categories-response';
import { GetUserRequest } from '../../interfaces/get-users-request';

type Props = {
  page: number;
  setPagination: SetURLSearchParams;
  data: CategoriesRequest | GetUserRequest | undefined;
}

function Pagination({ page, setPagination, data }: Props) {
  if (data?.totalPages === 0 || data?.totalPages === 1) {
    return null;
  }
  
  return (
    <div className="flex items-center justify-center mt-4">
      <div className="join">
        <button
          onClick={() =>
            setPagination && setPagination({ page: String(Number(page) - 1) })
          }
          type="button"
          className="join-item btn"
          disabled={page === 0}
        >
          «
        </button>
        <button type="button" className="join-item btn">
          {page + 1}
        </button>
        <button
          onClick={() =>
            setPagination && setPagination({ page: String(page + 1) })
          }
          type="button"
          className="join-item btn"
          disabled={data?.totalPages === page + 1}
        >
          »
        </button>
      </div>
    </div>
  );
}

export default Pagination;
