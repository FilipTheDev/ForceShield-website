# 🚀 Quick Start Guide - ForceShield Website

## Getting Started

This guide will help you get the ForceShield website running on your local machine in just a few minutes!

## Prerequisites

Make sure you have:

- **Node.js** version 18 or higher ([Download here](https://nodejs.org/))
- **npm** (comes with Node.js) or **yarn**

To check if you have these installed:

```bash
node --version  # Should be v18.0.0 or higher
npm --version   # Should be v9.0.0 or higher
```

## Installation Steps

### 1. Navigate to the Project

```bash
cd ForceShield-website
```

### 2. Install Dependencies

```bash
npm install
```

This will install:

- React 19.2.0
- TypeScript 5.9.3
- Vite 7.2.4
- React Router DOM 6.26.2
- All development dependencies

Wait for the installation to complete (usually 1-2 minutes).

### 3. Start the Development Server

```bash
npm run dev
```

You should see output like:

```
  VITE v7.2.4  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### 4. Open in Browser

Open your web browser and go to:

```
http://localhost:5173
```

You should now see the ForceShield website! 🎉

## What You'll See

### Home Page (/)

- Hero section with the ForceShield brand
- Feature cards explaining capabilities
- URL scanner (demo version)
- Educational threat information
- Click on any threat card to see detailed information

### Chatbot Page (/chatbot)

- Interactive AI assistant interface
- Try typing questions like:
  - "What is phishing?"
  - "How can I create a strong password?"
  - "Is this website safe to use?"
- Use the suggested question chips for quick access

### Auth Page (/auth)

- Sign up / Login interface
- **Try the Sign Up flow:**
  1. Choose a role (Pro or Basic)
  2. Fill in the form
  3. Submit (demo - doesn't actually create an account)

## Development Commands

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Making Changes

The development server has **Hot Module Replacement (HMR)**, which means:

- Edit any `.tsx`, `.ts`, `.css` file
- Save the file
- The browser automatically updates without a full page reload!

Try it:

1. Open `src/pages/Home.tsx`
2. Change the hero title text
3. Save
4. Watch the browser update instantly

## Project Structure Overview

```
src/
├── components/      # Reusable UI components
│   └── Navbar.tsx   # Navigation bar
├── pages/           # Main pages
│   ├── Home.tsx     # Home/educational page
│   ├── Chatbot.tsx  # AI assistant
│   └── Auth.tsx     # Authentication
├── context/         # React contexts
│   └── ThemeContext.tsx
├── config/          # Configuration
│   └── theme.ts     # Theme tokens
├── App.tsx          # Main app with routing
└── index.css        # Global styles
```

## Tips for Testing

### Test Responsive Design

1. Open browser DevTools (F12)
2. Click the device icon (Ctrl+Shift+M)
3. Try different screen sizes:
   - Mobile: 375px
   - Tablet: 768px
   - Desktop: 1920px

### Test Different Features

- **Home Page:**
  - Click on threat cards
  - Try the scanner with different URLs
  - Scroll through all sections
- **Chatbot:**
  - Type custom questions
  - Click suggested questions
  - Check message timestamps
- **Auth Page:**
  - Try both Pro and Basic roles
  - Test form validation (submit empty form)
  - Switch between Login and Sign Up

## Common Issues & Solutions

### Port Already in Use

If you see "Port 5173 is already in use":

```bash
# Stop the server with Ctrl+C
# Then start again, Vite will use the next available port
npm run dev
```

### Module Not Found

If you see module errors:

```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### TypeScript Errors

If you see TypeScript errors in your editor:

```bash
# Make sure TypeScript is installed globally
npm install -g typescript

# Or just use the project's TypeScript
npx tsc --version
```

### Browser Cache Issues

If changes aren't appearing:

1. Hard refresh: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
2. Or clear browser cache

## Next Steps

1. **Explore the Code**

   - Read through `src/pages/Home.tsx` to see how threats are structured
   - Check `src/config/theme.ts` to understand the design system
   - Look at `src/pages/Chatbot.tsx` to see the chat logic

2. **Read Documentation**

   - [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md) - Complete project info
   - [THEME_GUIDE.md](THEME_GUIDE.md) - Design system details
   - [API_INTEGRATION.md](API_INTEGRATION.md) - Backend integration guide
   - [COMPONENT_ARCHITECTURE.md](COMPONENT_ARCHITECTURE.md) - Component details

3. **Make It Your Own**

   - Customize colors in `src/config/theme.ts`
   - Add new threat cards in `src/pages/Home.tsx`
   - Enhance chatbot responses in `src/pages/Chatbot.tsx`

4. **Connect to Backend** (when ready)
   - Follow [API_INTEGRATION.md](API_INTEGRATION.md)
   - Set up environment variables
   - Replace mock data with real API calls

## Demo Features

Currently, these features are **frontend-only demos**:

- ✅ URL Scanner - Shows mock results
- ✅ Chatbot - Pre-programmed responses
- ✅ Authentication - Form validation only
- ✅ All UI interactions work

To make them **fully functional**, you'll need to:

- Set up a backend API
- Connect to AI services (OpenAI, Anthropic, etc.)
- Integrate security scanning services
- Implement user authentication

See [API_INTEGRATION.md](API_INTEGRATION.md) for detailed instructions.

## Getting Help

If you run into issues:

1. **Check the console** - Open browser DevTools (F12) and look for errors
2. **Check the terminal** - Look for error messages where you ran `npm run dev`
3. **Read the docs** - Check the documentation files in the project
4. **Search for errors** - Copy error messages and search online

## You're All Set! 🎉

The ForceShield website is now running. Explore, experiment, and have fun!

**Remember:** This is currently a frontend demo. All forms and features work in the UI, but they don't connect to a real backend yet. When you're ready to make it fully functional, follow the API integration guide.

---

**Happy coding!** 💜🌌🛡️
