import React from 'react';

// Simple class name concatenation function
const cn = (...classes) => classes.filter(Boolean).join(' ');

const GlassmorphicCard = React.forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'rounded-xl p-8 glassmorphic',
      className
    )}
    {...props}
  >
    {children}
  </div>
));

GlassmorphicCard.displayName = 'GlassmorphicCard';

const GlassmorphicCardContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <div 
    ref={ref} 
    className={cn('pt-0', className)} 
    {...props}
  >
    {children}
  </div>
));

GlassmorphicCardContent.displayName = 'GlassmorphicCardContent';

const GlassmorphicCardHeader = React.forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5', className)}
    {...props}
  >
    {children}
  </div>
));

GlassmorphicCardHeader.displayName = 'GlassmorphicCardHeader';

const GlassmorphicCardTitle = React.forwardRef(({ className, children, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-2xl font-medium leading-none tracking-tight text-zen-dark-blue dark:text-zen-light-blue',
      className
    )}
    {...props}
  >
    {children}
  </h3>
));

GlassmorphicCardTitle.displayName = 'GlassmorphicCardTitle';

const GlassmorphicCardDescription = React.forwardRef(({ className, children, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-zen-dark-blue/80 dark:text-zen-light-blue/80', className)}
    {...props}
  >
    {children}
  </p>
));

GlassmorphicCardDescription.displayName = 'GlassmorphicCardDescription';

export { 
  GlassmorphicCard, 
  GlassmorphicCardContent, 
  GlassmorphicCardHeader, 
  GlassmorphicCardTitle, 
  GlassmorphicCardDescription 
};