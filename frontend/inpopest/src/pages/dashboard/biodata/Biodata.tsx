export default function Biodata() {
  const biodata = [
    { label: "Nama", value: "Yusuf Maulana Syifa" },
    { label: "NIM", value: "24090087" },
    { label: "Kelas", value: "TI 4C" },
    { label: "Mata Kuliah", value: "Pemrograman Web 2" },
  ];

  return (
    <div className="p-6">
      <div className="relative overflow-hidden rounded-3xl border border-[#eadfd3] bg-linear-to-br from-[#fffaf4] via-[#f8f2ea] to-[#f3e7dc] shadow-lg">
        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#8f2f4f]/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-16 h-60 w-60 rounded-full bg-[#3e2f1c]/10 blur-3xl" />

        <div className="relative grid gap-8 p-8 md:grid-cols-[260px_1fr]">
          <div className="flex flex-col items-center justify-center rounded-3xl bg-white/60 p-6 text-center shadow-sm backdrop-blur">
            <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-[#8f2f4f] text-4xl font-bold text-white shadow-md">
              YM
            </div>

            <h1 className="text-2xl font-bold text-[#3e2f1c]">
              Yusuf Maulana Syifa
            </h1>

            <p className="mt-2 rounded-full bg-[#8f2f4f]/10 px-4 py-1 text-sm font-semibold text-[#8f2f4f]">
              Mahasiswa TI 4C
            </p>
          </div>

          <div className="flex flex-col justify-center">
            <div className="mb-6">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#8f2f4f]">
                Student Profile
              </p>

              <h2 className="mt-2 text-3xl font-bold text-[#3e2f1c]">
                Biodata Mahasiswa
              </h2>

              <p className="mt-2 text-sm text-[#7b6b5c]">
                Informasi identitas mahasiswa pada dashboard INVOFEST.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {biodata.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-[#eadfd3] bg-white/70 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <p className="text-sm font-semibold text-[#8f2f4f]">
                    {item.label}
                  </p>
                  <p className="mt-1 text-lg font-bold text-[#3e2f1c]">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-[#eadfd3] bg-white/60 p-5">
              <p className="text-sm leading-relaxed text-[#6f5e4d]">
                Dashboard ini digunakan sebagai halaman biodata pada sistem
                informasi event INVOFEST berbasis web.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}