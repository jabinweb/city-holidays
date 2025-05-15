import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hoverable = false
}) => {
  return (
    <div 
      className={`
        bg-white rounded-lg shadow-md overflow-hidden
        ${hoverable ? 'transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export const CardImage: React.FC<{ src: string; alt: string; className?: string }> = ({ 
  src, 
  alt, 
  className = '' 
}) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  );
};

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => {
  return <div className={`p-4 ${className}`}>{children}</div>;
};

export const CardTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => {
  return <h3 className={`text-lg font-semibold mb-2 ${className}`}>{children}</h3>;
};

export const CardDescription: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => {
  return <p className={`text-gray-600 mb-4 ${className}`}>{children}</p>;
};

export const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => {
  return <div className={`px-4 py-3 ${className}`}>{children}</div>;
};

export default Card;