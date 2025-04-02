import { ProductForm } from "../components/ProductForm";

export const NewProduct = () => {
  return (
    <div className="w-full flex-col">
      <h1 className="text-2xl font-bold">Nuevo producto</h1>

      <section className="max-w-7xl mx-auto">
        <ProductForm />
      </section>
    </div>
  );
};
