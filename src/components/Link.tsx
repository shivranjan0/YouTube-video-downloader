import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Link: React.FC<LinkProps> = ({ href, children, className = '', onClick }) => {
  const baseClasses = "text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200";
  
  return (
    <RouterLink 
      to={href} 
      className={`${baseClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </RouterLink>
  );
};