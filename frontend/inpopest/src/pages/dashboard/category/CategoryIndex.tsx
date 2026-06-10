import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteCategory, getCategories, type Category } from "../../../services/dashboardDataService";

export default function CategoryIndex() {
  const [categories, setCategories] = useState<Category[]>([]);

  const loadCategories = async () => {
    try {
      setCategories(await getCategories());
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("Yakin ingin menghapus category ini?");
    if (!confirmDelete) return;

    try {
      await deleteCategory(id);
      alert("Category berhasil dihapus");
      loadCategories();
    } catch (error) {
      console.error(error);
      alert("Category gagal dihapus");
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold text-[#3e2f1c]">
        Category Event
      </h1>

      <Link
        to="/dashboard/category/create"
        className="inline-block px-5 py-3 rounded-2xl font-medium bg-[#bfa27a] text-white hover:bg-[#a88c65] transition shadow-sm mb-6"
      >
        Create New
      </Link>

      <div className="flex flex-wrap gap-4">
        {categories.map((item) => (
          <div
            key={item.id}
            className="px-6 py-4 bg-[#f8f5f0] border border-[#e0d6c8] rounded-2xl shadow-sm text-[#3e2f1c] font-medium hover:shadow-md transition"
          >
            <p>{item.name}</p>

            <div className="flex gap-2 mt-4">
              <Link
                to={`/dashboard/category/update/${item.id}`}
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
