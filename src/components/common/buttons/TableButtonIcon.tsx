import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  text?: string;
  type?: 'button' | 'submit' | 'reset';
  bgColor?: string;
  color?: string;
}

const TableButtonIcon: React.FC<ButtonProps> = ({ onClick, children, text, bgColor = 'bg-white', color='text-color_brand', type = 'button' }) => {
  return (
    <button
      type={type}
      onClick={onClick || (() => {})}
      className={`${bgColor} ml-1 flex items-center space-x-2 px-2 py-1 rounded ${color}`}
    > 
    {children}
    {text && (
      <span>{text}</span>
    )}
    </button>
  );
};

export default TableButtonIcon;