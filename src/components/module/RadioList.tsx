import React, { ChangeEvent, Dispatch, SetStateAction } from "react";

interface RadioListProps<T> {
  profileData: T;
  setProfileData: Dispatch<SetStateAction<T>>;
}

const CATEGORIES = [
  { id: "villa", label: "ویلا" },
  { id: "apartment", label: "آپارتمان" },
  { id: "store", label: "مغازه" },
  { id: "office", label: "دفتر" },
] as const;

function RadioList<T extends { category: string }>({
  profileData,
  setProfileData,
}: RadioListProps<T>): JSX.Element {
  const { category } = profileData;

  const changeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  return (
    <div className="w-full flex flex-col sm:flex-row items-start sm:items-center gap-4 p-3 bg-white border border-zinc-200 rounded-xl shadow-sm">
      <span className="text-sm font-medium text-zinc-700 whitespace-nowrap">
        دسته‌بندی:
      </span>
      <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3 flex-1">
        {CATEGORIES.map((item) => {
          const isSelected = category === item.id;

          return (
            <label
              key={item.id}
              htmlFor={item.id}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border text-sm font-medium cursor-pointer transition-all select-none ${
                isSelected
                  ? "bg-blue-50 border-blue-600 text-blue-700 shadow-sm"
                  : "bg-zinc-50 border-zinc-200 text-zinc-600 hover:bg-zinc-100 hover:border-zinc-300"
              }`}
            >
              <input
                type="radio"
                id={item.id}
                name="category"
                value={item.id}
                checked={isSelected}
                onChange={changeHandler}
                className="w-4 h-4 text-blue-600 border-zinc-300 focus:ring-blue-500 cursor-pointer accent-blue-600"
              />
              <span className="leading-none">{item.label}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

export default RadioList;

