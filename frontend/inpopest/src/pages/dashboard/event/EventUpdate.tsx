import { useEffect, useState } from "react";
import { z } from "zod";
import { InputText } from "../../../components/ui/InputText";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/ui/Button";
import {
  getCategories as fetchCategories,
  getEventById,
  getPembicara as fetchPembicara,
  updateEvent,
  type Category,
  type Pembicara,
} from "../../../services/dashboardDataService";

type FormData = {
  title: string;
  description: string;
  location: string;
  dateEvent: string;
  categoryId: string;
  pembicaraId: string;
};

const schema = z.object({
  title: z.string().min(1, "Judul event harus diisi"),
  description: z.string().min(1, "Deskripsi harus diisi"),
  location: z.string().min(1, "Lokasi harus diisi"),
  dateEvent: z.string().min(1, "Tanggal event harus diisi"),
  categoryId: z.string().min(1, "Kategori event harus dipilih"),
  pembicaraId: z.string().min(1, "Pembicara harus dipilih"),
});

export default function EventUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState<Category[]>([]);
  const [pembicara, setPembicara] = useState<Pembicara[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const getCategories = async () => {
    setCategories(await fetchCategories());
  };

  const getPembicara = async () => {
    setPembicara(await fetchPembicara());
  };

  const getDetailEvent = async () => {
    try {
      if (!id) return;
      const data = await getEventById(id);

      setValue("title", data.title);
      setValue("description", data.description);
      setValue("location", data.location);
      setValue("dateEvent", data.dateEvent?.slice(0, 10));
      setValue("categoryId", String(data.categoryId ?? data.category?.id ?? ""));
      setValue("pembicaraId", String(data.pembicaraId ?? data.pembicara?.id ?? ""));
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      if (!id) throw new Error("ID event tidak ditemukan");
      await updateEvent(id, {
        title: data.title,
        description: data.description,
        location: data.location,
        dateEvent: data.dateEvent,
        categoryId: Number(data.categoryId),
        pembicaraId: Number(data.pembicaraId),
      });

      alert("Event berhasil diupdate");
      navigate("/dashboard/event");
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat mengupdate event");
    }
  };

  useEffect(() => {
    getCategories();
    getPembicara();
    getDetailEvent();
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-[#f8f5f0] rounded-2xl shadow-md p-8 border border-[#e0d6c8]">
        <h2 className="text-2xl font-bold text-[#3e2f1c] mb-6 border-b border-[#d6c7b2] pb-4">
          Edit Event
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <InputText
            label="Event Title"
            nama="title"
            register={register}
            error={errors.title?.message}
          />

          <InputText
            label="Description"
            nama="description"
            register={register}
            error={errors.description?.message}
          />

          <InputText
            label="Location"
            nama="location"
            register={register}
            error={errors.location?.message}
          />

          <InputText
            label="Event Date"
            nama="dateEvent"
            type="date"
            register={register}
            error={errors.dateEvent?.message}
          />

          <div>
            <label className="block mb-2 font-medium text-[#3e2f1c]">
              Category Event
            </label>
            <select
              {...register("categoryId")}
              className="w-full px-4 py-3 rounded-xl border border-[#d6c7b2] bg-white"
            >
              <option value="">Pilih Category Event</option>
              {categories.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            <p className="text-sm text-red-500 mt-1">
              {errors.categoryId?.message}
            </p>
          </div>

          <div>
            <label className="block mb-2 font-medium text-[#3e2f1c]">
              Pembicara
            </label>
            <select
              {...register("pembicaraId")}
              className="w-full px-4 py-3 rounded-xl border border-[#d6c7b2] bg-white"
            >
              <option value="">Pilih Pembicara</option>
              {pembicara.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} - {item.role}
                </option>
              ))}
            </select>
            <p className="text-sm text-red-500 mt-1">
              {errors.pembicaraId?.message}
            </p>
          </div>

          <div className="flex justify-start mt-4">
            <Button type="submit" label="Update Event" />
          </div>
        </form>
      </div>
    </div>
  );
}
