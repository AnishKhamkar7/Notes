import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

interface InputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearch: () => void;
  onClearSearch: () => void;
}

function SearchBar({
  value,
  onChange,
  handleSearch,
  onClearSearch,
}: InputProps) {
  return (
    <div className="w-80 flex items-center bg-stale-100 rounded-md">
      <input
        type="text"
        onChange={onChange}
        placeholder="Search Notes"
        className="w-full text-xs bg-transparent py-[11px] outline-none"
        value={value}
      />
      <div
        onClick={onClearSearch}
        className="text-slate5400 cursor-pointer hover:text-black mr-3"
      >
        <IoMdClose />
      </div>

      <div
        onClick={handleSearch}
        className="text-slate-400 cursor-pointer hover:text-black"
      >
        <FaMagnifyingGlass />
      </div>
    </div>
  );
}

export default SearchBar;
