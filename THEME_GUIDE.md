# ForceShield Website - Theme System Guide

## Overview

The ForceShield website uses a centralized theme system inspired by the galaxy/space aesthetic of the browser extension. All design tokens (colors, spacing, typography, etc.) are defined in a single location for consistency and maintainability.

## Theme Configuration Location

**File:** `src/config/theme.ts`

This is the **single source of truth** for all theme-related values.

## Design Philosophy

### Galaxy Theme

The design mimics a cosmic/nebula aesthetic with:

- Deep purple and blue gradients
- Starfield animations
- Glowing effects on interactive elements
- Dark space backgrounds
- High contrast text for readability

## Theme Structure

### 1. Gradients

```typescript
gradients: {
  galaxy: 'linear-gradient(135deg, #1a0066 0%, #4a0e78 25%, #6b2fb5 50%, #8b5cf6 75%, #c084fc 100%)',
  primary: 'linear-gradient(135deg, #1a0066 0%, #4a0e78 25%, #6b2fb5 50%, #8b5cf6 75%, #c084fc 100%)',
  nebula: 'linear-gradient(135deg, #0f0a3c 0%, #2d1b69 50%, #5b21b6 100%)',
  cosmic: 'linear-gradient(135deg, #1e1b4b 0%, #4c1d95 25%, #7c3aed 50%, #a78bfa 75%, #c4b5fd 100%)',
}
```

**Usage:**

- `galaxy/primary`: Main brand gradient for buttons, headers, CTAs
- `nebula`: Card backgrounds, containers
- `cosmic`: Alternate gradient for variety

### 2. Status Colors

```typescript
status: {
  safe: '#34d399',    // Green - for safe/successful states
  warning: '#fbbf24', // Amber - for warnings
  danger: '#f87171',  // Red - for errors/dangers
}
```

**Usage:**

- Scanner results
- Alerts and notifications
- Validation feedback
- Threat level indicators

### 3. Background Colors

```typescript
background: {
  dark: '#0f0a1f',                    // Main page background
  space: '#1a0f2e',                   // Secondary containers
  cosmic: '#251944',                  // Elevated elements
  light: 'rgba(37, 25, 68, 0.4)',    // Overlays
}
```

**Hierarchy:**

1. `dark` - Base layer (body background)
2. `space` - Cards, modals
3. `cosmic` - Nested elements, inputs
4. `light` - Translucent overlays

### 4. Text Colors

```typescript
text: {
  onDark: '#e0e7ff',   // Main text on dark backgrounds
  light: '#e0e7ff',    // Primary text
  cosmic: '#c7d2fe',   // Secondary text
  dim: '#a5b4fc',      // Tertiary text, hints
  dark: '#e0e7ff',     // For dark theme
  onLight: '#1e293b',  // For light backgrounds (rare)
}
```

**Usage Hierarchy:**

1. `light/onDark` - Headings, important text
2. `cosmic` - Body text, descriptions
3. `dim` - Hints, placeholders, metadata

### 5. Border & Effects

```typescript
border: {
  cosmic: 'rgba(139, 92, 246, 0.3)', // Translucent purple
  color: 'rgba(139, 92, 246, 0.3)',
}

glow: {
  purple: '0 0 20px rgba(139, 92, 246, 0.5), 0 0 40px rgba(139, 92, 246, 0.3)',
  cyan: '0 0 20px rgba(34, 211, 238, 0.5), 0 0 40px rgba(34, 211, 238, 0.3)',
}
```

**Usage:**

- Borders on cards, inputs, modals
- Glow effects on hover states
- Focus indicators

### 6. Shadows

```typescript
shadow: {
  default: '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
  lg: '0 10px 25px -5px rgba(0, 0, 0, 0.8), 0 10px 10px -5px rgba(0, 0, 0, 0.5)',
}
```

**Usage:**

- `default` - Buttons, small cards
- `lg` - Modals, major containers, elevated states

### 7. Spacing

```typescript
spacing: {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '3rem',   // 48px
  '3xl': '4rem',   // 64px
}
```

**Usage Guidelines:**

- `xs/sm` - Internal padding, gaps between elements
- `md` - Standard padding for components
- `lg/xl` - Section spacing, card padding
- `2xl/3xl` - Page section margins

### 8. Border Radius

```typescript
borderRadius: {
  sm: '0.375rem',   // 6px - small elements
  md: '0.5rem',     // 8px - standard
  lg: '0.75rem',    // 12px - cards
  xl: '1rem',       // 16px - large cards, modals
  '2xl': '1.5rem',  // 24px - containers
  full: '9999px',   // Circles, pills
}
```

### 9. Typography

```typescript
fontSize: {
  xs: '0.75rem',    // 12px - metadata, hints
  sm: '0.875rem',   // 14px - small text
  base: '1rem',     // 16px - body text
  lg: '1.125rem',   // 18px - large body
  xl: '1.25rem',    // 20px - subheadings
  '2xl': '1.5rem',  // 24px - card titles
  '3xl': '1.875rem',// 30px - section headings
  '4xl': '2.25rem', // 36px - page titles
  '5xl': '3rem',    // 48px - hero headings
}
```

### 10. Transitions

```typescript
transition: {
  fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  base: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
}
```

## Using the Theme

### In TypeScript Components

```typescript
import { useTheme } from "../context/ThemeContext";

const MyComponent: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div
      style={{
        background: theme.gradients.galaxy,
        color: theme.text.light,
        padding: theme.spacing.lg,
        borderRadius: theme.borderRadius.xl,
      }}
    >
      Content
    </div>
  );
};
```

### In CSS Files

Use CSS custom properties defined in `index.css`:

```css
.my-component {
  background: var(--galaxy-gradient);
  color: var(--text-light);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius-xl);
  border: 1px solid var(--border-cosmic);
  box-shadow: var(--shadow-lg);
}

.my-component:hover {
  box-shadow: var(--glow-purple);
}
```

### Available CSS Variables

All theme values are also available as CSS custom properties:

- `--galaxy-gradient`, `--primary-gradient`, `--nebula-gradient`, `--cosmic-gradient`
- `--safe-color`, `--warning-color`, `--danger-color`
- `--bg-dark`, `--bg-space`, `--bg-cosmic`, `--bg-light`
- `--text-on-dark`, `--text-light`, `--text-cosmic`, `--text-dim`
- `--border-cosmic`, `--glow-purple`, `--glow-cyan`
- `--shadow`, `--shadow-lg`

## Component Styling Patterns

### Cards

```css
.card {
  background: var(--nebula-gradient);
  border: 1px solid var(--border-cosmic);
  border-radius: 1rem;
  padding: 2rem;
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: var(--glow-purple);
  border-color: #8b5cf6;
}
```

### Buttons

```css
.btn-primary {
  background: var(--galaxy-gradient);
  color: white;
  padding: 0.875rem 2rem;
  border-radius: 2rem;
  border: none;
  font-weight: 600;
  box-shadow: var(--shadow);
  transition: all 0.3s ease;
}

.btn-primary:hover {
  box-shadow: var(--glow-purple);
  transform: translateY(-2px);
}
```

### Inputs

```css
.input {
  background: rgba(15, 10, 31, 0.6);
  border: 2px solid var(--border-cosmic);
  border-radius: 0.75rem;
  padding: 0.875rem 1.25rem;
  color: var(--text-light);
  transition: all 0.3s ease;
}

.input:focus {
  border-color: #8b5cf6;
  box-shadow: var(--glow-purple);
  outline: none;
}
```

### Modals

```css
.modal-overlay {
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
}

.modal-content {
  background: var(--bg-space);
  border: 2px solid var(--border-cosmic);
  border-radius: 1.5rem;
  box-shadow: var(--shadow-lg), var(--glow-purple);
}
```

## Animations

### Starfield Background

```css
body::before {
  content: "";
  position: fixed;
  /* ... radial gradients ... */
  animation: stars 60s ease-in-out infinite;
  opacity: 0.3;
}

@keyframes stars {
  0%,
  100% {
    background-position: 0% 0%;
  }
  50% {
    background-position: 100% 100%;
  }
}
```

### Floating Animation

```css
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.floating-element {
  animation: float 3s ease-in-out infinite;
}
```

### Fade In

```css
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
```

### Slide Up

```css
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

## Responsive Design

### Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1199px
- **Desktop**: 1200px+

### Media Query Pattern

```css
/* Desktop first (default) */
.element {
  /* Desktop styles */
}

/* Tablet */
@media (max-width: 1199px) {
  .element {
    /* Tablet adjustments */
  }
}

/* Mobile */
@media (max-width: 768px) {
  .element {
    /* Mobile adjustments */
  }
}
```

## Modifying the Theme

### To Change Colors

1. Edit `src/config/theme.ts`
2. Update CSS variables in `src/index.css` if needed
3. Changes will propagate throughout the app

### To Add New Values

1. Add to the theme object in `theme.ts`
2. Add corresponding CSS variable in `index.css`
3. Update TypeScript type if needed
4. Document the new value

### To Create Variations

```typescript
// In theme.ts
export const darkTheme = {
  ...theme,
  background: {
    ...theme.background,
    dark: "#000000", // Darker variant
  },
};
```

## Best Practices

1. **Always use theme values** instead of hardcoding colors
2. **Prefer CSS variables** for better performance
3. **Maintain consistency** across all pages
4. **Test in dark environments** - the design is optimized for dark mode
5. **Use gradients sparingly** - mainly for primary actions
6. **Ensure contrast ratios** meet WCAG standards (4.5:1 minimum)
7. **Document any deviations** from the theme system

## Accessibility Considerations

- Text colors meet WCAG AA contrast requirements
- Focus states are clearly visible
- Interactive elements have sufficient size (44x44px minimum)
- Color is not the only indicator of state
- Animations respect `prefers-reduced-motion`

## Future Enhancements

- [ ] Light mode theme variant
- [ ] Theme switcher component
- [ ] Custom theme builder for organizations
- [ ] Colorblind-friendly mode
- [ ] High contrast mode
- [ ] Theme preview in settings
