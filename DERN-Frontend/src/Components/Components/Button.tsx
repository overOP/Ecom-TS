import React from "react";

interface Props {
  type?: "submit" | "reset" | "button";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  children: React.ReactNode;
}

const Button = ({ type = "button", onClick, className = "", children }: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`focus:outline-none text-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
