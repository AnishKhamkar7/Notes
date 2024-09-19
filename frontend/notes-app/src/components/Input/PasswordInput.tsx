import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

interface InputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

function PasswordInput({ value, onChange, placeholder }: InputProps) {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div className="flex items-center bg-transparent border-[1.5px] px-5 rounded mb-3">
      <input
        value={value}
        onChange={onChange}
        placeholder={"Password" || placeholder}
        type={isShowPassword ? "text" : "password"}
        className="w-full text-sm bg-transparent py-3 mr-3 rounded outline-none"
      />

      {isShowPassword ? (
        <div onClick={() => toggleShowPassword()} style={{ cursor: "pointer" }}>
          <FaRegEye size={22} />
        </div>
      ) : (
        <div onClick={() => toggleShowPassword()} style={{ cursor: "pointer" }}>
          <FaRegEyeSlash size={22} />
        </div>
      )}
    </div>
  );
}

export default PasswordInput;
