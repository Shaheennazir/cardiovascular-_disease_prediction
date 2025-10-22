import React from 'react';
import { Button } from './button';

const StatusButton = React.forwardRef(({
  className,
  variant = 'primary',
  size = 'md',
  status,
  ...props
}, ref) => {
  // Determine status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
        return 'bg-success-500 hover:bg-success-600 text-white';
      case 'warning':
        return 'bg-warning-500 hover:bg-warning-600 text-white';
      case 'danger':
        return 'bg-danger-500 hover:bg-danger-600 text-white';
      case 'info':
        return 'bg-primary-500 hover:bg-primary-600 text-white';
      default:
        return '';
    }
  };
  
  return (
    <Button
      ref={ref}
      className={`${getStatusColor(status)} ${className || ''}`}
      variant={variant}
      size={size}
      {...props}
    />
  );
});

StatusButton.displayName = 'StatusButton';

export { StatusButton };