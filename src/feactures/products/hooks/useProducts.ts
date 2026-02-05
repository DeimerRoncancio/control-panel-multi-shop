import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { RequestProductID } from "../interface/response-productid";
import axiosGetBearer from "../../../shared/requests/protectedRoutes/get";
import Cookies from 'js-cookie';
import { useParams } from "react-router";
import { errorAlert } from "../../../shared/alerts";
import successAlert from "../../../shared/alerts/login/succes.alert";
import axiosPutFormDataBearer from "../../../shared/requests/protectedRoutes/put";
import { ProductType } from "../../../shared/zod/products/product.zod";
import { Content } from "../../categories/interfaces/categories-response";
import { useState } from "react";

export default function useProducts() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [imagesToRemove, setImagesToRemove] = useState<string[]>([]);
  const [variantsToRemove, setVariantsToRemove] = useState<string[]>([]);

  const removeImages = (imageIds: string[], clean = false) => {
    if (clean === true) setImagesToRemove([]);
    setImagesToRemove((prevImages) => [...prevImages, ...imageIds]);
  }

  const removeVariants = (variantIds: string[]) =>
    setVariantsToRemove((prevVariants) => [...prevVariants, ...variantIds]);

  const { mutate, isPending: isUpdating } = useMutation({
    mutationFn: axiosPutFormDataBearer,
    onSuccess: (data) => {
      if (data?.status !== 201 && data?.status !== 200)
        return errorAlert({ message: 'Error al actualizar el producto' });

      successAlert("Producto actualizado con éxito")
      queryClient.invalidateQueries({ queryKey: ["products"] });
    }
  });

  const sendProduct = (data: ProductType) => {
    const token = Cookies.get('accessToken');
    let integerPart = "";

    if (data.price.includes(',')) {
      const lastSeparator = Math.max(data.price.lastIndexOf(","));
      integerPart = data.price.slice(0, lastSeparator).replace(/\D/g, "");
    }

    const imagesToRemoveString = imagesToRemove.join(', ');
    const variantsToRemoveString = variantsToRemove.join(', ');

    const formData = new FormData();

    formData.append('productName', data.productName);
    formData.append('price', parseInt(integerPart).toString());
    formData.append('categoriesList', data.categoriesList.join(', '));
    data.images?.forEach((file) => formData.append('images', file));
    if (data.description) formData.append('description', data.description);
    if (imagesToRemove.length > 0) formData.append('imagesToRemove', imagesToRemoveString);
    if (variantsToRemove.length > 0) formData.append('variantsToRemove', variantsToRemoveString);

    data.variants?.forEach((variant, index) => {
      if (variant.id) formData.append(`variants[${index}].id`, variant.id);
      formData.append(`variants[${index}].name`, variant.name);
      formData.append(`variants[${index}].tag`, variant.tag);
      formData.append(`variants[${index}].type`, variant.type);
      variant.listValues.forEach((value, valueIndex) => {
        formData.append(`variants[${index}].listValues[${valueIndex}]`, value);
      });
    });
  
    mutate({
      url: `/app/products/${id}`,
      data: formData,
      token: token || '',
    });
  };

  const { data: productData } = useQuery<RequestProductID>({
    queryKey: ['products', id],
    queryFn: async () => {
      const token = Cookies.get('accessToken');
      return axiosGetBearer({
        url: `/app/products/${id}`,
        token: token || '',
      });
    },
  });

  const { data: categoriesData, isLoading: categoriesLoading } = useQuery<Content[]>({
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

  return {
    data: { productData, categoriesData, imagesToRemove },
    categoriesLoading,
    remove: { removeImages, removeVariants },
    isUpdating,
    sendProduct
  };
}