// ForceShield Theme Configuration
// Single source of truth for all colors, spacing, and design tokens

export const theme = {
  // Galaxy Gradients - matching the extension
  gradients: {
    galaxy: 'linear-gradient(135deg, #1a0066 0%, #4a0e78 25%, #6b2fb5 50%, #8b5cf6 75%, #c084fc 100%)',
    primary: 'linear-gradient(135deg, #1a0066 0%, #4a0e78 25%, #6b2fb5 50%, #8b5cf6 75%, #c084fc 100%)',
    nebula: 'linear-gradient(135deg, #0f0a3c 0%, #2d1b69 50%, #5b21b6 100%)',
    cosmic: 'linear-gradient(135deg, #1e1b4b 0%, #4c1d95 25%, #7c3aed 50%, #a78bfa 75%, #c4b5fd 100%)',
  },

  // Status Colors
  status: {
    safe: '#34d399',
    warning: '#fbbf24',
    danger: '#f87171',
  },

  // Background Colors (Dark Space Theme)
  background: {
    dark: '#0f0a1f',
    space: '#1a0f2e',
    cosmic: '#251944',
    light: 'rgba(37, 25, 68, 0.4)',
  },

  // Text Colors
  text: {
    onDark: '#e0e7ff',
    light: '#e0e7ff',
    cosmic: '#c7d2fe',
    dim: '#a5b4fc',
    dark: '#e0e7ff',
    onLight: '#1e293b',
  },

  // Border & Effects
  border: {
    cosmic: 'rgba(139, 92, 246, 0.3)',
    color: 'rgba(139, 92, 246, 0.3)',
  },

  // Glows
  glow: {
    purple: '0 0 20px rgba(139, 92, 246, 0.5), 0 0 40px rgba(139, 92, 246, 0.3)',
    cyan: '0 0 20px rgba(34, 211, 238, 0.5), 0 0 40px rgba(34, 211, 238, 0.3)',
  },

  // Shadows
  shadow: {
    default: '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
    lg: '0 10px 25px -5px rgba(0, 0, 0, 0.8), 0 10px 10px -5px rgba(0, 0, 0, 0.5)',
  },

  // Spacing
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },

  // Border Radius
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
    full: '9999px',
  },

  // Typography
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  },

  // Transitions
  transition: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    base: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

export type Theme = typeof theme;
