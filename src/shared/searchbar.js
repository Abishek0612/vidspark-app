import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { MdClear } from "react-icons/md";
import { useTheme } from "../contexts/ThemeContext";

const Searchbar = ({ placeholder, onSearchChange }) => {
  const [search, setSearch] = useState("");
  const { theme } = useTheme();

  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    onSearchChange(value);
  };

  const handleClear = () => {
    setSearch("");
    onSearchChange("");
  };

  return (
    <div
      className={`relative flex items-center rounded-lg overflow-hidden shadow-md m-2 transition-shadow duration-300 ${
        theme === "dark" ? "dark" : ""
      }`}
    >
      <BsSearch className="absolute left-4 text-lg text-purple-500 transition-all duration-300 ease-in-out" />
      <input
        type="text"
        onChange={handleChange}
        placeholder={placeholder}
        value={search}
        className="w-full py-3 pl-12 pr-4 bg-white text-black font-bold border-2 border-transparent rounded-lg outline-none placeholder-gray-400 focus:bg-purple-50 focus:border-purple-500 transition-all duration-300 ease-in-out"
        onFocus={(e) =>
          e.target.classList.add(
            "focus:bg-purple-50",
            "focus:border-purple-500"
          )
        }
        onBlur={(e) =>
          e.target.classList.remove(
            "focus:bg-purple-50",
            "focus:border-purple-500"
          )
        }
      />
      <div
        className={`absolute right-4 inset-y-0 flex items-center ${
          search ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300`}
      >
        <button
          onClick={handleClear}
          className="text-lg text-gray-500 hover:text-gray-700"
        >
          <MdClear />
        </button>
      </div>
    </div>
  );
};

export default Searchbar;
