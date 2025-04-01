import { useQuery } from "@tanstack/react-query";
import { getProductsByCategory } from "../services/product.service";

export const useProductCategory = ({ category }: { category: string }) => {
  const productsCategory = useQuery({
    queryKey: ["products", "category"],
    queryFn: () => getProductsByCategory(category),
  });

  return {
    productsCategory,
  };
};
