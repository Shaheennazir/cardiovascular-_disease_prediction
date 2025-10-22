import React from 'react';

const Select = ({ children, value, onValueChange, ...props }) => {
  return (
    <select
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      className="select-trigger"
      {...props}
    >
      {children}
    </select>
  );
};

Select.Trigger = React.forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={`select-trigger ${className || ''}`}
    {...props}
  >
    {children}
  </div>
));

Select.Value = ({ placeholder, children }) => {
  return children || <span className="text-text-tertiary">{placeholder}</span>;
};

Select.Content = ({ children }) => <div className="relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-surface shadow-md">{children}</div>;

Select.Item = ({ value, children, ...props }) => (
  <div
    className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-surface-contrast transition-colors"
    onClick={() => props.onSelect?.(value)}
    {...props}
  >
    {children}
  </div>
);

Select.displayName = 'Select';

export { Select };