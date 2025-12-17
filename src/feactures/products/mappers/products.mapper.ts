import { ProductType } from "../../../shared/zod/products/product.zod";
import { RequestProductID } from "../interface/response-productid";

type ProductTypeParams = {
  product: RequestProductID;
}

export const toUpdateProductType = ({ product }: ProductTypeParams): ProductType => {
  return {
    ...product,
    price: product.price.toString(),
    categoriesList: product.categories.map(category => category.categoryName),
  };
}
