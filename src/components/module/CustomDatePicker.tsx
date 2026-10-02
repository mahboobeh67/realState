import React, { Dispatch, SetStateAction } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

interface CustomDataPikerProps<T extends { constructionDate: Date }> {
  profileData: T;
  setProfileData: Dispatch<SetStateAction<T>>;
}

function CustomDatePiker<T extends { constructionDate: Date }>({
  profileData,
  setProfileData,
}: CustomDataPikerProps<T>): JSX.Element {
  const changeHandler = (e: DateObject | null) => {
    if (!e) return;

  
    const date = e.toDate();

    setProfileData({
      ...profileData,
      constructionDate: date,
    });
  };

  return (
    <div className="flex w-full flex-col gap-2" dir="rtl">
      <label className="text-sm font-medium text-gray-700">
        تاریخ ساخت:
      </label>

      <DatePicker
        calendar={persian}
        locale={persian_fa}
        value={profileData.constructionDate}
        onChange={changeHandler}
        calendarPosition="bottom-right"
        inputClass="
          w-full
          rounded-lg
          border border-gray-300
          bg-white
          px-4 py-2.5
          text-sm text-gray-700
          outline-none
          transition
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-100
        "
        containerClassName="w-full"
      />
    </div>
  );
}

export default CustomDatePiker;


