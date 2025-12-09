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
import { CategoriesRequest } from "../../categories/interfaces/categories-response";
import { useState } from "react";

export default function useProducts() {
  const { id } = useParams();
  const [imagesToRemove, setImagesToRemove] = useState<string[]>([]);

  const deleteImage = (imageId: string) => setImagesToRemove(prev => [...prev, imageId]);

  const { mutate } = useMutation({
    mutationFn: axiosPutBearer,
    onSuccess: () => successAlert("Producto actualizado con éxito"),
    onError: (error: any) => errorAlert({ message: 'Error al actualizar el producto' + error.message }),
  });

  const updateProduct: SubmitHandler<UpdateProductType> = (data) => {
    const token = Cookies.get('accessToken');

    const lastSeparator = Math.max(data.price.lastIndexOf(","));
    const integerPart = data.price.slice(0, lastSeparator).replace(/\D/g, "");
    const formData = new FormData();
    const imagesToRemoveString = imagesToRemove.join(', ');

    formData.append('productName', data.productName);
    if (data.description) formData.append('description', data.description);
    formData.append('price', parseInt(integerPart).toString());
    formData.append('categoriesList', data.categoriesList.join(', '));
    data.images?.forEach((file) => formData.append('images', file));
    if (imagesToRemove.length > 0) formData.append('imagesToRemove', imagesToRemoveString);

    mutate({
      url: `${envs.API}/app/products/${id}`,
      data: formData,
      token: token || '',
    });
  };

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

  const { data: categoriesData, isLoading: categoriesLoading } = useQuery<CategoriesRequest>({
    queryKey: ['categories'],
    queryFn: async () => {
      const token = Cookies.get('accessToken');
      return axiosGetBearer({
        url: '/app/categories',
        token: token || '',
        params: { page: 0, size: 20 }
      });
    },
  });

  return { productData, categoriesData, categoriesLoading, deleteImage, updateProduct };
}