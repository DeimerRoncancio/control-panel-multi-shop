import { useMutation, useQuery } from "@tanstack/react-query";
import { RequestProductID } from "../interface/response-productid";
import axiosGetBearer from "../../../shared/requests/protectedRoutes/get";
import Cookies from 'js-cookie';
import { useParams } from "react-router";
import envs from "../../../configs/envs";
import { SubmitHandler } from "react-hook-form";
import { errorAlert } from "../../../shared/alerts";
import successAlert from "../../../shared/alerts/login/succes.alert";
import axiosPutBearer from "../../../shared/requests/protectedRoutes/put";
import { UpdateProductType } from "../../../shared/zod/products/update.zod";

export default function useProducts() {
  const { id } = useParams();

  const { data: productData } = useQuery<RequestProductID>({
    queryKey: ['products'],
    queryFn: async () => {
      const token = Cookies.get('accessToken');
      return axiosGetBearer({
        url: `/app/products/${id}`,
        token: token || '',
      });
    },
  });

  const { mutate } = useMutation({
    mutationFn: axiosPutBearer,
    onSuccess: () => successAlert("Producto actualizado con éxito"),
    onError: (error: any) => errorAlert({ message: 'Error al actualizar el producto' + error.message }),
  });

  const updateProduct: SubmitHandler<UpdateProductType> = (data) => {
    const token = Cookies.get('accessToken');

    const lastSeparator = Math.max(data.price.lastIndexOf(","));
    const integerPart = data.price.slice(0, lastSeparator).replace(/\D/g, "");

    const requestData = {
      productName: data.productName,
      description: data.description,
      price: parseInt(integerPart),
      categoriesList: 'Gamer, Videojuegos',
      variantsList: 'talla-fc-barcelona-1',
    };

    mutate({
      url: `${envs.API}/app/products/${id}`,
      data: requestData,
      token: token || '',
    });
  };

  return { productData, updateProduct };
}