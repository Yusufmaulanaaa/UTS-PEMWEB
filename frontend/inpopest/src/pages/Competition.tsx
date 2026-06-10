
import { ChevronDown } from 'lucide-react';
import '../App.css'
import Button from "../components/ui/Button.tsx";
import { Collaps } from '../components/ui/Collaps.tsx';
import { CompetitionCard } from '../components/ui/CompetitionCard.tsx';

export default function Copetition() {

    const cardCompetition = [
        {
            name: "Poster Design Competition",
            description: "Poster Design Competition ini adalah kompetisi untuk menciptakan suatu karya dalam bentuk poster digital yang komunikatif dan inspiratif, guna menyuarakan gagasan atau solusi visual terhadap permasalahan yang ada sekarang ini.",
            imageUrl: "https://www.invofest-harkatnegeri.com/assets/competition-card/software_dev.png"

        },
        {
            name: "UI/UX Design Competition",
            description: "UI/UX Design Competition ini adalah kompetisi untuk menciptakan dan merancang inovasi sebuah produk digital yang dapat berupa website maupun mobile apps serta dapat membuat nyaman calon pengguna.",
            imageUrl: "https://www.invofest-harkatnegeri.com/assets/competition-card/ui_ux.png"

        },
        {
            name: "Web Design Competition",
            description: "Web Design Competition ini adalah kompetisi untuk menciptakan suatu perangkat lunak berbasis website yang menggunakan desain menarik, unik, dan responsive pada semua device serta sesuai dengan tema kompetisi.",
            imageUrl: "https://www.invofest-harkatnegeri.com/assets/competition-card/web_design.png"

        },

    ];
      const collapseItem = [
  {
    title: "Apa itu Invofest?",
    description:
      "Invofest (Informatics Vocational Festival) adalah ajang tahunan yang menghadirkan berbagai kegiatan teknologi untuk menginspirasi generasi muda Indonesia. Melalui kompetisi, seminar, workshop, dan talkshow, Invofest menjadi wadah untuk belajar, berinovasi, dan berkolaborasi dalam menghadapi era digital.",
  },
  {
    title: "Kapan dan di mana Invofest diselenggarakan?",
    description:
      "Invofest akan berlangsung pada 15–17 November 2025 dan diselenggarakan secara offline di Jakarta Convention Center (JCC), Jakarta, Indonesia.",
  },
  {
    title: "Apakah ada biaya pendaftaran?",
    description:
      "Ya, setiap kegiatan di Invofest memiliki biaya pendaftaran yang berbeda sesuai dengan jenis event yang diikuti, seperti seminar, workshop, maupun kompetisi.",
  },
  {
    title: "Bagaimana cara mengetahui pemenang kompetisi?",
    description:
      "Pengumuman pemenang akan disampaikan secara resmi melalui media sosial Instagram Invofest serta kanal komunikasi lainnya yang telah disediakan oleh panitia.",
  },
  {
    title: "Apa saja hadiah yang didapatkan pemenang?",
    description:
      "Para pemenang akan mendapatkan berbagai keuntungan menarik, seperti trophy, uang pembinaan, serta e-sertifikat sebagai bentuk apresiasi atas prestasi mereka.",
  },
  {
    title: "Bagaimana cara mendaftar event Invofest?",
    description:
      "Kunjungi website resmi Invofest, pilih event yang ingin diikuti, lalu klik tombol 'Registrasi'. Kamu akan diarahkan ke form pendaftaran untuk mengisi data dan menyelesaikan proses registrasi.",
  },
];


    return (
  <div className='min-h-screen bg-white overflow-x-hidden'>

    {/* HERO */}
    <section className="relative py-24 overflow-hidden">
      <div className="absolute top-0 right-0 w-100 h-100 bg-red-200/20 blur-[120px] rounded-full"></div>

      <div className='max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12'>

        <div className='w-full md:w-2/3 flex flex-col gap-6 z-10'>
          <h1 className='text-5xl md:text-6xl font-black leading-tight'>
            <span className='bg-linear-to-r from-[#802D43] to-red-600 bg-clip-text text-transparent'>
              IT Competition
            </span>
          </h1>

          <h3 className='text-2xl md:text-3xl font-semibold text-gray-700'>
            "From Creation to Innovation"
          </h3>

          <p className='text-lg text-gray-600 leading-relaxed'>
            Saatnya kamu membuktikan kemampuanmu! Kompetisi ini mengajak generasi muda untuk 
            menciptakan inovasi nyata dari ide kreatif, membangun solusi digital, 
            dan menjadi bagian dari perubahan masa depan.
          </p>

          <div className='flex gap-4 mt-4'>
            <Button label="Daftar Sekarang" variant="primary" />
            <Button label="Hubungi Panitia" variant="secondary"/>
          </div>
        </div>

        <div className='w-full md:w-1/3 flex justify-center'>
          <img
            src="https://www.invofest-harkatnegeri.com/assets/Maskot-Lomba.png"
            className="w-72 md:w-full drop-shadow-2xl animate-pulse"
          />
        </div>

      </div>
    </section>


    {/* DESKRIPSI */}
    <section className='bg-gray-50 py-24'>
      <div className='max-w-5xl mx-auto px-6 text-center space-y-6'>
        <h1 className='text-4xl font-bold text-[#802D43]'>
          Tentang Kompetisi
        </h1>

        <p className='text-lg text-gray-600 leading-relaxed'>
          INVOFEST menghadirkan berbagai kompetisi bergengsi seperti Poster Design, UI/UX, 
          dan Web Design Competition. Dengan tema <b>"From Creation to Innovation"</b>, 
          peserta ditantang untuk mengubah ide menjadi solusi nyata yang berdampak 
          bagi masa depan teknologi dan masyarakat.
        </p>
      </div>
    </section>


    {/* CARD KOMPETISI */}
    <section className='py-24'>
      <div className='max-w-7xl mx-auto px-6'>

        <div className='text-center mb-16'>
          <h1 className='text-5xl font-black text-[#802D43]'>
            Daftar Kompetisi
          </h1>
          <p className='text-gray-500 mt-4 text-lg'>
            Pilih kategori yang sesuai dengan passion dan skill kamu 🚀
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {cardCompetition.map((item, index) => (
            <div
              key={index}
              className="transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl rounded-xl"
            >
              <CompetitionCard
                name={item.name}
                description={item.description}
                imageUrl={item.imageUrl}
              >
                <Button
                  label='Lihat Detail'
                  variant='primary'
                />
              </CompetitionCard>
            </div>
          ))}
        </div>

      </div>
    </section>


    {/* FAQ */}
    <section className='bg-gray-50 py-24'>
      <div className='max-w-5xl mx-auto px-6'>

        <div className='text-center mb-12'>
          <h1 className='text-4xl font-black'>
            FAQ
          </h1>
          <p className='text-gray-500 mt-3'>
            Pertanyaan yang sering ditanyakan
          </p>
        </div>

        <div className='grid md:grid-cols-2 gap-6'>
          {collapseItem.map((item, index) =>(
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


    {/* SPONSOR */}
    <section className='py-20 text-center'>
      <h1 className='text-4xl font-bold'>
        Sponsor <span className='text-[#802D43]'>INVOFEST 2025</span>
      </h1>
    </section>

    {/* MEDIA PARTNER */}
    <section className='pb-20 text-center'>
      <h1 className='text-4xl font-bold'>
        Media Partner <span className='text-[#802D43]'>INVOFEST 2025</span>
      </h1>
    </section>

  </div>
    );
}