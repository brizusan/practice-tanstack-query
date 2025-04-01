import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/product.service";

export const useProducts = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
  return {
    data,
    isLoading,
  };
};
