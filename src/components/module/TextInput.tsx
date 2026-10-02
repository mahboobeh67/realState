import { e2p } from "@/utils/replaceNumber";
import React from "react";

type StringKeys<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

type TextInputData<T> = {
  title: string;
  name: StringKeys<T>;
  textarea?: boolean;
  profileData: T;
  setProfileData: React.Dispatch<React.SetStateAction<T>>;
};

const inputClasses =
  "w-full rounded-lg border-2 border-dashed border-[#304ffe] bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-solid focus:border-[#304ffe] focus:ring-2 focus:ring-[#304ffe]/20";

function TextInput<T extends object>({
  title,
  name,
  profileData,
  setProfileData,
  textarea = false,
}: TextInputData<T>) {
  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value } = e.target;

    setProfileData((prev) => ({
      ...prev,
      [name]: e2p(value),
    }));
  };

  const inputValue = (profileData[name] as unknown as string) ?? "";

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-gray-700">{title}</p>

      {textarea ? (
        <textarea
          name={String(name)}
          value={inputValue}
          onChange={changeHandler}
          className={`${inputClasses} min-h-32 resize-y`}
          placeholder={title}
        />
      ) : (
        <input
          type="text"
          name={String(name)}
          value={inputValue}
          onChange={changeHandler}
          className={inputClasses}
          placeholder={title}
        />
      )}
    </div>
  );
}

export default TextInput;


