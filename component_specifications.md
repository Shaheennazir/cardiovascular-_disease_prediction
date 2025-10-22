# Component Specifications

## UI Components (shadcn/ui)

### Button
- Variants: default, destructive, outline, secondary, ghost, link
- Sizes: sm, default, lg
- States: enabled, disabled, loading
- Accessibility: Proper focus states, keyboard navigation

### Card
- Structure: header, content, footer
- Variants: default, with border, with shadow
- Responsiveness: Flexible width, padding adjustments

### Input
- Types: text, number, email, password
- States: normal, focused, error, disabled
- Features: Label association, placeholder text, validation states

### Select
- Single and multi-select variants
- Searchable option for large datasets
- Custom styling with consistent dropdown behavior

### Dialog
- Modal overlay with backdrop
- Focus trapping for accessibility
- Escape key and click-outside dismissal

### Toast
- Auto-dismiss after configurable duration
- Multiple types: info, success, warning, error
- Action buttons for user interaction

## Layout Components

### Header
- Logo placement on left
- Navigation links in center
- User profile menu on right
- Mobile-responsive hamburger menu
- Sticky positioning option

### Sidebar
- Collapsible on desktop
- Full-screen overlay on mobile
- Icon + text navigation items
- Active state highlighting
- Scrollable content area

### Dashboard Layout
- Grid-based content organization
- Responsive column arrangement
- Consistent spacing and alignment
- Widget-based design system

## Authentication Components

### LoginForm
- Username/email field
- Password field with visibility toggle
- Remember me checkbox
- Forgot password link
- Submit button with loading state
- Error message display
- Social login options

### RegisterForm
- Username field
- Email field
- Password field with strength indicator
- Password confirmation field
- Terms and conditions checkbox
- Submit button with validation
- Link to login page

## Prediction Components

### TabularForm
- Multi-step wizard interface
- Form validation with real-time feedback
- Input masking for numeric fields
- Help tooltips for complex fields
- Progress indicator
- Save draft functionality

### EcgUploader
- Drag-and-drop file zone
- File type validation (.dat files)
- File size checking
- Preview of selected file
- Upload progress indicator
- Cancel upload option

### ResultDisplay
- Risk level visualization
- Confidence score presentation
- Feature importance chart
- Recommendation list
- Export options (PDF, CSV)
- Share functionality

### Visualization
- Interactive ECG signal plot
- Zoom and pan capabilities
- Annotation markers
- Abnormality highlighting
- Download image option

## Data Display Components

### StatCard
- Large value display
- Trend indicators (up/down arrows)
- Comparison to previous period
- Clickable for detailed view

### DataTable
- Sortable columns
- Filterable fields
- Pagination controls
- Row selection capabilities
- Export functionality

### ChartContainer
- Multiple chart types (bar, line, pie)
- Responsive sizing
- Interactive legends
- Tooltip on hover
- Data download option

## Feedback Components

### LoadingSpinner
- Multiple sizes
- Overlay and inline variants
- Customizable colors
- Accessibility announcement

### SkeletonLoader
- Component-shaped placeholders
- Animated shimmer effect
- Configurable dimensions
- Consistent with actual content layout

### ErrorMessage
- Clear error title
- Detailed description
- Recovery suggestions
- Retry action button
- Dismiss option

## Navigation Components

### Breadcrumb
- Hierarchical path display
- Clickable intermediate links
- Truncation for long paths
- Accessible labeling

### Pagination
- Previous/next buttons
- Page number display
- Jump to first/last options
- Items per page selector
- Total count display

### Tabs
- Horizontal tab bar
- Content panels for each tab
- Keyboard navigation support
- Active state indication
- Dynamic tab addition/removal

## Form Components

### FormGroup
- Label and input pairing
- Help text support
- Validation error display
- Required field indicator
- Inline and stacked layouts

### CheckboxGroup
- Multiple selection options
- Select all/deselect all controls
- Individual item disabling
- Custom styling options

### RadioGroup
- Single selection from options
- Vertical and horizontal layouts
- Custom radio button styling
- Group labeling and description

## Utility Components

### Tooltip
- Hover and focus triggers
- Positioning options (top, bottom, left, right)
- Delay configuration
- Rich content support (text, icons)

### Popover
- Click-triggered content display
- Positioning relative to trigger element
- Close on outside click
- Arrow indicator

### Accordion
- Expandable/collapsible sections
- Single or multiple open panels
- Smooth animation
- Keyboard accessible

## Responsive Behavior

### Breakpoints
- Mobile: 0px - 768px
- Tablet: 769px - 1024px
- Desktop: 1025px - 1280px
- Large Desktop: 1281px+

### Adaptations
- Stack columns vertically on mobile
- Hide non-essential elements on small screens
- Increase touch target sizes for mobile
- Adjust font sizes for readability
- Modify spacing for different viewports

## Accessibility Requirements

### WCAG Compliance
- Minimum contrast ratio of 4.5:1 for text
- Proper heading hierarchy (h1-h6)
- Alt text for all images
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus management
- Screen reader compatibility

### Keyboard Navigation
- Tab order follows visual layout
- Enter/space to activate buttons and links
- Arrow keys for radio groups and tabs
- Escape key to close modals and popovers
- Skip to content link for screen readers

### Screen Reader Support
- Descriptive labels for form inputs
- Status announcements for dynamic content
- Landmark regions (banner, main, navigation, etc.)
- Language attributes
- Title attributes for abbreviations