import React from 'react';

const tactileButtonVariants = {
  primary: 'btn-tactile-primary',
  secondary: 'btn-tactile-secondary',
  outline: 'btn-tactile-outline',
};

const tactileButtonSizes = {
  default: 'h-10 px-4 py-2 text-base',
  sm: 'h-9 rounded-lg px-3 text-sm',
  lg: 'h-14 rounded-lg px-6 text-lg',
  xl: 'h-16 rounded-xl px-8 text-xl',
};

const TactileButton = React.forwardRef(({ 
  className, 
  variant = 'primary', 
  size = 'default', 
  asChild = false,
  children,
  ...props 
}, ref) => {
  const Comp = asChild ? 'span' : 'button';
  
  // Simple class name concatenation function
  const cn = (...classes) => classes.filter(Boolean).join(' ');
  
  return (
    <Comp
      className={cn(
        'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        tactileButtonVariants[variant],
        tactileButtonSizes[size],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </Comp>
  );
});

TactileButton.displayName = 'TactileButton';

export { TactileButton, tactileButtonVariants, tactileButtonSizes };