import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { FaBars } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { CiLogout } from "react-icons/ci";

import SidebarItem from "./SidebarItem";
import { navItems } from "../../Data/navData";
import Button from "../Components/Button";

interface User {
  name: string;
}


const MainSidebar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 768);
  const nav = useNavigate();

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsOpen(!mobile);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const logout = (e: React.MouseEvent) => {
    e.preventDefault();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userData");
    nav("/signup"); // Redirect to signup page after logout
  };

  // Parse user data safely
  let user: User | null = null;
  try {
    const userData = localStorage.getItem("userData");
    if (userData) {
      user = JSON.parse(userData);
    }
  } catch (err) {
    console.error("Failed to parse user data:", err);
  }

  return (
    <aside
      className={`h-screen flex flex-col justify-between bg-gradient-to-b from-[#1f2937] to-[#111827]
 text-amber-50 transition-all ${
        isOpen ? "w-64" : "w-20"
      }`}
      aria-label="Sidebar"
    >
      {/* Top Section */}
      <div className="relative px-3 py-4 flex-1 overflow-y-auto">
        {/* Mobile toggle */}
        {isMobile && (
          <button
            onClick={toggleSidebar}
            className="ml-2 text-xl text-white mb-4"
            aria-label="Toggle Sidebar"
          >
            <FaBars />
          </button>
        )}

        {/* Logo/Profile */}
        <div className="hidden md:flex flex-col items-center mb-6">
          <CgProfile className="text-3xl mb-2" />
          {isOpen && (
            <div className="text-center">
              <p className="text-lg font-semibold">Profile</p>
              {user ? (
                <p className="text-sm text-gray-400">{user.name}</p>
              ) : (
                <p className="text-sm text-red-500">No user</p>
              )}
            </div>
          )}
        </div>

        {/* Navigation items */}
        <ul className="space-y-2 font-medium">
          {navItems.map((item) => (
            <SidebarItem key={item.text} {...item} isOpen={isOpen} />
          ))}
        </ul>
      </div>

      {/* Logout Section */}
      <div className="px-3 py-4 border-t border-gray-800">
        <Button
          type="button"
          onClick={logout}
          className="flex items-center w-full p-2 text-sm text-gray-400 rounded-lg transition hover:bg-gray-700 hover:text-white"
        >
          <CiLogout className="text-xl" />
          {isOpen && <span className="ml-3">Logout</span>}
        </Button>
      </div>
    </aside>
  );
};

export default MainSidebar;
