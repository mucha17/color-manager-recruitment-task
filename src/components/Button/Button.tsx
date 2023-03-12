import React from 'react';
import './Button.scss';

interface ButtonProps {
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

const Button = ({ onClick, className, children }: ButtonProps) => {
  return (
    <div className="components-button-wrapper">
      <button className={`button ${className}`} onClick={onClick}>
        {children}
      </button>
    </div>
  );
};

export default Button;
