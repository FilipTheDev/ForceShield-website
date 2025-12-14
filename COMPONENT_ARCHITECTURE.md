# ForceShield Website - Component Architecture

## Overview

This document provides detailed information about each component in the ForceShield website, including their purpose, props, state management, and usage examples.

---

## Navigation Components

### Navbar

**Location:** `src/components/Navbar.tsx`

**Purpose:** Main navigation bar with routing between pages

**Features:**

- Logo with shield SVG
- Navigation links (Home, AI Assistant, Get Started)
- Active route highlighting
- Sticky positioning
- Responsive design

**Props:** None (uses React Router's `useLocation` hook)

**Usage:**

```tsx
import Navbar from "./components/Navbar";

<Navbar />;
```

**Styling:**

- Purple gradient on logo text
- Underline animation on active/hover
- Galaxy gradient CTA button
- Mobile-responsive menu

---

## Page Components

### Home Page

**Location:** `src/pages/Home.tsx`

**Purpose:** Main landing page with educational content and scanner

**State:**

```typescript
const [selectedThreat, setSelectedThreat] = useState<Threat | null>(null);
const [scanUrl, setScanUrl] = useState("");
const [scanResult, setScanResult] = useState<string | null>(null);
```

**Sections:**

1. **Hero** - Main headline and CTA buttons
2. **Features** - 6 cards explaining ForceShield capabilities
3. **Scanner** - URL input with demo scanning functionality
4. **Threats** - 6 threat cards (clickable for details)
5. **Resources** - Additional learning materials
6. **Threat Modal** - Detailed threat information overlay

**Data Structure:**

```typescript
interface Threat {
  id: string;
  title: string;
  icon: string;
  description: string;
  howItWorks: string;
  prevention: string[];
  whatToDo: string[];
}
```

**Key Functions:**

- `handleScan(e)` - Processes URL scan submissions
- `setSelectedThreat(threat)` - Opens threat detail modal

**Threats Included:**

1. Phishing Attacks
2. Malware & Viruses
3. Privacy Invasion & Tracking
4. Social Engineering
5. Weak Passwords & Credential Theft
6. Fake Websites & Scams

**Usage:**

```tsx
import Home from "./pages/Home";

<Route path="/" element={<Home />} />;
```

---

### Chatbot Page

**Location:** `src/pages/Chatbot.tsx`

**Purpose:** Interactive AI assistant for cybersecurity questions

**State:**

```typescript
const [messages, setMessages] = useState<Message[]>([]);
const [inputValue, setInputValue] = useState("");
const [isTyping, setIsTyping] = useState(false);
```

**Data Structure:**

```typescript
interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}
```

**Features:**

- Message history with timestamps
- Typing indicator animation
- Suggested question chips
- Auto-scroll to bottom
- Pre-programmed responses for common topics

**Supported Topics:**

- Phishing
- Password security
- Website safety
- Clicked suspicious links
- Children protection
- Two-factor authentication
- Malware/viruses
- Social engineering
- VPN

**Key Functions:**

- `getBotResponse(userMessage)` - Returns appropriate response
- `handleSubmit(e)` - Sends user message
- `handleSuggestionClick(question)` - Fills input with suggestion
- `scrollToBottom()` - Keeps latest message visible

**Usage:**

```tsx
import Chatbot from "./pages/Chatbot";

<Route path="/chatbot" element={<Chatbot />} />;
```

---

### Auth Page

**Location:** `src/pages/Auth.tsx`

**Purpose:** User authentication with role-based sign up

**State:**

```typescript
const [mode, setMode] = useState<AuthMode>("signup"); // 'login' | 'signup'
const [formData, setFormData] = useState<FormData>({
  email: "",
  password: "",
  confirmPassword: "",
  name: "",
  role: null, // 'pro' | 'basic' | null
  organizationName: "",
});
const [errors, setErrors] = useState<Partial<FormData>>({});
```

**Data Structures:**

```typescript
type AuthMode = "login" | "signup";
type UserRole = "pro" | "basic" | null;

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  role: UserRole;
  organizationName?: string;
}
```

**Features:**

- Toggle between login and signup
- Role selection cards (Pro/Basic)
- Form validation
- Organization name for Pro accounts
- Password confirmation
- Remember me checkbox
- Google OAuth button (UI only)

**Role Types:**

**Pro Account:**

- For parents, schools, organizations
- Full control and monitoring
- Manage multiple users
- Advanced filtering
- Detailed reports
- Priority support

**Basic Account:**

- For children, students, employees
- Personal protection
- Real-time threat detection
- AI assistant access
- Safe browsing
- Educational resources

**Key Functions:**

- `handleRoleSelect(role)` - Sets user role
- `handleInputChange(e)` - Updates form fields
- `validateForm()` - Validates all inputs
- `handleSubmit(e)` - Processes form submission

**Validation Rules:**

- Email: Required, valid format
- Password: Required, min 8 characters
- Name: Required (signup only)
- Role: Required (signup only)
- Confirm Password: Must match password
- Organization: Required for Pro accounts

**Usage:**

```tsx
import Auth from "./pages/Auth";

<Route path="/auth" element={<Auth />} />;
```

---

## Context Components

### ThemeProvider

**Location:** `src/context/ThemeContext.tsx`

**Purpose:** Provides theme configuration to all components

**Context Value:**

```typescript
interface ThemeContextType {
  theme: Theme;
}
```

**Usage:**

```tsx
import { ThemeProvider, useTheme } from "./context/ThemeContext";

// Wrap app
<ThemeProvider>
  <App />
</ThemeProvider>;

// Use in components
const { theme } = useTheme();
```

**Theme Object:** See `THEME_GUIDE.md` for complete theme structure

---

## Styling Architecture

### CSS Organization

Each component has its own CSS file co-located with the component:

- `Navbar.tsx` → `Navbar.css`
- `Home.tsx` → `Home.css`
- `Chatbot.tsx` → `Chatbot.css`
- `Auth.tsx` → `Auth.css`

### Global Styles

**File:** `src/index.css`

**Includes:**

- CSS custom properties (variables)
- Base element resets
- Body styling with starfield background
- Scrollbar styling
- Focus states
- Selection styles

### CSS Naming Convention

- Component-specific classes prefixed with component name
- Example: `.navbar-container`, `.chatbot-header`, `.auth-form`
- Modifier classes: `.navbar-link.active`, `.message.message-user`

### Responsive Breakpoints

```css
/* Desktop default */
.element {
  /* ... */
}

/* Tablet */
@media (max-width: 768px) {
  /* ... */
}

/* Mobile */
@media (max-width: 480px) {
  /* ... */
}
```

---

## Component Interactions

### Navigation Flow

```
Navbar
├── Home (/)
├── Chatbot (/chatbot)
└── Auth (/auth)
```

### State Management

Currently using local component state. For production, consider:

- **Context API** - For global auth state
- **Redux** - For complex state management
- **Zustand** - Lightweight alternative
- **React Query** - For server state

### Data Flow

**Home Page:**

```
User clicks threat card
  ↓
setSelectedThreat(threat)
  ↓
Modal opens with threat details
  ↓
User closes modal
  ↓
setSelectedThreat(null)
```

**Chatbot:**

```
User types message
  ↓
handleSubmit()
  ↓
Add user message to state
  ↓
Show typing indicator
  ↓
getBotResponse()
  ↓
Add bot response to state
  ↓
Hide typing indicator
  ↓
Auto-scroll to bottom
```

**Auth:**

```
User selects role
  ↓
handleRoleSelect(role)
  ↓
Show form with role badge
  ↓
User fills form
  ↓
handleSubmit()
  ↓
validateForm()
  ↓
If valid: submit to API
If invalid: show errors
```

---

## Reusable Patterns

### Button Pattern

```css
.btn {
  padding: 0.875rem 2rem;
  border-radius: 2rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-primary {
  background: var(--galaxy-gradient);
  color: white;
}

.btn-primary:hover {
  box-shadow: var(--glow-purple);
  transform: translateY(-2px);
}
```

### Card Pattern

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

### Input Pattern

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
}
```

### Modal Pattern

```css
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  z-index: 1000;
}

.modal-content {
  background: var(--bg-space);
  border: 2px solid var(--border-cosmic);
  border-radius: 1.5rem;
  box-shadow: var(--shadow-lg), var(--glow-purple);
}
```

---

## Animation Patterns

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

.element {
  animation: fadeIn 0.3s ease;
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

### Hover Float

```css
.card:hover {
  transform: translateY(-5px);
  transition: transform 0.3s ease;
}
```

---

## Performance Considerations

### Optimization Strategies

1. **Code Splitting** - Routes are already split by React Router
2. **Lazy Loading** - Can add for images and heavy components
3. **Memoization** - Use `React.memo` for expensive renders
4. **useMemo/useCallback** - For complex calculations and functions

### Example Optimizations

```tsx
// Memoize expensive threat filtering
const filteredThreats = useMemo(() => {
  return threats.filter((t) => t.category === selectedCategory);
}, [selectedCategory]);

// Memoize callback to prevent re-renders
const handleClick = useCallback((id: string) => {
  setSelectedId(id);
}, []);

// Lazy load heavy component
const Dashboard = lazy(() => import("./pages/Dashboard"));
```

---

## Accessibility Features

### Current Implementation

- Semantic HTML (`<nav>`, `<main>`, `<section>`)
- Focus states on all interactive elements
- Color contrast meeting WCAG AA
- Alt text on SVG icons (should add)
- Keyboard navigation support

### To Add

- [ ] ARIA labels
- [ ] Skip navigation link
- [ ] Screen reader announcements for dynamic content
- [ ] Keyboard shortcuts documentation
- [ ] Focus trap in modals

---

## Testing Recommendations

### Component Testing

```tsx
// Example test for Navbar
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";

test("renders navigation links", () => {
  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );

  expect(screen.getByText("Home")).toBeInTheDocument();
  expect(screen.getByText("AI Assistant")).toBeInTheDocument();
  expect(screen.getByText("Get Started")).toBeInTheDocument();
});
```

### Integration Testing

- Test full user flows (signup → dashboard)
- Test form submissions
- Test modal interactions
- Test route navigation

---

## Future Component Ideas

### Dashboard Component

For authenticated users to view:

- Recent scans
- Security statistics
- Threat alerts
- Account settings

### Settings Component

User preferences:

- Notification settings
- Privacy controls
- Theme customization
- Language selection

### Reports Component

For Pro users:

- User activity reports
- Threat summaries
- Export capabilities

### Admin Panel

For Pro account managers:

- User management
- Policy configuration
- Bulk actions
- Analytics dashboard

---

## Component Checklist for New Features

When adding new components:

- [ ] Create component and CSS files
- [ ] Add TypeScript interfaces
- [ ] Implement responsive design
- [ ] Add hover/focus states
- [ ] Test on mobile
- [ ] Add to routing if needed
- [ ] Update documentation
- [ ] Consider accessibility
- [ ] Add loading states
- [ ] Add error handling
- [ ] Test with real data
