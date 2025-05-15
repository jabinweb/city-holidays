import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: ReactNode;
}

const Button = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  className = '',
  ...props
}: ButtonProps) => {
  const baseClasses = 'rounded-md font-medium transition-all duration-200 flex items-center justify-center';
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50',
    secondary: 'bg-orange-500 text-white hover:bg-orange-600 focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 focus:ring-opacity-50',
  };
  
  const sizeClasses = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;