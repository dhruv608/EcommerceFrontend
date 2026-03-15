"use client";

import { useState, useEffect, ReactNode } from "react";

interface DelayedSkeletonProps {
  children: ReactNode;
  delay?: number;
  fallback?: ReactNode;
}

export const DelayedSkeleton: React.FC<DelayedSkeletonProps> = ({ 
  children, 
  delay = 150,
  fallback 
}) => {
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFallback(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  if (!showFallback) {
    return <>{children}</>;
  }

  return <>{fallback || children}</>;
};

export default DelayedSkeleton;
