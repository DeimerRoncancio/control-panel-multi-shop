import { UpdateProductType } from "../../../shared/zod/products/update.zod";
import { RequestProductID } from "../interface/response-productid";

type ProductTypeParams = {
  product: RequestProductID;
}

export const toUpdateProductType = ({ product }: ProductTypeParams): UpdateProductType => {
  return {
    ...product,
    price: product.price.toString(),
  };
}
