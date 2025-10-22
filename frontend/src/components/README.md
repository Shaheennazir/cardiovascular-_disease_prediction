# Frontend Components Documentation

This document provides an overview of the component structure and usage guidelines for the modernized Cardiovascular Disease Prediction frontend.

## Component Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.jsx
│   │   └── LandingPage.jsx
│   ├── dashboard/
│   │   ├── DashboardLayout.jsx
│   │   └── DashboardHome.jsx
│   ├── predictions/
│   │   ├── TabularModelEnhanced.jsx
│   │   └── EcgModelEnhanced.jsx
│   ├── ui/
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Input.jsx
│   │   ├── Label.jsx
│   │   ├── Select.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── Skeleton.jsx
│   │   └── ToastProvider.jsx
│   └── README.md (this file)
├── App.js
└── api.js
```

## UI Components (`ui/`)

Reusable UI components built with Tailwind CSS and following the design system.

### Button

A versatile button component with multiple variants.

```jsx
import { Button } from './ui/Button';

<Button variant="primary" size="lg">Primary Button</Button>
<Button variant="secondary">Secondary Button</Button>
<Button variant="destructive">Destructive Button</Button>
```

Props:
- `variant`: primary | secondary | destructive | outline | ghost | link
- `size`: sm | md | lg
- All other standard button props

### Card

A container component for grouping related content.

```jsx
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/Card';

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Card content goes here...</p>
  </CardContent>
  <CardFooter>
    <Button>Continue</Button>
  </CardFooter>
</Card>
```

### Input

An input field component with label support.

```jsx
import { Input } from './ui/Input';
import { Label } from './ui/Label';

<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="Enter your email" />
</div>
```

### Select

A select dropdown component.

```jsx
import { Select } from './ui/Select';

<Select>
  <Select.Trigger>
    <Select.Value placeholder="Select option" />
  </Select.Trigger>
  <Select.Content>
    <Select.Item value="option1">Option 1</Select.Item>
    <Select.Item value="option2">Option 2</Select.Item>
  </Select.Content>
</Select>
```

### LoadingSpinner

A customizable loading spinner component.

```jsx
import { LoadingSpinner } from './ui/LoadingSpinner';

<LoadingSpinner className="w-8 h-8" />
<LoadingSpinner size="sm" />
<LoadingSpinner size="lg" />
```

Props:
- `size`: sm | md | lg
- All other standard div props

### Skeleton

A placeholder component for loading content.

```jsx
import { Skeleton } from './ui/Skeleton';

<Skeleton className="h-4 w-3/4" />
<Skeleton className="h-10 w-full rounded-full" />
```

### ToastProvider

Context provider for toast notifications.

```jsx
import { ToastProvider, useToast } from './ui/ToastProvider';

// In your root component:
<ToastProvider>
  <App />
</ToastProvider>

// In your components:
const MyComponent = () => {
  const { toast } = useToast();
  
  const handleClick = () => {
    toast({
      title: "Success!",
      description: "Operation completed successfully.",
      variant: "success"
    });
  };
  
  return <button onClick={handleClick}>Show Toast</button>;
};
```

## Layout Components (`layout/`)

### Header

The main navigation header with responsive design.

Props:
- `isLoggedIn`: boolean
- `onLogin`: function
- `onRegister`: function
- `onLogout`: function (when authenticated)

### LandingPage

The main landing page component for unauthenticated users.

Props:
- `onGetStarted`: function

## Dashboard Components (`dashboard/`)

### DashboardLayout

The main layout for authenticated users with sidebar navigation.

Props:
- `children`: React children
- `onLogout`: function

### DashboardHome

The dashboard home page showing user information and quick actions.

## Prediction Components (`predictions/`)

### TabularModelEnhanced

Enhanced form for tabular data prediction with improved UX.

Features:
- Form validation
- Loading states with skeleton screens
- Detailed result display
- Risk assessment visualization

### EcgModelEnhanced

Enhanced ECG analysis interface with drag-and-drop file upload.

Features:
- Drag-and-drop file upload with validation
- Loading states with skeleton screens
- ECG analysis result visualization
- Error handling

## Usage Guidelines

1. **Consistency**: Use the provided UI components consistently throughout the application
2. **Accessibility**: All components follow WCAG guidelines for accessibility
3. **Responsive Design**: Components are designed to work on all screen sizes
4. **Performance**: Use loading states and skeleton screens to improve perceived performance
5. **Error Handling**: Implement proper error handling with user-friendly messages
6. **Notifications**: Use toast notifications for important user feedback

## Theming

The application uses a custom Tailwind CSS theme defined in `tailwind.config.js` with a medical-themed color palette:

- Primary: Blue shades (#0ea5e9, #0284c7, etc.)
- Secondary: Teal shades (#0d9488, #115e59, etc.)
- Destructive: Red shades (#dc2626, #b91c1c, etc.)
- Background: Light gray (#f8fafc)
- Foreground: Dark gray (#020817)

All components use these theme variables for consistent styling.