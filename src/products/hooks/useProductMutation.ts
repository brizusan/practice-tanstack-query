import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Product } from "../interface/products.interface";
import { createProduct } from "../services/product.service";

export const useProductMutation = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createProduct,
    onError: (error) => {
      console.error("Error creating product:", error);
    },
    onSuccess: (data) => {
      // queryClient.invalidateQueries({
      //   queryKey: ["products", "category"],
      // });

      queryClient.setQueryData<Product[]>(["products", "category"], (old) => {
        if (!old) return [data];
        return [...old, data];
      });

      if (data?.id) {
        setTimeout(() => {
          navigate("/"); // Redirección con React Router DOM
        }, 1000);
      }
    },
  });
  return {
    mutation,
  };
};
