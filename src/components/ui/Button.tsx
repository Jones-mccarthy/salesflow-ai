import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'font-medium rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900';
  
  const variants = {
    primary: 'glass-button bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white shadow-md shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/30 focus:ring-blue-500',
    secondary: 'glass-button-secondary bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 text-gray-300 hover:text-white hover:bg-gray-700/80 focus:ring-gray-500',
    outline: 'bg-transparent border border-gray-600 text-gray-300 hover:bg-gray-700/50 focus:ring-gray-500',
    danger: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-md shadow-red-500/20 hover:shadow-lg hover:shadow-red-500/30 focus:ring-red-500',
  };
  
  const sizes = {
    sm: 'py-1 px-3 text-sm',
    md: 'py-2 px-4 text-base',
    lg: 'py-3 px-6 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}