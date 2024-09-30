import { useState } from "react";
import ProfileInfo from "../Cards/ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

interface NavbarProps {
  userInfo: {};
  onSearchNote: (query: string) => void;
  getNotes: () => void;
  setIsSearch: (isSearch: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  userInfo,
  onSearchNote,
  getNotes,
  setIsSearch,
}) => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
    getNotes();
    setIsSearch(false);
  };

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <>
      <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
        <h2 className="text-xl font-medium text-black py-2">Notes</h2>
        <SearchBar
          value={searchQuery}
          onChange={({ target }) => {
            setSearchQuery(target.value);
          }}
          handleSearch={handleSearch}
          onClearSearch={onClearSearch}
        />
        <ProfileInfo onLogout={onLogout} userInfo={userInfo} />
      </div>
    </>
  );
};
export default Navbar;
