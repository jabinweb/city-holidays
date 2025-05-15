import React from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  label?: string;
  options: SelectOption[];
  error?: string;
  onChange?: (value: string) => void;
}

const Select: React.FC<SelectProps> = ({
  label,
  options,
  error,
  onChange,
  className = '',
  ...props
}) => {
  const id = props.id || props.name;
  
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value);
  };
  
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <select
        id={id}
        className={`
          px-3 py-2 bg-white border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none
          focus:border-blue-500 focus:ring-1 focus:ring-blue-500 block w-full rounded-md sm:text-sm
          ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
          ${className}
        `}
        onChange={handleChange}
        {...props}
      >
        <option value="" disabled>Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Select;