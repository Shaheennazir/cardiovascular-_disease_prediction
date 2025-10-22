import React from 'react';

// Simple class name concatenation function
const cn = (...classes) => classes.filter(Boolean).join(' ');

const statusVariants = {
  high: 'bg-tactile-accent text-tactile-text-dark border-tactile-accent dark:bg-tactile-accent/80 dark:text-tactile-text-dark',
  medium: 'bg-zen-green/80 text-tactile-text-dark border-zen-green dark:bg-zen-green/70 dark:text-tactile-text-dark',
  low: 'bg-zen-light-blue/80 text-tactile-text-dark border-zen-light-blue dark:bg-zen-light-blue/70 dark:text-tactile-text-dark',
};

const StatusButton = React.forwardRef(({ 
  className, 
  variant = 'medium', 
  size = 'default', 
  children,
  ...props 
}, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        'flex min-w-[84px] max-w-[480px] cursor-default items-center justify-center overflow-hidden rounded-lg h-10 px-5 status-btn-tactile text-base font-medium leading-normal w-full',
        statusVariants[variant],
        className
      )}
      {...props}
    >
      <span className="truncate">{children}</span>
    </button>
  );
});

StatusButton.displayName = 'StatusButton';

export { StatusButton, statusVariants };