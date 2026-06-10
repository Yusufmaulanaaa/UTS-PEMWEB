import { Calendar, ChevronDown, Clock1, MapPin, University } from "lucide-react";
import Button from "../components/ui/Button";
import { Collaps } from "../components/ui/Collaps";
import SpeakerCard from "../components/ui/SpeakerCard";

export default function Seminar() {

    const speakers = [
        {
            name: "Dery Agung Triyadi",
            role: "Aws Indonesia",
            imageUrl: "https://www.invofest-harkatnegeri.com/assets/seminar/Seminar%20Dery.png"

        },
        {
            name: "Sowam Habibi",
            role: "Google Indonesia",
            imageUrl: "https://www.invofest-harkatnegeri.com/assets/seminar/seminar%20sowam.png"

        }, {
            name: "Lhuqita Fazry",
            role: "Mobile Development Developer, Founder Rumah Coding Indonesia",
            imageUrl: "https://www.invofest-harkatnegeri.com/assets/workshop/workshop%20mobile.png"

        },
    ];
    const collapseItem = [
        {
            title: "Apa itu Invofest?",
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
  <div className="min-h-screen bg-white overflow-x-hidden">

    {/* HERO */}
    <section className="relative py-24 overflow-hidden">
      <div className="absolute top-0 right-0 w-100 h-100 bg-red-200/20 blur-[120px] rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">

        <div className="w-full md:w-2/3 flex flex-col gap-6 z-10">
          <h1 className="text-5xl md:text-6xl font-black">
            <span className="bg-linear-to-r from-[#802D43] to-red-600 bg-clip-text text-transparent">
              IT Seminar
            </span>
          </h1>

          <h3 className='text-2xl md:text-3xl font-semibold text-gray-700'>
            Human-AI Integration
          </h3>

          <p className="text-lg text-gray-600 leading-relaxed">
            Saat teknologi AI berkembang pesat, pertanyaannya bukan lagi 
            <b> "apakah manusia akan tergantikan?"</b>, tetapi 
            <b> "bagaimana kita bisa berkolaborasi?"</b>.  

            Seminar ini mengajak kamu memahami bagaimana manusia dan AI dapat bekerja sebagai 
            satu kesatuan untuk meningkatkan kreativitas, produktivitas, dan inovasi.
          </p>

          <div className="mt-4">
            <Button label="Daftar Sekarang" variant="primary"/>
          </div>
        </div>

        <div className="md:w-1/3 flex justify-center">
          <img
            src="https://www.invofest-harkatnegeri.com/assets/Maskot-Seminar.png"
            className="w-72 md:w-full drop-shadow-2xl animate-pulse"
          />
        </div>

      </div>
    </section>


    {/* DESKRIPSI */}
    <section className="bg-gray-50 py-24">
      <div className="max-w-5xl mx-auto px-6 text-center space-y-6">

        <h1 className="text-4xl font-bold text-[#802D43]">
          Tentang Seminar
        </h1>

        <p className="text-lg text-gray-600 leading-relaxed">
          Seminar ini dirancang untuk membuka wawasan baru tentang masa depan teknologi. 
          Kamu akan belajar bagaimana AI tidak menggantikan manusia, tetapi menjadi alat 
          untuk memperkuat kemampuan manusia dalam menciptakan solusi inovatif.

          Bersama para praktisi industri, kamu akan mendapatkan insight nyata, 
          pengalaman, dan perspektif yang relevan dengan dunia kerja saat ini.
        </p>

      </div>
    </section>


    {/* SPEAKER */}
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6 text-center">

        <h1 className="text-4xl font-black text-[#802D43]">
          The Speakers
        </h1>

        <p className="text-gray-500 mt-3">
          Belajar langsung dari para ahli industri teknologi
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16">
          {speakers.map((speaker, index) =>(
            <div
              key={index}
              className="transform transition duration-300 hover:-translate-y-2"
            >
              <SpeakerCard
                name={speaker.name}
                role={speaker.role}
                imageUrl={speaker.imageUrl}
              />
            </div>
          ))}
        </div>

      </div>
    </section>


    {/* JADWAL */}
    <section className="bg-gray-50 py-24">
      <div className="max-w-5xl mx-auto px-6">

        <h1 className="text-4xl font-bold text-center text-[#802D43] mb-12">
          Detail Pelaksanaan
        </h1>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-white rounded-xl shadow-sm p-4">
            <Collaps title="27 November 2025" icon={Calendar} />
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4">
            <Collaps title="08.00 - 12.00 WIB" icon={Clock1} />
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4">
            <Collaps title="Aula Gedung C" icon={MapPin} />
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4">
            <Collaps title="Universitas Harkat Negeri" icon={University} />
          </div>

        </div>

      </div>
    </section>


    {/* FAQ */}
    <section className="py-24">
      <div className="max-w-5xl mx-auto px-6">

        <div className='text-center mb-12'>
          <h1 className='text-4xl font-black'>FAQ</h1>
          <p className='text-gray-500 mt-3'>
            Pertanyaan yang sering ditanyakan
          </p>
        </div>

        <div className='grid md:grid-cols-2 gap-6'>
          {collapseItem.map((item, index) => (
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition">
              <Collaps
                key={index}
                title={item.title}
                description={item.description}
                icon={ChevronDown}
                variant='secondary'
              />
            </div>
          ))}
        </div>

      </div>
    </section>

  </div>
    );
}