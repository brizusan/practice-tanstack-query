import { useQuery } from "@tanstack/react-query";
import { getProductsByCategory } from "../services/product.service";

export const useProductCategory = ({ category }: { category: string }) => {
  const productsCategory = useQuery({
    queryKey: ["products", "category"],
    queryFn: () => getProductsByCategory(category),
    staleTime: 1000 * 60 * 5, // 1 minutos
  });

  return {
    productsCategory,
  };
};
