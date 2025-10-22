import React from 'react';
import { X } from 'lucide-react';
import { Button } from './button';

const Toast = ({ 
  title, 
  description, 
  variant = 'default', 
  onDismiss,
  className,
  ...props 
}) => {
  // Determine variant styles
  const getVariantStyles = (variant) => {
    switch (variant) {
      case 'success':
        return 'bg-success-50 border-success-200 text-success-800';
      case 'error':
        return 'bg-danger-50 border-danger-200 text-danger-800';
      case 'warning':
        return 'bg-warning-50 border-warning-200 text-warning-800';
      case 'info':
        return 'bg-primary-50 border-primary-200 text-primary-800';
      default:
        return 'bg-surface border-border text-text-primary';
    }
  };
  
  const getTextStyles = (variant) => {
    switch (variant) {
      case 'success':
        return 'text-success-700';
      case 'error':
        return 'text-danger-700';
      case 'warning':
        return 'text-warning-700';
      case 'info':
        return 'text-primary-700';
      default:
        return 'text-text-secondary';
    }
  };

  return (
    <div
      className={`max-w-sm w-full rounded-lg border p-4 shadow-lg ${getVariantStyles(variant)} ${className || ''}`}
      {...props}
    >
      <div className="flex items-start">
        <div className="flex-1">
          {title && (
            <h4 className="text-sm font-medium">
              {title}
            </h4>
          )}
          {description && (
            <p className={`text-sm mt-1 ${getTextStyles(variant)}`}>
              {description}
            </p>
          )}
        </div>
        {onDismiss && (
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onDismiss}
            className="ml-2"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export { Toast };