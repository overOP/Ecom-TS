import React from "react";
import { NavLink } from "react-router";

interface SidebarItemProps {
  path: string;
  icon: React.ElementType;
  text: string;
  isOpen: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ path, icon, text, isOpen }) => {
  const Icon = icon;

  return (
    <NavLink
      to={path}
      className={({ isActive }: { isActive: boolean }) =>
        `flex items-center p-2 rounded-lg transition duration-200 group 
        ${isActive ? "bg-gray-700 text-white" : "text-gray-400 hover:bg-gray-700 hover:text-white"}`
      }
    >
      <Icon className="text-lg" />
      {isOpen && <span className="ms-3">{text}</span>}
    </NavLink>
  );
};

export default SidebarItem;
