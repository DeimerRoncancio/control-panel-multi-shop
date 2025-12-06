export interface RequestProductID {
  id: string;
  productName: string;
  description: string;
  price: string;
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
