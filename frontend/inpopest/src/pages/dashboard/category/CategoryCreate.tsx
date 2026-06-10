import { z } from "zod";
import { InputText } from "../../../components/ui/InputText";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";
import { createCategory } from "../../../services/dashboardDataService";

type FormData = {
  name: string;
};

const schema = z.object({
  name: z.string().min(1, "Nama Category harus diisi"),
});

export default function CategoryCreate() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await createCategory(data);
      alert("Category berhasil ditambahkan");
      reset();
      navigate("/dashboard/category");
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat menambahkan category");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">
          Add New Category Event
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <InputText
            label="Category Event"
            nama="name"
            register={register}
            error={errors.name?.message}
          />

          <div className="flex justify-start mt-4">
            <Button type="submit" label="Simpan" />
          </div>
        </form>
      </div>
    </div>
  );
}
