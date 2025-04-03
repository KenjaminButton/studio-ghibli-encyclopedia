import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export default function Button({ children, className = '', variant = 'primary', ...props }: ButtonProps) {
  const baseStyle = 'font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-opacity-50 transition duration-150 ease-in-out';
  const primaryStyle = 'bg-blue-500 hover:bg-blue-700 text-white focus:ring-blue-300';
  const secondaryStyle = 'bg-gray-300 hover:bg-gray-400 text-gray-800 focus:ring-gray-400';

  const variantStyle = variant === 'primary' ? primaryStyle : secondaryStyle;

  return (
    <button
      className={`${baseStyle} ${variantStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
