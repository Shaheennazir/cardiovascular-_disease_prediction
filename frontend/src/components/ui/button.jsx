import React from 'react';

const buttonVariants = {
  primary: 'btn btn-primary',
  secondary: 'btn btn-secondary',
  accent: 'btn btn-accent',
  success: 'btn btn-success',
  danger: 'btn btn-danger',
  outline: 'btn btn-outline',
  ghost: 'btn btn-ghost',
  link: 'btn btn-link',
};

const buttonSizes = {
  sm: 'btn-sm',
  md: 'btn-md',
  lg: 'btn-lg',
  icon: 'btn-icon',
  'icon-sm': 'btn-icon-sm',
  'icon-lg': 'btn-icon-lg',
};

const Button = React.forwardRef(({
  className,
  variant = 'primary',
  size = 'md',
  asChild = false,
  ...props
}, ref) => {
  const Comp = asChild ? 'span' : 'button';
  
  // Simple class name concatenation function
  const cn = (...classes) => classes.filter(Boolean).join(' ');
  
  return (
    <Comp
      className={cn(
        'btn',
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