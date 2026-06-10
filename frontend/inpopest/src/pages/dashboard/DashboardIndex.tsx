import { useMemo, useState } from "react";

export default function DashboardIndex() {
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [search, setSearch] = useState("");

  const stats = [
    {
      label: "Total Peserta",
      value: "1,250",
      desc: "Peserta terdaftar",
      progress: 82,
    },
    {
      label: "Total Event",
      value: "12",
      desc: "Event aktif",
      progress: 65,
    },
    {
      label: "Pendaftar Hari Ini",
      value: "45",
      desc: "Registrasi baru",
      progress: 48,
    },
  ];

  const activities = [
    {
      type: "User",
      text: "User baru mendaftar di IT Workshop",
      time: "2 menit lalu",
    },
    {
      type: "Category",
      text: "Update kategori Competition",
      time: "15 menit lalu",
    },
    {
      type: "Speaker",
      text: "Speaker baru ditambahkan",
      time: "1 jam lalu",
    },
    {
      type: "Event",
      text: "Event UI/UX Class berhasil dibuat",
      time: "3 jam lalu",
    },
  ];

  const filters = ["Semua", "User", "Category", "Speaker", "Event"];

  const filteredActivities = useMemo(() => {
    return activities.filter((item) => {
      const matchFilter =
        activeFilter === "Semua" || item.type === activeFilter;

      const matchSearch = item.text
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchFilter && matchSearch;
    });
  }, [activeFilter, search]);

  return (
    <div className="min-h-screen bg-[#f7f8fa] p-6">
      <div className="relative overflow-hidden rounded-3xl border border-[#eadfd3] bg-linear-to-br from-[#fffaf7] via-[#f6efe8] to-[#f3e4db] p-8 shadow-xl">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#8f2f4f]/15 blur-3xl" />
          <div className="absolute -bottom-28 -left-24 h-80 w-80 rounded-full bg-[#b07b62]/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-tl-full bg-linear-to-br from-[#8f2f4f] to-[#6d213c] opacity-90" />

          <div className="absolute top-10 right-16 grid grid-cols-5 gap-3 opacity-35">
            {Array.from({ length: 15 }).map((_, i) => (
              <span key={i} className="h-2 w-2 rounded-full bg-[#8f2f4f]" />
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#8f2f4f]">
                Admin Overview
              </p>

              <h1 className="mt-2 text-4xl font-black text-[#3e2f1c]">
                Dashboard
              </h1>

              <p className="mt-2 text-sm text-[#7b6b5c]">
                Ringkasan aktivitas dan data utama panel admin INVOFEST.
              </p>
            </div>

            <div className="rounded-2xl border border-white/50 bg-white/65 px-5 py-4 shadow-sm backdrop-blur-md">
              <p className="text-xs font-semibold text-[#8f2f4f]">
                Status Sistem
              </p>
              <p className="mt-1 text-lg font-bold text-[#3e2f1c]">
                Online
              </p>
            </div>
          </div>

          <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            {stats.map((item) => (
              <div
                key={item.label}
                className="group rounded-3xl border border-white/50 bg-white/75 p-6 shadow-md backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold text-[#7b6b5c]">
                      {item.label}
                    </p>

                    <p className="mt-3 text-4xl font-black text-[#8f2f4f]">
                      {item.value}
                    </p>

                    <p className="mt-2 text-sm text-[#9a8979]">
                      {item.desc}
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#8f2f4f]/10 text-[#8f2f4f] transition group-hover:bg-[#8f2f4f] group-hover:text-white">
                    ●
                  </div>
                </div>

                <div className="mt-5">
                  <div className="mb-2 flex justify-between text-xs font-semibold text-[#7b6b5c]">
                    <span>Progress</span>
                    <span>{item.progress}%</span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-[#eadfd3]">
                    <div
                      className="h-full rounded-full bg-linear-to-r from-[#8f2f4f] to-[#ef3340] transition-all duration-700"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-3xl border border-white/50 bg-white/75 p-6 shadow-md backdrop-blur-md">
              <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <h2 className="text-xl font-bold text-[#3e2f1c]">
                    Aktivitas Terbaru
                  </h2>
                  <p className="mt-1 text-sm text-[#7b6b5c]">
                    Filter dan cari update terbaru dari sistem.
                  </p>
                </div>

                <input
                  type="text"
                  placeholder="Cari aktivitas..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="rounded-2xl border border-[#eadfd3] bg-white/80 px-4 py-3 text-sm text-[#3e2f1c] outline-none transition focus:border-[#8f2f4f] focus:ring-2 focus:ring-[#8f2f4f]/10"
                />
              </div>

              <div className="mb-5 flex flex-wrap gap-2">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`rounded-full px-4 py-2 text-xs font-bold transition ${
                      activeFilter === filter
                        ? "bg-[#8f2f4f] text-white shadow-md"
                        : "bg-[#8f2f4f]/10 text-[#8f2f4f] hover:bg-[#8f2f4f]/20"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                {filteredActivities.length > 0 ? (
                  filteredActivities.map((activity, index) => (
                    <div
                      key={activity.text}
                      className="flex items-center gap-4 rounded-2xl border border-[#eadfd3] bg-white/70 p-4 transition hover:-translate-y-1 hover:shadow-md"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#8f2f4f]/10 text-sm font-bold text-[#8f2f4f]">
                        {index + 1}
                      </div>

                      <div className="flex-1">
                        <p className="text-sm font-semibold text-[#4b4036]">
                          {activity.text}
                        </p>
                        <p className="mt-1 text-xs text-[#9a8979]">
                          {activity.time}
                        </p>
                      </div>

                      <span className="rounded-full bg-[#8f2f4f]/10 px-3 py-1 text-xs font-bold text-[#8f2f4f]">
                        {activity.type}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="rounded-2xl border border-dashed border-[#d9c7b8] bg-white/50 p-6 text-center text-sm text-[#7b6b5c]">
                    Aktivitas tidak ditemukan.
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-3xl border border-white/50 bg-white/75 p-6 shadow-md backdrop-blur-md">
              <h2 className="text-xl font-bold text-[#3e2f1c]">
                Quick Action
              </h2>

              <p className="mt-1 text-sm text-[#7b6b5c]">
                Akses cepat untuk mengelola konten dashboard.
              </p>

              <div className="mt-6 flex flex-col gap-3">
                <button className="rounded-2xl bg-linear-to-r from-[#8f2f4f] to-[#ef3340] px-5 py-3 font-bold text-white shadow-md transition hover:-translate-y-1 hover:shadow-lg">
                  Tambah Event
                </button>

                <button className="rounded-2xl border border-[#8f2f4f]/40 bg-white/60 px-5 py-3 font-bold text-[#8f2f4f] transition hover:bg-[#8f2f4f]/10">
                  Kelola Peserta
                </button>

                <button className="rounded-2xl border border-[#eadfd3] bg-white/60 px-5 py-3 font-bold text-[#3e2f1c] transition hover:bg-[#f9f3ee]">
                  Lihat Laporan
                </button>
              </div>

              <div className="mt-6 rounded-2xl bg-[#8f2f4f]/10 p-5">
                <p className="text-sm font-semibold text-[#8f2f4f]">
                  Reminder
                </p>
                <p className="mt-1 text-sm leading-relaxed text-[#6f5e4d]">
                  Pastikan data event, kategori, dan pembicara selalu diperbarui
                  sebelum dipublikasikan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}