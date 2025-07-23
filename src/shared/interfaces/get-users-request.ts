export interface GetUserRequest {
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
  name: string;
  imageUser: ImageUser;
  secondName: null | string;
  lastnames: string;
  phoneNumber: number | null;
  gender: string;
  email: string;
  password: string;
  orders: Order[];
  roles: Role[];
  admin: boolean;
  enabled: boolean;
}

export interface ImageUser {
  id: string;
  name: string;
  imageUrl: string;
  imageId: string;
}

export interface Order {
  id: string;
  orderName: string;
  notes: string;
  orderDate: Date;
  product: any[];
}

export interface Role {
  id: string;
  role: string;
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
