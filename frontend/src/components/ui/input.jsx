import React from 'react';

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  // Simple class name concatenation function
  const cn = (...classes) => classes.filter(Boolean).join(' ');
  
  return (
    <input
      type={type}
      className={cn(
        'flex h-10 w-full rounded-lg border border-zen-blue/20 dark:border-zen-blue/10 bg-background-light dark:bg-background-dark px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zen-dark-blue/50 dark:placeholder:text-zen-light-blue/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 glassmorphic',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = 'Input';

export { Input };