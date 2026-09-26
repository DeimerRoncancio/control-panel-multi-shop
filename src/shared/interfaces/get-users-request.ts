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

// Espejo de UserResponseDTO: es lo único que devuelve la API en
// /app/users, /app/users/by-role, /app/users/search y /app/users/latest-users.
export interface Content {
  id: string;
  name: string;
  imageUser: ImageUser | null;
  secondName: null | string;
  lastnames: string;
  phoneNumber: number | null;
  gender: string;
  email: string;
  admin: boolean;
  enabled: boolean;
}

export interface ImageUser {
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
