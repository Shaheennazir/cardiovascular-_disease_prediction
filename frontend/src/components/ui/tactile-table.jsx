import React from 'react';

const TactileTable = ({ className, ...props }) => (
  <table
    className={`w-full caption-bottom text-sm ${className || ''}`}
    {...props}
  />
);

const TableHeader = ({ className, ...props }) => (
  <thead className={`[&_tr]:border-b ${className || ''}`} {...props} />
);

const TableBody = ({ className, ...props }) => (
  <tbody className={`[&_tr:last-child]:border-0 ${className || ''}`} {...props} />
);

const TableFooter = ({ className, ...props }) => (
  <tfoot className={`bg-surface-contrast font-medium [&>tr]:last:border-b-0 ${className || ''}`} {...props} />
);

const TableRow = ({ className, ...props }) => (
  <tr
    className={`border-b transition-colors hover:bg-surface-contrast data-[state=selected]:bg-surface-contrast ${className || ''}`}
    {...props}
  />
);

const TableHead = ({ className, ...props }) => (
  <th
    className={`h-12 px-4 text-left align-middle font-medium text-text-secondary [&:has([role=checkbox])]:pr-0 ${className || ''}`}
    {...props}
  />
);

const TableCell = ({ className, ...props }) => (
  <td
    className={`p-4 align-middle [&:has([role=checkbox])]:pr-0 ${className || ''}`}
    {...props}
  />
);

const TableCaption = ({ className, ...props }) => (
  <caption
    className={`mt-4 text-sm text-text-secondary ${className || ''}`}
    {...props}
  />
);

export {
  TactileTable,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};