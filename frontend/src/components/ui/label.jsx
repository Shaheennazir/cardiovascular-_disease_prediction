import React from 'react';

const Label = React.forwardRef(({ className, ...props }, ref) => {
  // Simple class name concatenation function
  const cn = (...classes) => classes.filter(Boolean).join(' ');
  
  return (
    <label
      ref={ref}
      className={cn(
        'text-white text-base font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className
      )}
      {...props}
    />
  );
});
Label.displayName = 'Label';

export { Label };