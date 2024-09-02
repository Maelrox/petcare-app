import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  icon?: string;
}

const ButtonIcon: React.FC<ButtonProps> = ({ onClick, children, type = 'button', icon }) => {
  return (
    <button
      type={type}
      onClick={onClick || (() => {})}
      className=" text-skyblue_dark flex items-center space-x-2 px-4 py-2 rounded"
    >
      {icon && (
        <img 
          src={icon} 
          alt="button icon" 
          className="w-10 h-10" 
        />
      )}
      <span>{children}</span>
    </button>
  );
};

export default ButtonIcon;