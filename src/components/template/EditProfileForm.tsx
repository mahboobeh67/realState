"use client";

import CustomDatePiker from "@/module/CustomDatePicker";
import RadioList from "@/module/RadioList";
import TextInput from "@/module/TextInput";
import TextList from "@/module/TextList";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";

type ProfileFormData = {
  _id?: string;
  title: string;
  description: string;
  location: string;
  phone: string;
  price: string;
  realState: string;
  constructionDate: Date | string;
  category: string;
  rules: string[];
  amenities: string[];
};

function EditProfileForm({ data }: { data: ProfileFormData }) {
  const router = useRouter();
  const [profileData, setProfileData] = useState<ProfileFormData>(data);
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        body: JSON.stringify(profileData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const resData: { error?: string; message?: string } = await res.json();

      if (resData.error) {
        toast.error(resData.error);
      } else {
        toast.success(resData.message ?? "آگهی با موفقیت ویرایش شد.");
        router.refresh();
        router.refresh();
      }
      router.push("/dashboard");

    } catch (err) {
      toast.error("خطایی در ارتباط با سرور رخ داد.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-[150px] flex flex-col px-4 py-6 md:px-8">
      <h1 className="mb-10 w-full rounded-[10px] bg-[#304ffe18] px-[15px] py-2.5 text-2xl font-normal text-[#304ffe]">
        ویرایش آگهی
      </h1>

      <form onSubmit={submitHandler} className="flex max-w-3xl flex-col gap-5">
        <TextInput
          title="عنوان آگهی"
          name="title"
          profileData={profileData}
          setProfileData={setProfileData}
        />

        <TextInput
          title="توضیحات"
          name="description"
          profileData={profileData}
          setProfileData={setProfileData}
          textarea
        />

        <TextInput
          title="آدرس"
          name="location"
          profileData={profileData}
          setProfileData={setProfileData}
        />

        <TextInput
          title="شماره تماس"
          name="phone"
          profileData={profileData}
          setProfileData={setProfileData}
        />

        <TextInput
          title="قیمت به تومان"
          name="price"
          profileData={profileData}
          setProfileData={setProfileData}
        />

        <TextInput
          title="بنگاه"
          name="realState"
          profileData={profileData}
          setProfileData={setProfileData}
        />
        
        <RadioList profileData={profileData} setProfileData={setProfileData} />
        
        <TextList
          title="امکانات رفاهی"
          setProfileData={setProfileData}
          profileData={profileData}
          type="rules"
        />
        
        <TextList
          title="قوانین"
          setProfileData={setProfileData}
          profileData={profileData}
          type="amenities"
        />
        
        <CustomDatePiker
          setProfileData={setProfileData}
          profileData={profileData}
        />
        
        <Toaster />

        {loading ? (
          <ThreeDots
            color="#304ffe"
            ariaLabel="three-dots-loading"
            visible={true}
            wrapperStyle={{ margin: "auto" }}
            height={45}
          />
        ) : (
          <button
            type="submit"
            className="w-fit cursor-pointer rounded-[5px] border-none bg-[#304ffe] px-4 py-2.5 text-base text-white transition-transform duration-100 ease-in hover:scale-105"
          >
            ویرایش آگهی
          </button>
        )}
      </form>
    </div>
  );
}

export default EditProfileForm;

