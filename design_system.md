# Design System Specification

## Color Palette

### Primary Colors
- Primary: `#0EA5E9` (Sky 500) - Main brand color
- Primary Dark: `#0284C7` (Sky 600) - Hover states
- Primary Light: `#7DD3FC` (Sky 300) - Subtle backgrounds

### Secondary Colors
- Secondary: `#0D9488` (Teal 500) - Health-related elements
- Secondary Dark: `#0F766E` (Teal 600) - Hover states
- Secondary Light: `#5EEAD4` (Teal 300) - Subtle accents

### Neutral Colors
- Background: `#FFFFFF` (White)
- Surface: `#F9FAFB` (Gray 50)
- Surface Contrast: `#F3F4F6` (Gray 100)
- Border: `#E5E7EB` (Gray 200)
- Text Primary: `#111827` (Gray 900)
- Text Secondary: `#6B7280` (Gray 500)
- Text Tertiary: `#9CA3AF` (Gray 400)

### Semantic Colors
- Success: `#10B981` (Emerald 500)
- Success Light: `#A7F3D0` (Emerald 200)
- Warning: `#F59E0B` (Amber 500)
- Warning Light: `#FDE68A` (Amber 200)
- Danger: `#EF4444` (Red 500)
- Danger Light: `#FECACA` (Red 200)
- Info: `#3B82F6` (Blue 500)
- Info Light: `#BFDBFE` (Blue 200)

### Gradient Palette
- Primary Gradient: `linear-gradient(135deg, #0EA5E9 0%, #0D9488 100%)`
- Health Gradient: `linear-gradient(135deg, #0D9488 0%, #10B981 100%)`

## Typography

### Font Family
- Primary: Inter (sans-serif)
- Monospace: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace

### Font Sizes
- xs: 0.75rem (12px)
- sm: 0.875rem (14px)
- base: 1rem (16px)
- lg: 1.125rem (18px)
- xl: 1.25rem (20px)
- 2xl: 1.5rem (24px)
- 3xl: 1.875rem (30px)
- 4xl: 2.25rem (36px)
- 5xl: 3rem (48px)
- 6xl: 3.75rem (60px)
- 7xl: 4.5rem (72px)

### Font Weights
- Thin: 100
- Extra Light: 200
- Light: 300
- Normal: 400
- Medium: 500
- Semi Bold: 600
- Bold: 700
- Extra Bold: 800
- Black: 900

### Line Heights
- Tight: 1.25
- Snug: 1.375
- Normal: 1.5
- Relaxed: 1.625
- Loose: 2

### Heading Styles
- H1: 3rem (48px), Bold, 1.25 line height
- H2: 2.25rem (36px), Semi Bold, 1.3 line height
- H3: 1.875rem (30px), Semi Bold, 1.35 line height
- H4: 1.5rem (24px), Semi Bold, 1.4 line height
- H5: 1.25rem (20px), Medium, 1.45 line height
- H6: 1.125rem (18px), Medium, 1.5 line height

## Spacing System

### Base Unit
- 1 unit = 4px

### Scale
- 0: 0px
- 0.5: 2px
- 1: 4px
- 1.5: 6px
- 2: 8px
- 2.5: 10px
- 3: 12px
- 3.5: 14px
- 4: 16px
- 5: 20px
- 6: 24px
- 7: 28px
- 8: 32px
- 9: 36px
- 10: 40px
- 11: 44px
- 12: 48px
- 14: 56px
- 16: 64px
- 20: 80px
- 24: 96px
- 28: 112px
- 32: 128px
- 36: 144px
- 40: 160px
- 44: 176px
- 48: 192px
- 52: 208px
- 56: 224px
- 60: 240px
- 64: 256px
- 72: 288px
- 80: 320px
- 96: 384px

## Border Radius

### Scale
- none: 0px
- sm: 2px
- DEFAULT: 4px
- md: 6px
- lg: 8px
- xl: 12px
- 2xl: 16px
- 3xl: 24px
- full: 9999px

## Shadows

### Elevation
- sm: 0 1px 2px 0 rgb(0 0 0 / 0.05)
- DEFAULT: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)
- md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)
- lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)
- xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)
- 2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25)
- inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.05)

## Breakpoints

### Responsive Design
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

## Z-Index Scale

### Layer Order
- auto: auto
- 0: 0
- 10: 10
- 20: 20
- 30: 30
- 40: 40
- 50: 50

### Common Layers
- Dropdown: 10
- Sticky: 20
- Fixed: 30
- Modal Backdrop: 40
- Modal: 50
- Popover: 50
- Tooltip: 50

## Animation

### Duration
- fast: 150ms
- normal: 300ms
- slow: 500ms

### Timing Functions
- linear: cubic-bezier(0, 0, 1, 1)
- in: cubic-bezier(0.4, 0, 1, 1)
- out: cubic-bezier(0, 0, 0.2, 1)
- in-out: cubic-bezier(0.4, 0, 0.2, 1)

### Transitions
- Default: all 300ms cubic-bezier(0.4, 0, 0.2, 1)
- Colors: background-color, border-color, color, fill, stroke 300ms cubic-bezier(0.4, 0, 0.2, 1)
- Opacity: opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)
- Shadow: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)
- Transform: transform 300ms cubic-bezier(0.4, 0, 0.2, 1)

## Icons

### Icon Sizes
- xs: 1rem (16px)
- sm: 1.25rem (20px)
- DEFAULT: 1.5rem (24px)
- lg: 1.75rem (28px)
- xl: 2rem (32px)
- 2xl: 2.5rem (40px)

### Icon Colors
- Primary: Current text color
- Secondary: Gray 500
- Success: Emerald 500
- Warning: Amber 500
- Danger: Red 500
- Info: Blue 500

## Form Elements

### Input Heights
- sm: 2rem (32px)
- DEFAULT: 2.5rem (40px)
- lg: 3rem (48px)

### Input Padding
- sm: 0.5rem (8px)
- DEFAULT: 0.75rem (12px)
- lg: 1rem (16px)

### Input Border
- Width: 1px
- Radius: 0.375rem (6px)
- Color: Gray 300

### Focus Ring
- Offset: 2px
- Width: 2px
- Color: Sky 500 with 50% opacity

## Cards

### Card Padding
- sm: 1rem (16px)
- DEFAULT: 1.5rem (24px)
- lg: 2rem (32px)

### Card Border
- Width: 1px
- Radius: 0.5rem (8px)
- Color: Gray 200

### Card Shadow
- Default: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)
- Hover: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)

## Buttons

### Button Padding
- sm: 0.5rem 0.75rem
- DEFAULT: 0.625rem 1rem
- lg: 0.75rem 1.5rem

### Button Border Radius
- sm: 0.25rem (4px)
- DEFAULT: 0.375rem (6px)
- lg: 0.5rem (8px)

### Button States
- Default: Base color
- Hover: Darkened by 10%
- Active: Darkened by 20%
- Focus: With focus ring
- Disabled: 50% opacity

## Tables

### Table Cell Padding
- sm: 0.5rem
- DEFAULT: 0.75rem 1rem
- lg: 1rem 1.5rem

### Table Border
- Width: 1px
- Color: Gray 200

### Table Striped Rows
- Background: Gray 50

## Accessibility

### Focus Visible
- Outline: 2px solid transparent
- Outline Offset: 2px
- Ring: 2px solid Sky 500

### Screen Readers
- sr-only: Visually hidden but accessible to screen readers
- not-sr-only: Reverses sr-only

## Dark Mode (Future Consideration)

### Color Mapping
- Background: Gray 900
- Surface: Gray 800
- Text Primary: Gray 100
- Text Secondary: Gray 400
- Border: Gray 700

## Implementation Notes

### CSS Custom Properties
All design tokens should be available as CSS custom properties for easy theming and maintenance.

### Consistency
Maintain consistency across all components by strictly following the defined scales and patterns.

### Extensibility
Design system should be extensible to accommodate future requirements while maintaining coherence.

### Performance
Optimize for performance by minimizing unnecessary styles and leveraging efficient CSS techniques.