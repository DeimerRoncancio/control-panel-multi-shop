export interface ProductsRequest {
  content: Content[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  empty: boolean;
}

export interface Content {
  id: string;
  productName: string;
  description: string;
  price: number;
  productImages: ProductImage[];
  categories: Category[];
}

export interface Category {
  categoryName: string;
}

export interface ProductImage {
  name: string;
  imageUrl: string;
  imageId: string;
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
  sorted: boolean;
  empty: boolean;
  unsorted: boolean;
}
