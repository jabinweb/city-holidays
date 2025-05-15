import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  fullWidth = false,
  className = '',
  ...props
}) => {
  const id = props.id || props.name;
  
  return (
    <div className={`mb-4 ${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`
          px-3 py-2 bg-white border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none
          focus:border-blue-500 focus:ring-1 focus:ring-blue-500 block w-full rounded-md sm:text-sm
          ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
          ${className}
        `}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Input;