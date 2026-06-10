import type { UseFormRegister, FieldValues, Path } from "react-hook-form";

type InputTextProps<T extends FieldValues> = {
  label: string;
  nama: Path<T>;
  register: UseFormRegister<T>;
  error?: string;
  type?: string;
};

export function InputText<T extends FieldValues>({
  label,
  nama,
  register,
  error,
  type = "text",
}: InputTextProps<T>) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-[#3e2f1c]">
        {label}
      </label>

      <input
        type={type}
        {...register(nama)}
        className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:border-[#802D43] focus:ring-2 focus:ring-[#802D43]/10 ${
          error ? "border-red-400" : "border-gray-200"
        }`}
      />

      {error && (
        <p className="text-xs font-medium text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

export default InputText;