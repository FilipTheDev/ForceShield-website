# ForceShield Website - Project Documentation

## Overview

ForceShield is an integrated online safety platform with a React TypeScript website built with Vite. The website serves as the educational hub and access point for the ForceShield browser extension and security services.

## Project Structure

```
ForceShield-website/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.tsx       # Navigation bar with routing
│   │   └── Navbar.css
│   ├── pages/               # Main page components
│   │   ├── Home.tsx         # Educational content & threat info
│   │   ├── Home.css
│   │   ├── Chatbot.tsx      # AI assistant chatbot interface
│   │   ├── Chatbot.css
│   │   ├── Auth.tsx         # Sign up/Login with role selection
│   │   └── Auth.css
│   ├── context/             # React context providers
│   │   └── ThemeContext.tsx # Theme context for galaxy design
│   ├── config/              # Configuration files
│   │   └── theme.ts         # Single source of truth for theme
│   ├── App.tsx              # Main app component with routing
│   ├── App.css
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── package.json
├── tsconfig.json
├── vite.config.ts
└── index.html
```

## Technology Stack

- **React 19.2.0** - UI framework
- **TypeScript 5.9.3** - Type safety
- **Vite 7.2.4** - Build tool and dev server
- **React Router DOM 6.26.2** - Client-side routing

## Design System

### Galaxy Theme

The website follows a consistent galaxy/space theme matching the ForceShield browser extension:

**Color Palette:**

- Primary Gradient: `#1a0066 → #4a0e78 → #6b2fb5 → #8b5cf6 → #c084fc`
- Background: `#0f0a1f` (dark space)
- Status Colors:
  - Safe: `#34d399` (green)
  - Warning: `#fbbf24` (amber)
  - Danger: `#f87171` (red)

**Typography:**

- Font Family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto
- Sizes: 0.75rem to 3rem (responsive)

**Effects:**

- Animated starfield background
- Purple glow effects on interactive elements
- Smooth transitions (300ms cubic-bezier)
- Box shadows for depth

All theme values are centralized in `src/config/theme.ts` for consistency.

## Pages

### 1. Home Page (`/`)

**Purpose:** Educational hub about cyber threats and ForceShield services

**Features:**

- Hero section with call-to-action buttons
- Feature cards explaining ForceShield capabilities
- URL/Link scanner (demo functionality)
- Educational content about 6 common threats:
  1. Phishing Attacks
  2. Malware & Viruses
  3. Privacy Invasion & Tracking
  4. Social Engineering
  5. Weak Passwords & Credential Theft
  6. Fake Websites & Scams
- Detailed modal for each threat with:
  - What it is
  - How it works
  - Prevention tips
  - What to do if it happens
- Additional resources section
- Fully responsive design

### 2. Chatbot Page (`/chatbot`)

**Purpose:** AI assistant for cybersecurity questions

**Features:**

- Interactive chat interface
- Pre-programmed responses for common questions
- Suggested questions chips
- Message history with timestamps
- Typing indicator animation
- Demo disclaimer (ready for API integration)
- Fully responsive mobile design

**Topics Covered:**

- Phishing
- Password security
- Website safety
- Children protection
- Two-factor authentication
- Malware
- Social engineering
- VPN

### 3. Auth Page (`/auth`)

**Purpose:** User registration and login with role-based access

**Features:**

- Toggle between Sign Up and Login modes
- Role selection for Sign Up:
  - **Pro Account** (Parents, Schools, Organizations)
    - Full control and monitoring
    - Manage multiple users
    - Advanced filtering
    - Detailed reports
    - Priority support
  - **Basic Account** (Children, Students, Employees)
    - Personal protection
    - Real-time threat detection
    - AI assistant access
    - Safe browsing
    - Educational resources
- Form validation
- Organization name field for Pro accounts
- Password requirements
- Google OAuth button (UI only)
- Demo disclaimer (ready for backend API)

## Key Features

### Theme Context

- Centralized theme management using React Context
- Single source of truth for colors, spacing, typography
- Easy to modify and maintain
- Type-safe with TypeScript

### Responsive Design

- Mobile-first approach
- Breakpoints:
  - Desktop: 1200px+ (max-width container)
  - Tablet: 768px - 1199px
  - Mobile: < 768px
- Flexible grid layouts
- Touch-friendly interface elements

### Animations

- Smooth transitions on all interactive elements
- Floating shield illustration
- Starfield background animation
- Message slide-in animations
- Typing indicator
- Button hover effects with glow

### Accessibility

- Semantic HTML elements
- Proper heading hierarchy
- Focus states on all interactive elements
- Color contrast meeting WCAG standards
- Keyboard navigation support

## Setup Instructions

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Navigate to the project directory:

```bash
cd ForceShield-website
```

2. Install dependencies:

```bash
npm install
```

### Running Development Server

```bash
npm run dev
```

The site will be available at `http://localhost:5173` (or another port if 5173 is busy).

### Building for Production

```bash
npm run build
```

Build output will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Future Enhancements

### Backend Integration

1. **Authentication API**

   - User registration and login
   - Role-based access control
   - Session management
   - Password reset functionality

2. **Chatbot API**

   - Connect to AI service (OpenAI, Anthropic, etc.)
   - Conversation history persistence
   - Context-aware responses
   - Multi-language support

3. **Scanner API**

   - Real URL analysis
   - File upload and scanning
   - Threat database integration
   - Risk scoring algorithm
   - Scanning history for authenticated users

4. **User Dashboard**
   - Personal security stats
   - Scan history
   - Threat alerts
   - Settings and preferences
   - For Pro: User management interface

### Additional Features

- Dark/Light mode toggle
- Multi-language support (i18n)
- Blog section for security news
- Video tutorials
- Downloadable guides (PDFs)
- Community forum
- Push notifications for threats
- Browser extension integration status

## Development Guidelines

### Code Style

- Use functional components with hooks
- TypeScript strict mode enabled
- Consistent naming: PascalCase for components, camelCase for functions
- Keep components under 300 lines (extract sub-components)
- Use theme constants instead of hardcoded values

### File Organization

- One component per file
- Co-locate CSS with components
- Keep assets in `/public` or `/src/assets`
- Group related files in folders

### Git Workflow

- Feature branches from `main`
- Descriptive commit messages
- Pull requests for review

## Testing

### Manual Testing Checklist

- [ ] All routes load correctly
- [ ] Navigation works on all pages
- [ ] Forms validate properly
- [ ] Responsive design on mobile, tablet, desktop
- [ ] All interactive elements respond to clicks
- [ ] Chatbot sends and receives messages
- [ ] Scanner shows results
- [ ] Modal opens and closes
- [ ] Role selection works
- [ ] Auth form validation works

### Future: Automated Testing

- Unit tests with Vitest
- Component tests with React Testing Library
- E2E tests with Playwright
- Accessibility tests with axe-core

## Performance Optimization

### Current

- Vite for fast bundling
- Code splitting by route
- CSS scoped to components
- Optimized images (when added)

### Future Improvements

- Lazy loading for images
- Service worker for offline support
- Bundle size analysis
- Performance monitoring

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

[Add license information]

## Contributors

[Add contributor information]

## Support

For questions or issues, contact: [Add contact information]
