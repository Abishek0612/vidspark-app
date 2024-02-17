import React, { useState, useEffect, Suspense } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isSidebarOpen && !event.target.closest("#sidebar")) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isSidebarOpen]);

  const shouldLoadVideos = true;

  return (
    <div className={`flex ${theme === "dark" ? "dark" : ""}`}>
      <Sidebar isOpen={isSidebarOpen} theme={theme} />
      <div className="flex-1">
        <Navbar
          setIsSidebarOpen={setIsSidebarOpen}
          isSidebarOpen={isSidebarOpen}
          toggleTheme={toggleTheme}
        />
        <main className="p-4">
          <Suspense fallback={<div>Loading Dashboard...</div>}>
            <Outlet />
            {shouldLoadVideos}
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
