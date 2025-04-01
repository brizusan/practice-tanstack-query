import { ProductList } from "../components/ProductList";
import { useProductCategory } from "../hooks/useProductCategory";

export const MensPage = () => {
  const { productsCategory } = useProductCategory({
    category: "men's clothing",
  });

  const productsData = productsCategory.data ?? [];

  return (
    <div className="flex-col">
      <h1 className="text-2xl font-bold">Productos para hombres</h1>
      {productsCategory.isLoading && <p>Cargando...</p>}
      {!productsCategory.isLoading && productsCategory.data?.length === 0 && (
        <p>No hay productos para esta categoria</p>
      )}
      <ProductList products={productsData} />
    </div>
  );
};
