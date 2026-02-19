import { useQuery } from "@tanstack/react-query";
import axiosGetBearer from "../../../shared/requests/protectedRoutes/get";
import Cookies from 'js-cookie';
import { TransactionsResponse } from "../interfaces/transactions-response";

export default function useTransactions(page: number = 0, size: number = 10) {
  const token = Cookies.get('accessToken');

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["transactions", page, size],
    queryFn: async () => {
      if (!token) throw new Error("No token provided");
      
      const response = await axiosGetBearer({
        url: '/app/transactions/all', 
        token,
        params: { page, size }
      });

      console.log(response);
      
      return response as TransactionsResponse;
    },
    enabled: !!token
  });

  return {
    transactions: data,
    isLoading,
    isError,
    error
  };
}
