export interface RequestProductID {
  id: string;
  productName: string;
  description: string;
  price: number;
  productImages: ProductImage[];
  categories: Category[];
  variants: Variants[];
}

export interface Category {
  categoryName: string;
}

export interface Variants {
  id?: string;
  name: string;
  type: 'color' | 'text';
  tag: string;
  listValues: string[];
}

export interface ProductImage {
  name: string;
  imageUrl: string;
  imageId: string;
}
