import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../services/product.service";

export const useProduct = ({ id }: { id: string }) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
  });

  return {
    data,
    isLoading,
    isError,
    error,
  };
};
