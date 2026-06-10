import { Link, Outlet} from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export default function DashboardLayout(){

    const logout = useAuthStore((state) => state.logout )
    

    // fungsi logout
    const handleLogout = () => {
        logout();
        
    };

   return (
  <div className="flex w-full min-h-screen bg-gray-50">

    {/* SIDEBAR */}
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col justify-between p-6">

      {/* LOGO */}
      <div>
        <h1 className="font-black text-2xl text-[#802D43] text-center mb-10">
          INVOFEST
        </h1>

        {/* MENU */}
        <ul className="flex flex-col gap-3">
          <li>
            <Link 
              to="/dashboard"
              className="block px-4 py-3 rounded-xl text-gray-700 hover:bg-[#802D43]/10 hover:text-[#802D43] font-medium transition"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link 
              to="/dashboard/category"
              className="block px-4 py-3 rounded-xl text-gray-700 hover:bg-[#802D43]/10 hover:text-[#802D43] font-medium transition"
            >
              Category
            </Link>
          </li>
          <li>
            <Link 
              to="/dashboard/pembicara"
              className="block px-4 py-3 rounded-xl text-gray-700 hover:bg-[#802D43]/10 hover:text-[#802D43] font-medium transition"
            >
              Pembicara
            </Link>
          </li>
          <li>
            <Link 
              to="/dashboard/event"
              className="block px-4 py-3 rounded-xl text-gray-700 hover:bg-[#802D43]/10 hover:text-[#802D43] font-medium transition"
            >
              Event
            </Link>
          </li>
          <li>
            <Link 
              to="/dashboard/user"
              className="block px-4 py-3 rounded-xl text-gray-700 hover:bg-[#802D43]/10 hover:text-[#802D43] font-medium transition"
            >
              User
            </Link>
          </li>
          <li>
            <Link 
              to="/dashboard/biodata"
              className="block px-4 py-3 rounded-xl text-gray-700 hover:bg-[#802D43]/10 hover:text-[#802D43] font-medium transition"
            >
              Biodata
            </Link>
          </li>
        </ul>
      </div>

      {/* LOGOUT */}
      <div>
        <button 
          type="button" 
          onClick={handleLogout}
          className="w-full py-3 rounded-xl bg-[#802D43] text-white font-bold hover:bg-[#6b2437] transition shadow-md hover:shadow-lg"
        >
          Logout
        </button>
      </div>

    </div>

    {/* MAIN CONTENT */}
    <div className="flex-1 p-6">
      
      {/* TOP BAR */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-4 mb-6 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-700">
          Dashboard Panel
        </h2>
        <span className="text-sm text-gray-400">
          Welcome back 👋
        </span>
      </div>

      {/* CONTENT */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <Outlet />
      </div>

    </div>

  </div>
);
}
