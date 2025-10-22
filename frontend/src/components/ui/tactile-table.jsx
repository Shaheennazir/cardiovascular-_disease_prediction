import React from 'react';

// Simple class name concatenation function
const cn = (...classes) => classes.filter(Boolean).join(' ');

const TactileTable = React.forwardRef(({ className, children, ...props }, ref) => (
  <div className="overflow-hidden rounded-xl border border-zen-blue/20 dark:border-zen-blue/10 glassmorphic">
    <table
      ref={ref}
      className={cn('w-full', className)}
      {...props}
    >
      {children}
    </table>
  </div>
));

TactileTable.displayName = 'TactileTable';

const TactileTableHeader = React.forwardRef(({ className, children, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn('bg-zen-light-blue/30 dark:bg-zen-dark-blue/30', className)}
    {...props}
  >
    {children}
  </thead>
));

TactileTableHeader.displayName = 'TactileTableHeader';

const TactileTableBody = React.forwardRef(({ className, children, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn('', className)}
    {...props}
  >
    {children}
  </tbody>
));

TactileTableBody.displayName = 'TactileTableBody';

const TactileTableRow = React.forwardRef(({ className, children, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      'border-t border-t-zen-blue/20 dark:border-t-zen-blue/10 table-row-tactile',
      className
    )}
    {...props}
  >
    {children}
  </tr>
));

TactileTableRow.displayName = 'TactileTableRow';

const TactileTableHead = React.forwardRef(({ className, children, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      'px-6 py-4 text-left text-base font-medium text-zen-dark-blue/80 dark:text-zen-light-blue/80',
      className
    )}
    {...props}
  >
    {children}
  </th>
));

TactileTableHead.displayName = 'TactileTableHead';

const TactileTableCell = React.forwardRef(({ className, children, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      'h-[80px] px-6 py-3 text-base font-light text-zen-dark-blue/70 dark:text-zen-light-blue/70',
      className
    )}
    {...props}
  >
    {children}
  </td>
));

TactileTableCell.displayName = 'TactileTableCell';

const TactileTableCaption = React.forwardRef(({ className, children, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn('mt-4 text-sm text-muted-foreground', className)}
    {...props}
  >
    {children}
  </caption>
));

TactileTableCaption.displayName = 'TactileTableCaption';

export {
  TactileTable,
  TactileTableHeader,
  TactileTableBody,
  TactileTableRow,
  TactileTableHead,
  TactileTableCell,
  TactileTableCaption,
};