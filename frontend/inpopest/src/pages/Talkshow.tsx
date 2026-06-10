import Button from "../components/ui/Button";
import SpeakerCard from "../components/ui/SpeakerCard";
import { Collaps } from "../components/ui/Collaps";
import { Calendar, ChevronDown, Clock1, MapPin, University } from "lucide-react";

export default function Talkshow() {

    const speakers = [
        {
            name: "Moh. Ichsan Maulana",
            role: "Human Capital Information System (HCIS), PT. Garuda Daya Pratama Sejahtera",
            imageUrl: "https://www.invofest-harkatnegeri.com/assets/talkshow/talkshow%20ichsan.png"

        },
        {
            name: "M. Zaim Zamzami",
            role: "Programmer, PT. Pertamina Drilling Service Indonesia",
            imageUrl: "https://www.invofest-harkatnegeri.com/assets/talkshow/talkshow%20zaim%20zamzami.png"

        }, 
        {
            name: "Daffa Zuhdan Muhtar",
            role: "Android Developer, PT. Astra Internasional",
            imageUrl: "https://www.invofest-harkatnegeri.com/assets/talkshow/talkshow%20daffa.png"

        },
        {
            name: "Bayu Adi Prasetiyo",
            role: "Software Engineer, KOMPAS.ID",
            imageUrl: "https://www.invofest-harkatnegeri.com/assets/talkshow/talkshow%20bayu.png"

        },
    ];

    const collapseItem = [
        {
            title: "Apa itu Infovest?",
            description:
                "Invofest (Informatics Vocational Festival) adalah festival tahunan yang bertujuan untuk menginspirasi dan memberdayakan generasi muda Indonesia dalam menghadapi era digital. Dengan mengusung tema “Beyond Limits, Beyond Intelligence: Innovate for a Smarter Tomorrow ”.",
        },
        {
            title: "Kapan dan di mana Invofest akan diselenggarakan?",
            description:
                "Invofest akan diselenggarakan pada tanggal 15-17 November 2024 di Jakarta Convention Center (JCC), Jakarta, Indonesia.",
        },
        {
            title: "Apakah ada biaya pendaftaran di INVOFEST?",
            description:
                "Semua kegiatan dipastikan berbayar ya teman-teman.",
        },
        {
            title: "Bagaimana saya mengetahui pemenang kompetisi?",
            description:
                "Pemenang akan diinformasikan melalui media sosial instagram dari invofest @invofest_harkatnegeri.",
        },
        {
            title: "Apa yang didapat pemenang dalam kompetisi?",
            description:
                "Pemenang kompetisi akan mendapatkan hadiah trophy, uang pembinaan, dan e-sertifikat.",
        },
        {
            title: "Bagaimana cara mendaftar event?",
            description:
                "Buka https://www.invofest-harkatnegeri.com lalu pergi ke halaman event yang anda ingin ikuti atau scroll kebagian bawah halaman beranda dengan klik mendaftar pada salah satu eventnya, jika sudah maka diarahkan ke halaman detail event dan klik tombol 'Registrasi' maka akan diarahkan ke google form pengisian pendaftaran event yang diikuti.",
        },

    ];
    

   return (
  <div className="bg-white overflow-x-hidden font-sans">

    {/* HERO */}
    <section className="relative min-h-screen flex items-center pt-10 pb-20 overflow-hidden">
      
      {/* Glow merah */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-red-500/10 blur-[120px] rounded-full -mr-32 -mt-32"></div>

      <div className="container mx-auto px-6 z-10">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-12">

          {/* TEXT */}
          <div className="flex flex-col gap-8 max-w-2xl text-left">

            <h1 className="text-5xl md:text-6xl font-black leading-tight">
              <span className="bg-linear-to-r from-[#802D43] to-red-500 bg-clip-text text-transparent">
                IT Talkshow
              </span>
            </h1>

            <h2 className="text-2xl md:text-3xl font-bold text-slate-700">
              Humanizing Technology
            </h2>

            <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
              Di era AI, pertanyaannya bukan lagi <b>"apakah manusia akan tergantikan?"</b> 
              tapi <b>"bagaimana kita bisa berkolaborasi?"</b>.  
              Talkshow ini akan membuka perspektif baru tentang bagaimana <span className="text-[#802D43] font-bold">teknologi dan manusia bisa berjalan berdampingan</span> untuk menciptakan inovasi yang lebih bermakna.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                label="Daftar Sekarang"
                variant="primary"
                              />
            </div>
          </div>

          {/* IMAGE */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-red-400/20 blur-3xl rounded-full scale-75 animate-pulse"></div>
              <img
                src="https://www.invofest-harkatnegeri.com/assets/Maskot-Talkshow.png"
                alt="Talkshow"
                className="relative w-full max-w-md drop-shadow-2xl animate-pulse"
              />
            </div>
          </div>

        </div>
      </div>
    </section>

    {/* DESKRIPSI */}
    <section className="bg-slate-50 py-24">
      <div className="container mx-auto px-6 text-center max-w-3xl">

        <h2 className="text-4xl md:text-5xl font-black text-[#802D43] mb-6">
          Kenapa Harus Ikut?
        </h2>

        <p className="text-xl text-slate-700 leading-relaxed">
          Karena teknologi tanpa nilai hanyalah alat.  
          Di sini kamu akan belajar bagaimana membangun <span className="text-[#802D43] font-bold">AI yang beretika, kreatif, dan berdampak</span> langsung dari para praktisi.
        </p>

      </div>
    </section>

    {/* SPEAKERS */}
    <section className="py-24 bg-white text-center">
      <h2 className="text-4xl font-black text-[#802D43] uppercase">
        The Speakers
      </h2>

      <p className="text-slate-500 mt-4 text-lg italic">
        Belajar dari mereka yang membangun masa depan teknologi.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16 px-6 max-w-7xl mx-auto">
        {speakers.map((speaker, index) => (
          <SpeakerCard
            key={index}
            name={speaker.name}
            role={speaker.role}
            imageUrl={speaker.imageUrl}
          />
        ))}
      </div>
    </section>

    {/* JADWAL */}
    <section className="bg-slate-50 py-24">
      <div className="container mx-auto px-6">

        <h2 className="text-4xl font-black text-center text-[#802D43] mb-12">
          Detail Acara
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Collaps title="Senin, 24 November 2025" icon={Calendar} />
          <Collaps title="08.00 WIB - 12.00 WIB" icon={Clock1} />
          <Collaps title="Aula Gedung C" icon={MapPin} />
          <Collaps title="Kampus 1 Universitas Harkat Negeri" icon={University} />
        </div>

      </div>
    </section>

    {/* FAQ */}
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-4xl text-center">

        <h2 className="text-3xl md:text-4xl font-black mb-12 bg-linear-to-r from-[#802D43] to-red-500 bg-clip-text text-transparent uppercase">
          FAQ
        </h2>

        <div className="flex flex-col gap-4 text-left">
          {collapseItem.map((item, index) => (
            <div key={index} className="border rounded-xl overflow-hidden">
              <Collaps
                title={item.title}
                description={item.description}
                icon={ChevronDown}
                variant="secondary"
              />
            </div>
          ))}
        </div>

      </div>
    </section>

  </div>
    );
}