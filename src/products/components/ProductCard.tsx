import { Card, Image } from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils";
import { Product } from "../interface/products.interface";
import { getProductById } from "../services/product.service";

type ProductCardProps = {
  product: Product;
};

export const ProductCard = ({ product }: ProductCardProps) => {
  const queryClient = useQueryClient();

  const prefetchProduct = () => {
    console.log("desde prefetchProduct");

    queryClient.prefetchQuery({
      queryKey: ["product", product.id],
      queryFn: () => getProductById(product.id),
      staleTime: 1000 * 60, // 1 minutos
    });
  };

  return (
    <Card className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white">
      <div
        onMouseEnter={prefetchProduct}
        className="w-full md:w-1/3 bg-white grid place-items-center"
      >
        <Image
          src={product.image}
          alt="tailwind logo"
          width={300}
          height={400}
          className="rounded-xl p-5 sm:p-0 bg-white"
        />
      </div>
      <div className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
        <div className="flex justify-between item-center">
          <p className="text-gray-500 font-medium hidden md:block">
            {product.category}
          </p>
        </div>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-black text-gray-800 hover:underline md:text-lg lg:text-2xl">
            {product.title}
          </h3>
        </Link>

        <p className="md:text-lg text-gray-500 text-base line-clamp-3 ">
          {product.description}
        </p>

        <p className="text-xl font-black text-gray-800">
          {formatCurrency(product.price)}
          <span className="font-normal text-gray-600 text-base">
            {" "}
            +impuesto
          </span>
        </p>
      </div>
    </Card>
  );
};
