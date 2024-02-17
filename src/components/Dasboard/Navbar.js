import React from "react";
import { FaBars } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { useTheme } from "../../contexts/ThemeContext";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { MdDarkMode } from "react-icons/md";
import { BsSun } from "react-icons/bs";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="bg-indigo-700 text-white  flex justify-between items-center z-50 relative p-4 shadow-md  dark:bg-black  ">
      <Link to="/" className="hover:bg-indigo-600 p-2 rounded gap-2 flex">
        <img src={logo} alt="logo" style={{ height: "40px" }} />
        <div className="text-xl font-bold ">VidSpark</div>
      </Link>

      <div className="md:flex space-x-4 items-center">
        <button
          onClick={toggleTheme}
          className="text-xl p-2 rounded hover:bg-indigo-600"
        >
          {theme === "dark" ? (
            <BsSun className="w-6 h-6" />
          ) : (
            <MdDarkMode className="w-6 h-6 text-black" />
          )}
        </button>

        <Link to="/about" className="hover:bg-indigo-600 p-2 rounded">
          About
        </Link>
      </div>

      {isSidebarOpen ? (
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="md:hidden block  text-xl"
        >
          <IoIosCloseCircle className="w-6 h-6" />
        </button>
      ) : (
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="md:hidden block"
        >
          <FaBars className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default Navbar;
