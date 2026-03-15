import React from 'react';

interface SkeletonProps {
  className?: string;
  children?: React.ReactNode;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '', children }) => {
  return (
    <div 
      className={`
        bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 
        bg-[length:400%_100%] 
        animate-pulse
        rounded
        transition-opacity duration-300
        ${className}
      `}
      style={{
        animation: 'shimmer 2s ease-in-out infinite',
      }}
    >
      {children}
    </div>
  );
};

export default Skeleton;
