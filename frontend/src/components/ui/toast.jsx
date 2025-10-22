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
    default: 'bg-[#2a2a2a] border-2 border-solid border-[#4a4a4a]',
    destructive: 'bg-[#f20d80] text-white border-[#f20d80]',
    success: 'bg-green-500 text-white border-green-600',
    warning: 'bg-yellow-500 text-white border-yellow-600',
  };

  // Simple class name concatenation function
  const cn = (...classes) => classes.filter(Boolean).join(' ');

  return (
    <div 
      className={cn(
        'fixed top-4 right-4 z-50 w-full max-w-sm rounded-[3rem] border-2 border-solid p-6 shadow-lg transition-all duration-300 ease-in-out',
        variantStyles[variant],
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0',
        className
      )}
    >
      <div className="flex items-start gap-3">
        <div className="flex-1 space-y-1">
          {title && (
            <h3 className={cn(
              'text-white text-lg font-bold',
              variant === 'default' ? 'text-white' : 'text-white'
            )}>
              {title}
            </h3>
          )}
          {description && (
            <p className={cn(
              'text-[#6a6a6a] text-base font-normal',
              variant === 'default' ? 'text-[#6a6a6a]' : 'text-white/90'
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
            'rounded-full p-1 hover:opacity-70',
            variant === 'default' ? 'text-[#6a6a6a] hover:text-white' : 'text-white/80'
          )}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;