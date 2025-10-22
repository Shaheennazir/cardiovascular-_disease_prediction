import React from 'react';

const buttonVariants = {
  default: 'flex min-w-[120px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-[3rem] bg-[#f20d80] text-white text-lg font-extrabold leading-normal tracking-[0.015em] hover:bg-[#f20d80]/80 transition-colors',
  destructive: 'bg-[#f20d80] text-white hover:bg-[#f20d80]/80',
  outline: 'border-2 border-solid border-[#4a4a4a] bg-[#2a2a2a] text-[#6a6a6a] hover:bg-[#4a4a4a]',
  secondary: 'flex min-w-[120px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-[3rem] bg-[#2a2a2a] text-[#6a6a6a] text-lg font-extrabold leading-normal tracking-[0.015em] hover:bg-[#4a4a4a] border-2 border-solid border-[#4a4a4a]',
  ghost: 'hover:bg-[#2a2a2a]',
  link: 'text-[#f20d80] underline-offset-4 hover:underline',
};

const buttonSizes = {
  default: 'h-14 px-8',
  sm: 'h-10 px-6',
  lg: 'h-16 px-10',
  icon: 'h-14 w-14',
};

const Button = React.forwardRef(({ 
  className, 
  variant = 'default', 
  size = 'default', 
  asChild = false,
  ...props 
}, ref) => {
  const Comp = asChild ? 'span' : 'button';
  
  // Simple class name concatenation function
  const cn = (...classes) => classes.filter(Boolean).join(' ');
  
  return (
    <Comp
      className={cn(
        'inline-flex items-center justify-center text-base font-extrabold leading-normal tracking-[0.015em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f20d80] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 truncate',
        buttonVariants[variant],
        buttonSizes[size],
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Button.displayName = 'Button';

export { Button, buttonVariants, buttonSizes };