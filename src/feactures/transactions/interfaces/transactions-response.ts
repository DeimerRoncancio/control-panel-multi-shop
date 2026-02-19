export interface TransactionsResponse {
  content: Transaction[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export interface Transaction {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  amount: number;
  status: 'completed' | 'pending' | 'cancelled';
  date: string;
  paymentMethod: string;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
