"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import toast from "react-hot-toast"; // دیگر نیازی به ایمپورت Toaster در اینجا نیست

import Card from "./Card";
import type { Profile } from "src/types/profile";

interface DashboardCardProps {
  data: Profile;
}

function DashboardCard({ data }: DashboardCardProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const editNavigateHandler = () => {
    const profileId = (data as any)._id || (data as any).id;
    if (profileId) {
      router.push(`/dashboard/my-profile/${profileId}`);
    } else {
      toast.error("شناسه آگهی جهت ویرایش یافت نشد!");
    }
  };

  const deleteHandler = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/profile/delete/${(data as any)._id || (data as any).id}`, {
        method: "DELETE",
      });
      
      const resData = await res.json();
      
      if (resData.error) {
        toast.error(resData.error);
      } else {
        toast.success(resData.message || "آگهی با موفقیت حذف شد");
        router.refresh();
      }
    } catch (err) {
      toast.error("خطا در برقراری ارتباط با سرور");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-4 flex flex-col items-center gap-4 rounded-2xl border border-blue-200 bg-white/70 p-4 shadow-sm backdrop-blur-sm transition-all hover:shadow-md md:flex-row md:items-stretch">
      <Card data={data} />

      <div className="flex w-full flex-1 flex-col justify-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-3">
        <button
          onClick={editNavigateHandler}
          disabled={loading}
          type="button"
          className="shadow-xs flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-300/60 bg-emerald-100/80 px-4 py-2.5 text-sm font-semibold text-emerald-800 transition-all duration-200 hover:bg-emerald-200 active:scale-[0.99] disabled:opacity-50"
        >
          <span>{loading ? "در حال پردازش..." : "ویرایش"}</span>
          <FiEdit className="text-base text-emerald-700" />
        </button>

        <button
          onClick={deleteHandler}
          disabled={loading}
          type="button"
          className="shadow-xs flex w-full items-center justify-center gap-2 rounded-xl border border-red-300/60 bg-red-100/80 px-4 py-2.5 text-sm font-semibold text-red-800 transition-all duration-200 hover:bg-red-200 active:scale-[0.99] disabled:opacity-50"
        >
          <span>حذف آگهی</span>
          <AiOutlineDelete className="text-lg text-red-700" />
        </button>
      </div>
      
    </div>
  );
}

export default DashboardCard;

