import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  text?: string;
  type?: 'button' | 'submit' | 'reset';
  bgColor?: string;
  color?: string;
}

const ButtonIcon: React.FC<ButtonProps> = ({ onClick, children, text, bgColor = 'bg-white', color="text-skyblue_dark",type = 'button' }) => {
  return (
    <button
      type={type}
      onClick={onClick || (() => {})}
      className={`${bgColor} ${color} ml-2 flex items-center space-x-2 px-4 py-2 rounded hover:animate-pulse`}
    > 
    {children}
    {text && (
      <span className={`${color}`}>{text}</span>
    )}
    </button>
  );
};

export default ButtonIcon;