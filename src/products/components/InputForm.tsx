import { Control, Controller, FieldError } from "react-hook-form";
import { ProductFormData } from "./ProductForm";

type InputFormProps = {
  name: keyof ProductFormData;
  control: Control<ProductFormData>;
  label: string;
  type?: string;
  error?: FieldError;
};

export const InputForm = ({
  label,
  name,
  control,
  type,
  error,
}: InputFormProps) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) =>
          type === "textarea" ? (
            <textarea
              id={name}
              {...field}
              className={`form-control ${error ? "is-invalid" : ""}`}
            />
          ) : (
            <input
              id={name}
              type={type}
              {...field}
              className={`form-control ${error ? "is-invalid" : ""}`}
            />
          )
        }
      />

      {error && <p className="error">{error.message}</p>}
    </div>
  );
};
