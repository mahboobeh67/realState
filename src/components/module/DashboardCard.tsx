"use client"

import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import Card from "./Card";
import type { Profile } from "src/types/profile";
interface DashboardCardProps {
  data: Profile;
}

function DashboardCard({ data }: DashboardCardProps) {

  const editHandler =() => {}
  const deleteHandler = () => {}
  return (
    <div className="bg-white/70 backdrop-blur-sm p-4 rounded-2xl border border-blue-200 shadow-sm mb-4 flex flex-col md:flex-row items-center md:items-stretch gap-4 transition-all hover:shadow-md">
      <Card data={data} />

      <div className="flex-1 w-full flex flex-col justify-center gap-3 p-3 bg-slate-50/70 rounded-2xl border border-slate-100">
        <button onClick={editHandler}
          type="button"
          className="w-full py-2.5 px-4 rounded-xl bg-emerald-100/80 hover:bg-emerald-200 text-emerald-800 font-semibold text-sm flex items-center justify-center gap-2 border border-emerald-300/60 transition-all duration-200 shadow-xs active:scale-[0.99]"
        >
          <span>ویرایش</span>
          <FiEdit className="text-base text-emerald-700" />
        </button>

        <button onClick={deleteHandler}
          type="button"
          className="w-full py-2.5 px-4 rounded-xl bg-red-100/80 hover:bg-red-200 text-red-800 font-semibold text-sm flex items-center justify-center gap-2 border border-red-300/60 transition-all duration-200 shadow-xs active:scale-[0.99]"
        >
          <span>حذف آگهی</span>
          <AiOutlineDelete className="text-lg text-red-700" />
        </button>
      </div>
    </div>
  );
}

export default DashboardCard;
