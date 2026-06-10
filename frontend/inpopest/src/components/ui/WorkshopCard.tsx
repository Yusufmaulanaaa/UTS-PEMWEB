import type React from "react";
import { Calendar, Clock, MapPin, type LucideIcon } from "lucide-react";

interface WorkshopCardProps {
    title:string;
    date:string;
    time:string;
    location:string;
    icon:LucideIcon;
}

export const WorkshopCard: React.FC <WorkshopCardProps> = ({
    title,
    date,
    time,
    location,
    icon: MainIcon
    

}) => {
    return (
  <div className="group bg-white rounded-2xl p-6 flex items-center gap-6 
                  shadow-md border border-gray-100 
                  hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

    {/* ICON */}
    <div className="bg-linear-to-br from-[#802D43] to-red-500 
                    text-white p-5 rounded-2xl flex items-center justify-center 
                    min-w-20 h-20 shadow-md group-hover:scale-110 transition">
      <MainIcon size={24} />
    </div>

    {/* CONTENT */}
    <div className="flex flex-col gap-2">
      
      <h3 className="text-xl font-black text-[#802D43]">
        {title}
      </h3>

      <div className="flex items-center gap-3 text-gray-500 text-sm">
        <Calendar size={18} className="text-[#802D43]" />
        <span>{date}</span>
      </div>

      <div className="flex items-center gap-3 text-gray-500 text-sm">
        <Clock size={18} className="text-[#802D43]" />
        <span>{time}</span>
      </div>

      <div className="flex items-center gap-3 text-gray-500 text-sm">
        <MapPin size={18} className="text-[#802D43]" />
        <span>{location}</span>
      </div>

    </div>
  </div>
    );
};