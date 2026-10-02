import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";

type ArrayKeys<T> = {
  [K in keyof T]: T[K] extends string[] ? K : never;
}[keyof T];

interface TextListProps<T> {
  title: string;
  type: ArrayKeys<T>;
  profileData: T;
  setProfileData: Dispatch<SetStateAction<T>>;
}

function TextList<T extends object>({
  title,
  type,
  profileData,
  setProfileData,
}: TextListProps<T>) {
  const currentList = (profileData[type] as unknown as string[]) || [];

  const addHandler = (): void => {
    setProfileData({
      ...profileData,
      [type]: [...currentList, ""],
    });
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement>, index: number): void => {
    const { value } = e.target;
    const list = [...currentList];
    list[index] = value;
    setProfileData({ ...profileData, [type]: list });
  };

  const deleteHandler = (index: number): void => {
    const list = [...currentList];
    list.splice(index, 1);
    setProfileData({ ...profileData, [type]: list });
  };

  return (
    <div className="flex flex-col gap-2.5">
      <p className="text-sm font-medium text-zinc-700">{title}</p>
      {currentList.map((i: string, index: number) => (
        <div key={index} className="flex w-full items-center gap-2">
          <input
            type="text"
            value={i}
            onChange={(e) => changeHandler(e, index)}
            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-800 outline-none transition focus:border-[#304ffe]"
          />
          <button
            type="button"
            onClick={() => deleteHandler(index)}
            className="flex cursor-pointer items-center gap-1 rounded-md border border-red-500 px-3 py-2 text-xs font-medium text-red-500 transition hover:bg-red-50"
          >
            <span>حذف</span>
            <AiOutlineDelete className="text-base" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addHandler}
        className="flex w-fit cursor-pointer items-center gap-1.5 rounded-md bg-[#304ffe] px-3.5 py-1.5 text-sm text-white transition hover:bg-[#203ecc]"
      >
        <span>افزودن</span>
        <MdOutlineLibraryAdd className="text-lg" />
      </button>
    </div>
  );
}

export default TextList;



