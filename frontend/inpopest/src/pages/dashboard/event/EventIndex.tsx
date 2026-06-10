import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteEvent, getEvents, type EventItem } from "../../../services/dashboardDataService";

export default function EventIndex() {
  const [events, setEvents] = useState<EventItem[]>([]);

  const loadEvents = async () => {
    try {
      setEvents(await getEvents());
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("Yakin ingin menghapus event ini?");
    if (!confirmDelete) return;

    try {
      await deleteEvent(id);
      alert("Event berhasil dihapus");
      loadEvents();
    } catch (error) {
      console.error(error);
      alert("Event gagal dihapus");
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold text-[#3e2f1c]">
        Event
      </h1>

      <Link
        to="/dashboard/event/create"
        className="inline-block px-5 py-3 rounded-2xl font-medium bg-[#bfa27a] text-white hover:bg-[#a88c65] transition shadow-sm mb-6"
      >
        Create New
      </Link>

      <div className="flex flex-wrap gap-4">
        {events.map((item) => (
          <div
            key={item.id}
            className="w-80 px-6 py-4 bg-[#f8f5f0] border border-[#e0d6c8] rounded-2xl shadow-sm text-[#3e2f1c] hover:shadow-md transition"
          >
            <p className="font-semibold">{item.title}</p>

            <p className="text-sm text-[#7a6a58] mt-1">
              Lokasi: {item.location}
            </p>

            <p className="text-sm text-[#7a6a58] mt-1">
              Tanggal: {new Date(item.dateEvent).toLocaleDateString("id-ID")}
            </p>

            <p className="text-sm text-[#7a6a58] mt-1">
              Category: {item.category?.name}
            </p>

            <p className="text-sm text-[#7a6a58] mt-1">
              Pembicara: {item.pembicara?.name}
            </p>

            <p className="text-sm text-[#7a6a58] mt-2">
              {item.description}
            </p>

            <div className="flex gap-2 mt-4">
              <Link
                to={`/dashboard/event/update/${item.id}`}
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
