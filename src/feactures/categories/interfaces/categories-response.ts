export interface CategoriesRequest {
  content: Content[];
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

export interface Content {
  id: string;
  categoryName: string;
  products: Product[];
}

export interface CategoriesResponse {
  id: string;
  categoryName: string;
  createdAt: string;
}

export interface Product {
  id: string;
  productName: string;
  price: number;
  mainImage: ProductImage;
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
