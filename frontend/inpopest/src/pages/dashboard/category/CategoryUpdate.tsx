import { useEffect } from "react";
import { z } from "zod";
import { InputText } from "../../../components/ui/InputText";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/ui/Button";
import { getCategoryById, updateCategory } from "../../../services/dashboardDataService";

type FormData = {
  name: string;
};

const schema = z.object({
  name: z.string().min(1, "Nama Category harus diisi"),
});

export default function CategoryUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const getDetailCategory = async () => {
    try {
      if (!id) return;
      const data = await getCategoryById(id);
      setValue("name", data.name);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      if (!id) throw new Error("ID category tidak ditemukan");
      await updateCategory(id, data);
      alert("Category berhasil diupdate");
      navigate("/dashboard/category");
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat mengupdate category");
    }
  };

  useEffect(() => {
    getDetailCategory();
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">
          Edit Category Event
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <InputText
            label="Category Event"
            nama="name"
            register={register}
            error={errors.name?.message}
          />

          <div className="flex justify-start mt-4">
            <Button type="submit" label="Update Category" />
          </div>
        </form>
      </div>
    </div>
  );
}
