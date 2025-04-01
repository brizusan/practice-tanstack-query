import { Image } from "@nextui-org/react";
import { useNavigate, useParams } from "react-router-dom";
import { useProduct } from "../hooks/useProduct";

export const ProductDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  if (!id) return <p>No se ha encontrado el producto</p>;

  const { data, isLoading, isError, error } = useProduct({ id });

  return (
    <div className=" space-y-8 w-full">
      <div className="flex justify-center pt-4">
        <button onClick={() => navigate(-1)} className="font-bold">
          ◀️ Volver atras
        </button>
      </div>
      <h1 className="text-xl lg:text-2xl font-bold my-16">
        Product Detail Page -{data?.title}
      </h1>

      {isLoading && <p>Cargando...</p>}
      {isError && <p>Error: {error?.message}</p>}
      {!isLoading && (
        <section className="flex gap-6 items-center max-w-2xl mx-auto ">
          <figure className="w-full">
            <Image
              src={data?.image}
              width={400}
              height={650}
              className="rounded sm:p-0 bg-white object-contain"
              alt="product"
            />
          </figure>

          <section className="space-y-3 max-w-md">
            <p className="text-xl font-bold text-center">{data?.title}</p>
            <span className="text-sm text-center inline-block mt-2 px-2 py-1 bg-white text-slate-800 rounded-lg">
              {" "}
              {data?.category}
            </span>
            <p className="text-sm  text-center">{data?.description}</p>
            <p>
              <span className="font-bold">Rating:</span> {data?.rating.rate} de
              5 ({data?.rating.count} valoraciones)
            </p>
          </section>
        </section>
      )}
    </div>
  );
};
