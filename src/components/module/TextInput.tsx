import React from "react";
type TextInputData = {
  title: string;
  name: string;
  textarea?: boolean;
  profileData: Record<string, string>;
  setProfileData: React.Dispatch<React.SetStateAction<Record<string, string>>>;
};
function TextInput({
  title,
  name,
  profileData,
  setProfileData,
  textarea = false,
}: TextInputData) {
  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };
  return (
    <div>
      <p>{title}</p>
      {textarea ? (
        <textarea
          name={name}
          value={profileData[name] ?? ""}
          onChange={changeHandler}
        />
      ) : (
        <input
          type="text"
          name={name}
          value={profileData[name]}
          onChange={changeHandler}
        />
      )}
    </div>
  );
}

export default TextInput;
