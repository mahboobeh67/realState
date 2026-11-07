import connectDB from "@/utils/connectDB";
import Profile from "@/models/Profile";
import EditProfileForm from "@/template/EditProfileForm"; // مسیر دقیق فرم خودت

interface PageProps {
  params: Promise<{ profileId: string }>;
}

export default async function EditProfilePage({ params }: PageProps) {
  const { profileId } = await params;

  await connectDB();
  const profile = await Profile.findOne({ _id: profileId }).lean();

  if (!profile) {
    return (
      <div className="p-8 text-center text-red-500 font-bold">
        آگهی مورد نظر یافت نشد!
      </div>
    );
  }

  // سریالایز کردن داده‌های مونگوس برای انتقال به کامپوننت کلاینت
  const formattedData = JSON.parse(JSON.stringify(profile));

  return <EditProfileForm data={formattedData} />;
}

