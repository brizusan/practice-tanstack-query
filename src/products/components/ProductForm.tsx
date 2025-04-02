import { zodResolver } from "@hookform/resolvers/zod";
import { Image } from "@nextui-org/react";
import { useForm, useWatch } from "react-hook-form";
import z from "zod";
import { useProductMutation } from "../hooks/useProductMutation";
import { Category } from "../interface/products.interface";
import { InputForm } from "./InputForm";

const ProductSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  price: z.coerce.number().min(1, { message: "Price is required" }),
  image: z.string().url({ message: "Url is invalid" }),
  description: z.string().min(1, { message: "Description is required" }),
  category: z.nativeEnum(Category),
});

export type ProductFormData = z.infer<typeof ProductSchema>;

export const ProductForm = () => {
  const { mutation } = useProductMutation();

  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ProductFormData>({
    resolver: zodResolver(ProductSchema),
    mode: "onBlur",
  });

  const imageUrl = useWatch({ control, name: "image" });

  const onSubmit = async (data: ProductFormData) => {
    mutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex justify-between gap-6"
    >
      <div className="space-y-3 mt-8 w-[400px] ">
        <InputForm
          control={control}
          label="Titulo del producto"
          name="title"
          type="text"
          error={errors.title}
        />
        <InputForm
          control={control}
          label="Precio del producto"
          name="price"
          type="number"
          error={errors.price}
        />
        <InputForm
          control={control}
          label="Url del producto"
          name="image"
          type="string"
          error={errors.image}
        />

        <InputForm
          control={control}
          label="Descripcion del producto"
          name="description"
          type="textarea"
          error={errors.description}
        />

        <div>
          <label htmlFor="category">Categoria</label>
          <select
            className="rounded-md p-3 mt-2 bg-gray-800 w-full"
            {...register("category")}
          >
            <option value="men's clothing">Men's clothing</option>
            <option value="women's clothing">Women's clothing</option>
            <option value="jewelery">Jewelery</option>
            <option value="electronics">Electronics</option>
          </select>
          <span className="text-red-500 text-sm italic">
            {errors.category?.message}
          </span>
        </div>

        {mutation.isSuccess && (
          <p className="text-center text-blue-500">
            Producto creado exitosamente
          </p>
        )}
        <br />
        <input
          type="submit"
          disabled={mutation.isPending}
          className="mt-2 disabled:bg-gray-500 bg-blue-500 hover:bg-blue-600 text-center text-white w-full py-2 rounded-lg cursor-pointer"
          value={mutation.isPending ? "loading..." : "crear"}
        />
      </div>

      {/* // tomar el campo image que tenemos en el formulario y mostrarlo en la imagen */}
      {imageUrl ? (
        <div
          className="bg-white rounded-2xl p-10 flex items-center"
          style={{
            width: "500px",
            height: "600px",
          }}
        >
          <Image src={imageUrl} className="object-cover mx-auto" />
        </div>
      ) : (
        <div
          className="bg-gray-100 animate-pulse rounded-2xl p-10 flex items-center"
          style={{
            width: "500px",
            height: "600px",
          }}
        >
          <Image
            src="https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg"
            className="object-cover"
          />
        </div>
      )}
    </form>
  );
};
