import React from 'react';
import { ButtonVariant } from '../types';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = ButtonVariant.PRIMARY, 
  className = '', 
  children, 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none px-4 py-2 text-sm";
  
  const variants = {
    [ButtonVariant.PRIMARY]: "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500",
    [ButtonVariant.SECONDARY]: "bg-slate-800 text-white hover:bg-slate-900 focus:ring-slate-500",
    [ButtonVariant.OUTLINE]: "border border-slate-300 bg-transparent hover:bg-slate-50 text-slate-700",
    [ButtonVariant.GHOST]: "bg-transparent hover:bg-slate-100 text-slate-700",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};