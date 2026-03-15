"use client";

import { useState, useEffect } from "react";
import { ProductGridSkeleton } from "@/components/skeleton";

interface LoadingWrapperProps {
  children: React.ReactNode;
  delay?: number;
}

export const LoadingWrapper: React.FC<LoadingWrapperProps> = ({ 
  children, 
  delay = 150 
}) => {
  const [showSkeleton, setShowSkeleton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className="transition-opacity duration-300">
      {showSkeleton ? (
        <ProductGridSkeleton count={8} />
      ) : (
        <div className="opacity-0">
          {children}
        </div>
      )}
    </div>
  );
};

export default LoadingWrapper;
