import { ProductList } from "../components/ProductList";
import { useProducts } from "../hooks/useProducts";

export const CompleteListPage = () => {
  const { data, isLoading } = useProducts();

  return (
    <div className="flex-col">
      <h1 className="text-2xl font-bold mb-6">Todos los productos</h1>

      {isLoading && <p>Cargando...</p>}
      {data && !isLoading && <ProductList products={data} />}
    </div>
  );
};
