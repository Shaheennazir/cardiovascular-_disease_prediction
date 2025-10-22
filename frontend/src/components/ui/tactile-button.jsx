import React from 'react';
import { Button } from './button';

const TactileButton = React.forwardRef(({
  className,
  variant = 'primary',
  size = 'md',
  ...props
}, ref) => {
  // Map old variants to new variants
  const variantMap = {
    primary: 'primary',
    secondary: 'secondary',
    outline: 'outline',
    ghost: 'ghost'
  };
  
  return (
    <Button
      ref={ref}
      className={`${className || ''}`}
      variant={variantMap[variant] || variant}
      size={size}
      {...props}
    />
  );
});

TactileButton.displayName = 'TactileButton';

export { TactileButton };