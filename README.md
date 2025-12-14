# 🌌 ForceShield Website

A modern, galaxy-themed educational platform and web interface for the ForceShield online safety solution. Built with React, TypeScript, and Vite.

![ForceShield](https://img.shields.io/badge/ForceShield-Galaxy%20Theme-8b5cf6)
![React](https://img.shields.io/badge/React-19.2.0-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178c6)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646cff)

## 🚀 Overview

ForceShield is an integrated online safety platform that includes a browser extension and educational website. This repository contains the website frontend, which provides:

- **Educational Content** - Learn about common cyber threats in simple, easy-to-understand language
- **AI Chatbot** - Interactive assistant to answer your cybersecurity questions
- **URL Scanner** - Check if websites are safe before visiting them
- **User Authentication** - Role-based access for families, schools, and organizations

## ✨ Features

### 🏠 Home Page

- Comprehensive threat education covering:
  - Phishing Attacks
  - Malware & Viruses
  - Privacy Invasion & Tracking
  - Social Engineering
  - Weak Passwords & Credential Theft
  - Fake Websites & Scams
- Interactive threat cards with detailed modals
- Demo URL scanner
- Resources section for additional learning

### 🤖 AI Assistant

- Interactive chatbot interface
- Pre-programmed responses for common security questions
- Suggested questions for quick access
- Ready for AI API integration

### 🔐 Authentication

- Sign up with role selection:
  - **Pro Account** - For parents, schools, and organizations
  - **Basic Account** - For children, students, and employees
- Login functionality
- Form validation
- Google OAuth button (UI ready)

## 🎨 Design System

The website features a stunning **galaxy theme** that matches the ForceShield browser extension:

- **Color Palette**: Deep purples, blues, and cosmic gradients
- **Animations**: Starfield background, smooth transitions, glowing effects
- **Typography**: Clean, readable fonts optimized for dark backgrounds
- **Responsive**: Mobile-first design that works on all devices

All design tokens are centralized in a theme configuration file for consistency and easy customization.

## 🛠️ Technology Stack

- **React 19.2.0** - Modern UI library
- **TypeScript 5.9.3** - Type-safe development
- **Vite 7.2.4** - Lightning-fast build tool
- **React Router DOM 6.26.2** - Client-side routing

## 📦 Installation

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

1. Navigate to the project directory:

```bash
cd ForceShield-website
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The site will be available at `http://localhost:5173`

## 📜 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

## 📁 Project Structure

```
ForceShield-website/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.tsx
│   │   └── Navbar.css
│   ├── pages/               # Page components
│   │   ├── Home.tsx         # Main educational page
│   │   ├── Chatbot.tsx      # AI assistant
│   │   └── Auth.tsx         # Authentication
│   ├── context/             # React contexts
│   │   └── ThemeContext.tsx
│   ├── config/              # Configuration
│   │   └── theme.ts         # Theme tokens
│   ├── App.tsx              # Main app with routing
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── API_INTEGRATION.md       # API integration guide
├── COMPONENT_ARCHITECTURE.md # Component documentation
├── PROJECT_OVERVIEW.md      # Detailed project info
├── THEME_GUIDE.md           # Theme system guide
└── README.md               # This file
```

## 📚 Documentation

Comprehensive documentation is available in the following files:

- **[PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md)** - Complete project documentation, features, and setup
- **[THEME_GUIDE.md](THEME_GUIDE.md)** - Design system and theme configuration guide
- **[API_INTEGRATION.md](API_INTEGRATION.md)** - Backend API integration instructions
- **[COMPONENT_ARCHITECTURE.md](COMPONENT_ARCHITECTURE.md)** - Component details and patterns

## 🔌 API Integration

The website is currently a **frontend-only demo** with mock data. To connect to a real backend:

1. Read [API_INTEGRATION.md](API_INTEGRATION.md) for detailed instructions
2. Set up your backend API endpoints
3. Configure environment variables
4. Update the API calls in the specified components

All components are structured and ready for seamless API integration.

## 🎯 Target Audience

### Pro Users (Parents, Schools, Organizations)

- Full monitoring and control capabilities
- Manage multiple users
- Advanced filtering options
- Detailed reports and analytics

### Basic Users (Children, Students, Employees)

- Personal protection
- Educational resources
- Safe browsing experience
- AI assistant access

## 🌐 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 Development Guidelines

- Use TypeScript for all new components
- Follow the established naming conventions
- Keep components under 300 lines
- Write responsive CSS using the theme system
- Test on multiple screen sizes
- Document complex logic

## 🔒 Security

This is an educational platform focused on cybersecurity. We take security seriously:

- All passwords will be hashed on the backend
- HTTPS only in production
- CSRF protection
- Input validation and sanitization
- Rate limiting on API endpoints

---

**Built with 💜 by the ForceShield Team**

_Protecting your digital universe, one website at a time._ 🌌🛡️
