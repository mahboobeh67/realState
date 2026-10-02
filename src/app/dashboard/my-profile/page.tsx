import { authOption } from "@/utils/authOptions";
import User from "@/models/User";
import MyProfilePage from "@/template/MyProfilePage";
import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import React from "react";

async function MyProfile() {
  await connectDB();
  const session = await getServerSession(authOption);
  const [user] =await User.aggregate([
    { $match: { email: session?.user?.email } },
    {
      $lookup: {
        from: "profiles",
        foreignField: "userId",
        localField: "_id",
        as: "profiles",
      },
    },
  ]);
  
  return <MyProfilePage profiles={user?.profiles || []} />;
}

export default MyProfile;
