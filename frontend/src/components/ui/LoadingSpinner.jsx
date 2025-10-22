import React from 'react';

const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const spinnerSize = sizeClasses[size] || sizeClasses.md;

  return (
    <div className={`inline-block ${spinnerSize} ${className}`}>
      <div className="w-full h-full border-2 border-[#6a6a6a] border-t-[#f20d80] rounded-full animate-spin"></div>
    </div>
  );
};

export { LoadingSpinner };