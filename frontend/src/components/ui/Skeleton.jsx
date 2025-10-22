import React from 'react';

const Skeleton = ({ className, ...props }) => {
  // Simple class name concatenation function
  const cn = (...classes) => classes.filter(Boolean).join(' ');
  
  return (
    <div
      className={cn('animate-pulse rounded-[3rem] bg-[#2a2a2a]', className)}
      {...props}
    />
  );
};

export { Skeleton };