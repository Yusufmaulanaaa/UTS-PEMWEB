import { NavBarLink }  from "./ui/NavBarLink";
import { Home, Mic, Users, Trophy, Laptop, CirclePlay } from "lucide-react";

export const Footer: React.FC = () => {
    const currentPath = "#";

    const menuItems = [

        {label: "Beranda", href:"#", icon: <Home size={18} />},
        {label: "Competition", href:"#competition", icon: <Trophy size={18} />},
        {label: "Seminar", href:"#seminar", icon: <Users size={18} />},
        {label: "Workshop", href:"#workshop", icon: <Laptop size={18} />},
        {label: "Talkshow", href:"#Talkshow", icon: <Mic size={18} />},
        
    ];

    const mediaItems = [
        {label: "Instagram", href: "#", icon: <CirclePlay size={18} />},
        {label: "Youtube", href: "#", icon: <CirclePlay size={18} />},

    ];

    return (
  <footer className="bg-gradient-to-b from-red-50 to-white px-6 py-16 mt-16 border-t border-red-100">

    <div className="max-w-7xl mx-auto">

      {/* TOP GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 px-3 w-full">

        {/* LOGO + DESC */}
        <div className="flex flex-col gap-4">
          <img 
            src="https://www.invofest-harkatnegeri.com/assets/nav-logo.png" 
            alt="logo" 
            className="h-16 object-contain"
          />
          <p className="text-gray-600 text-sm leading-relaxed">
            Invofest adalah wadah bagi generasi muda untuk berkembang, berinovasi,
            dan berkolaborasi dalam menghadapi era digital.
          </p>
        </div>

        {/* MENU */}
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-[#802D43] uppercase tracking-wider text-sm">
            Navigasi
          </h3>

          <div className="flex flex-col gap-3">
            {menuItems.map((item) => (                        
              <div key={item.label} className="hover:translate-x-1 transition">
                <NavBarLink
                  label={item.label}
                  href={item.href}
                  icon={item.icon}
                  isActive={item.href === currentPath}
                />
              </div>
            ))}
          </div>
        </div>

        {/* SOSIAL */}
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-[#802D43] uppercase tracking-wider text-sm">
            Media Sosial
          </h3>

          <div className="flex flex-col gap-3">
            {mediaItems.map((item) => (
              <div key={item.label} className="hover:translate-x-1 transition">
                <NavBarLink
                  label={item.label}
                  href={item.href}
                  icon={item.icon}
                  isActive={item.href === currentPath}
                />
              </div>
            ))}
          </div>
        </div>

        {/* KONTAK / ALAMAT */}
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-[#802D43] uppercase tracking-wider text-sm">
            Kontak
          </h3>

          <p className="text-gray-600 text-sm leading-relaxed">
            Universitas Harkat Negeri  
            <br />
            Indonesia  
            <br /><br />
            Email: info@invofest.id  
            <br />
            Telp: +62 812-xxxx-xxxx
          </p>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="mt-16 pt-6 border-t border-red-200 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 px-3">
        
        <p>© 2026 INVOFEST. All Rights Reserved.</p>

        <div className="flex gap-4">
          <span className="hover:text-[#802D43] cursor-pointer transition">Privacy Policy</span>
          <span className="hover:text-[#802D43] cursor-pointer transition">Terms</span>
        </div>

      </div>

    </div>
  </footer>

    );
};

export default Footer;