import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset'; // optional prop to specify button type
}

const Button: React.FC<ButtonProps> = ({ onClick, children, type = 'button', disabled = false }) => {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick || (() => {})}
      className="w-full max-w-56 bg-skyblue_dark text-white py-2 px-4 rounded-md hover:bg-rose-500 disabled:bg-gray-400"
    >
      {children}
    </button>
  );
};

export default Button;