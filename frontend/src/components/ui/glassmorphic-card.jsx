import React from 'react';
import { Card } from './card';

const GlassmorphicCard = React.forwardRef(({ className, ...props }, ref) => (
  <Card
    ref={ref}
    className={`backdrop-blur-sm bg-surface/80 border border-border/50 ${className || ''}`}
    {...props}
  />
));

GlassmorphicCard.displayName = 'GlassmorphicCard';

export { GlassmorphicCard };