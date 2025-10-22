import React from 'react';

const Label = React.forwardRef(({ className, ...props }, ref) => {
  // Simple class name concatenation function
  const cn = (...classes) => classes.filter(Boolean).join(' ');
  
  return (
    <label
      ref={ref}
      className={cn(
        'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zen-dark-blue dark:text-zen-light-blue',
        className
      )}
      {...props}
    />
  );
});
Label.displayName = 'Label';

export { Label };