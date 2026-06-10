import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deletePembicara, getPembicara, type Pembicara } from "../../../services/dashboardDataService";

export default function PembicaraIndex() {
  const [pembicara, setPembicara] = useState<Pembicara[]>([]);

  const loadPembicara = async () => {
    try {
      setPembicara(await getPembicara());
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("Yakin ingin menghapus pembicara ini?");

    if (!confirmDelete) return;

    try {
      await deletePembicara(id);
      alert("Pembicara berhasil dihapus");
      loadPembicara();
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat menghapus pembicara");
    }
  };

  useEffect(() => {
    loadPembicara();
  }, []);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold text-[#3e2f1c]">
        Pembicara
      </h1>

      <Link
        to="/dashboard/pembicara/create"
        className="inline-block px-5 py-3 rounded-2xl font-medium bg-[#bfa27a] text-white hover:bg-[#a88c65] transition shadow-sm mb-6"
      >
        Create New
      </Link>

      <div className="flex flex-wrap gap-4">
        {pembicara.map((item) => (
          <div
            key={item.id}
            className="w-72 px-6 py-4 bg-[#f8f5f0] border border-[#e0d6c8] rounded-2xl shadow-sm text-[#3e2f1c] hover:shadow-md transition"
          >
            <p className="font-semibold">{item.name}</p>
            <p className="text-sm text-[#7a6a58]">{item.role}</p>
            <div>
              <img src= {item.image} alt="" className="rounded-xl w-full"/> 
            </div>
            

            <div className="flex gap-2 mt-4">
              <Link
                to={`/dashboard/pembicara/update/${item.id}`}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm hover:bg-blue-700"
              >
                Edit
              </Link>

              <button
                onClick={() => handleDelete(item.id)}
                className="px-4 py-2 rounded-xl bg-red-600 text-white text-sm hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
