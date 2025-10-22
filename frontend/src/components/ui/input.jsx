import React from 'react';

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  // Simple class name concatenation function
  const cn = (...classes) => classes.filter(Boolean).join(' ');
  
  return (
    <input
      type={type}
      className={cn(
        'flex h-14 w-full rounded-[3rem] border-2 border-solid border-[#4a4a4a] bg-[#1a1a1a] px-6 py-4 text-white text-base font-normal ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#6a6a6a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f20d80] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = 'Input';

export { Input };