import React from "react";

interface ButtonProps {
  btnText: string;
  onClick: () => void;
  primary: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, btnText, primary }) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 ${
        primary ? "bg-indigo-600" : "bg-gray-500"
      } text-white rounded-full ${
        primary ? "hover:bg-indigo-800" : "hover:bg-gray-700"
      } hover:cursor-pointer transition-colors duration-300  ml-4 mb-4`}
    >
      {btnText}
    </button>
  );
};

export default Button;
