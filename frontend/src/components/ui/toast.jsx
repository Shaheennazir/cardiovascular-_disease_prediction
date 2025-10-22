import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const Toast = ({
  title,
  description,
  variant = 'default',
  duration = 5000,
  onDismiss,
  className
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onDismiss) onDismiss();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onDismiss]);

  if (!isVisible) return null;

  const variantStyles = {
    default: 'bg-background-light dark:bg-background-dark border-zen-blue/20 dark:border-zen-blue/10 glassmorphic',
    destructive: 'bg-tactile-accent text-tactile-text-dark border-tactile-accent',
    success: 'bg-zen-green text-tactile-text-dark border-zen-green',
    warning: 'bg-zen-blue text-tactile-text-light border-zen-blue',
  };

  // Simple class name concatenation function
  const cn = (...classes) => classes.filter(Boolean).join(' ');

  return (
    <div
      className={cn(
        'fixed top-4 right-4 z-50 w-full max-w-sm rounded-xl border p-4 shadow-lg transition-all duration-300 ease-in-out',
        variantStyles[variant],
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0',
        className
      )}
    >
      <div className="flex items-start gap-3">
        <div className="flex-1 space-y-1">
          {title && (
            <h3 className={cn(
              'text-sm font-semibold',
              variant === 'default' ? 'text-zen-dark-blue dark:text-zen-light-blue' : 'text-current'
            )}>
              {title}
            </h3>
          )}
          {description && (
            <p className={cn(
              'text-sm',
              variant === 'default' ? 'text-zen-dark-blue/70 dark:text-zen-light-blue/70' : 'text-current/90'
            )}>
              {description}
            </p>
          )}
        </div>
        <button
          onClick={() => {
            setIsVisible(false);
            if (onDismiss) onDismiss();
          }}
          className={cn(
            'rounded-lg p-1 hover:opacity-70',
            variant === 'default' ? 'text-zen-dark-blue/60 hover:text-zen-dark-blue dark:text-zen-light-blue/60 dark:hover:text-zen-light-blue' : 'text-current/80'
          )}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;