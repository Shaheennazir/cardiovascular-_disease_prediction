import React from 'react';

const Skeleton = ({ className, ...props }) => {
  // Simple class name concatenation function
  const cn = (...classes) => classes.filter(Boolean).join(' ');
  
  return (
    <div
      className={cn('animate-pulse rounded-lg bg-zen-blue/10 dark:bg-zen-blue/20 glassmorphic', className)}
      {...props}
    />
  );
};

export { Skeleton };