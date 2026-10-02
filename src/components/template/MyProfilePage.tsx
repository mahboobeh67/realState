import DashboardCard from "@/module/DashboardCard";
import type { Profile } from "src/types/profile";
import React from "react";

interface MyProfilePageProps {
  profiles: Profile[];
}

function MyProfilePage({ profiles }: MyProfilePageProps) {
  return (
    <div className="w-full">
      {profiles.length ? null : (
        <p className="bg-red-500/15 text-red-900 border border-red-500/20 backdrop-blur-sm p-4 rounded-xl text-center font-medium">
          هیچ آگهی ثبت نشده است
        </p>
      )}
      {profiles.map((i) => (
        <DashboardCard key={i._id} data={i} />
      ))}
    </div>
  );
}

export default MyProfilePage;
