import { ReactNode } from "react";
import { RiHome3Line } from "react-icons/ri";
import { MdApartment } from "react-icons/md";
import { GiOfficeChair } from "react-icons/gi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BiLeftArrowAlt, BiStore } from "react-icons/bi";
import Link from "next/link";

export interface IProfile {
  _id?: string;
  title: string;
  description?: string;
  location: string;
  phone?: string;
  realState?: string;
  price: number;
  constructionDate?: Date;
  amenities?: string[];
  rules?: string[];
  userId?: string;
}

interface CardProps {
  data: {
    category: "villa" | "apartment" | "store" | "office";
    price: number;
    location: string;
    title: string;
  };
}

function Card({ data: { category, price, location, title } }: CardProps) {
  const icons: Record<"villa" | "apartment" | "store" | "office", ReactNode> = {
    villa: <RiHome3Line className="text-xl text-blue-600" />,
    apartment: <MdApartment className="text-xl text-blue-600" />,
    store: <BiStore className="text-xl text-blue-600" />,
    office: <GiOfficeChair className="text-xl text-blue-600" />,
  };

  return (
    <div className="w-full max-w-[25%] min-w-[240px] bg-white rounded-2xl p-4 border border-slate-300 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
      <div>
        <div className="flex items-center justify-between mb-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-50/80 flex items-center justify-center transition-colors group-hover:bg-blue-100/70">
            {icons[category]}
          </div>
          <span className="text-xs font-medium text-slate-500 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-full">
            {category === "villa" && "ویلا"}
            {category === "apartment" && "آپارتمان"}
            {category === "store" && "مغازه"}
            {category === "office" && "دفتر کار"}
          </span>
        </div>

        <h3 className="text-sm font-bold text-slate-800 mb-2 truncate title-font" title={title}>
          {title}
        </h3>

        <p className="flex items-center gap-1 text-xs text-slate-500 mb-3.5 truncate">
          <HiOutlineLocationMarker className="text-sm text-slate-400 shrink-0" />
          <span className="truncate">{location}</span>
        </p>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between mb-3">
          <span className="text-[11px] font-medium text-slate-400">قیمت:</span>
          <span className="text-xs font-extrabold text-blue-600 tracking-tight">
            {Number(price).toLocaleString("fa-IR")} تومان
          </span>
        </div>
      </div>

      <Link
        href="/"
        className="w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-600 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 group/btn border border-slate-100/80 hover:border-blue-100"
      >
        <span>مشاهده آگهی</span>
        <BiLeftArrowAlt className="text-base transition-transform duration-200 group-hover/btn:-translate-x-1" />
      </Link>
    </div>
  );
}

export default Card;


