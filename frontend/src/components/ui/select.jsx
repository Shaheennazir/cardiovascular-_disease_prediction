import React, { useState, useRef, useEffect } from 'react';

const Select = ({ children, value, onValueChange, required, name, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Find the selected item to display its label
  let selectedLabel = placeholder || 'Select an option';
  
  // Extract items from content if it exists
  let items = [];
  React.Children.forEach(children, (child) => {
    if (child && child.type === SelectContent) {
      React.Children.forEach(child.props.children, (item) => {
        if (item && item.type === SelectItem) {
          items.push(item);
        }
      });
    }
  });
  
  // Find selected label from items
  for (let item of items) {
    if (item.props && item.props.value === value) {
      selectedLabel = item.props.children;
      break;
    }
  }
  
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <div ref={selectRef} className="relative">
      {/* Hidden input for form submission */}
      {name && (
        <input 
          type="hidden" 
          name={name} 
          value={value || ''} 
          required={required}
        />
      )}
      
      <div
        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={handleToggle}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleToggle();
          }
        }}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className={value ? 'text-foreground' : 'text-muted-foreground'}>
          {selectedLabel}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 opacity-50 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
      
      {isOpen && (
        <div 
          className="absolute mt-1 w-full rounded-md border bg-popover p-1 text-popover-foreground shadow-md z-50"
          role="listbox"
        >
          {items.map((item, index) => {
            return React.cloneElement(item, {
              onSelect: (val) => {
                onValueChange(val);
                setIsOpen(false);
              },
              isSelected: item.props.value === value,
              key: index
            });
          })}
        </div>
      )}
    </div>
  );
};

const SelectItem = ({ value, children, onSelect, isSelected, className, ...props }) => {
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onSelect(value);
  };
  
  return (
    <div
      className={`relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground ${isSelected ? 'bg-accent text-accent-foreground' : ''} ${className || ''}`}
      onClick={handleClick}
      onMouseDown={(e) => {
        e.preventDefault();
        handleClick(e);
      }}
      role="option"
      aria-selected={isSelected}
      {...props}
    >
      {isSelected && (
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </span>
      )}
      <span>{children}</span>
    </div>
  );
};

// Structural components
const SelectTrigger = ({ children, className, ...props }) => (
  <div className={className} {...props}>
    {children}
  </div>
);

const SelectValue = ({ placeholder }) => <span>{placeholder}</span>;

const SelectContent = ({ children, className, ...props }) => (
  <div className={className} {...props}>
    {children}
  </div>
);

// Attach sub-components
Select.Trigger = SelectTrigger;
Select.Value = SelectValue;
Select.Content = SelectContent;
Select.Item = SelectItem;

export { Select };