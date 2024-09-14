import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  text: string;
  type?: 'button' | 'submit' | 'reset';
}

const ButtonIcon: React.FC<ButtonProps> = ({ onClick, children, text, type = 'button' }) => {
  return (
    <button
      type={type}
      onClick={onClick || (() => {})}
      className=" text-skyblue_dark bg-white ml-2 flex items-center space-x-2 px-4 py-2 rounded"
    > 
    {children}
    <span>{text}</span>
    </button>
  );
};

export default ButtonIcon;