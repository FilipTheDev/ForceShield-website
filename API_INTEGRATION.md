# ForceShield Website - API Integration Guide

## Overview

This document outlines how to integrate the ForceShield website frontend with backend APIs for authentication, chatbot functionality, and URL/file scanning services.

## Current State

The website is currently a **frontend-only demo** with:

- Mock authentication flows
- Pre-programmed chatbot responses
- Simulated scanner results

All forms and interactive features are ready for API integration.

---

## 1. Authentication API

### Endpoints Needed

#### Sign Up

```
POST /api/auth/signup
```

**Request Body:**

```typescript
{
  name: string;
  email: string;
  password: string;
  role: 'pro' | 'basic';
  organizationName?: string; // Required if role is 'pro'
}
```

**Response:**

```typescript
{
  success: boolean;
  message: string;
  user?: {
    id: string;
    name: string;
    email: string;
    role: 'pro' | 'basic';
    organizationName?: string;
  };
  token?: string; // JWT or session token
}
```

#### Login

```
POST /api/auth/login
```

**Request Body:**

```typescript
{
  email: string;
  password: string;
}
```

**Response:**

```typescript
{
  success: boolean;
  message: string;
  user?: {
    id: string;
    name: string;
    email: string;
    role: 'pro' | 'basic';
  };
  token?: string;
}
```

#### OAuth (Google)

```
GET /api/auth/google
POST /api/auth/google/callback
```

Follow OAuth 2.0 flow for Google Sign-In.

### Frontend Integration Points

**File:** `src/pages/Auth.tsx`

**Function to modify:** `handleSubmit`

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!validateForm()) return;

  try {
    const endpoint = mode === "signup" ? "/api/auth/signup" : "/api/auth/login";
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        organizationName: formData.organizationName,
      }),
    });

    const data = await response.json();

    if (data.success) {
      // Store token
      localStorage.setItem("authToken", data.token);
      // Store user info
      localStorage.setItem("user", JSON.stringify(data.user));
      // Redirect to dashboard
      navigate("/dashboard");
    } else {
      // Show error message
      setErrors({ email: data.message });
    }
  } catch (error) {
    console.error("Auth error:", error);
    setErrors({ email: "An error occurred. Please try again." });
  }
};
```

### Authentication State Management

Create an auth context to manage user state across the app:

**File:** `src/context/AuthContext.tsx`

```typescript
import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "pro" | "basic";
  organizationName?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Check for stored auth on mount
    const storedToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("user");
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (user: User, token: string) => {
    setUser(user);
    setToken(token);
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: !!user && !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
```

---

## 2. Chatbot API

### Endpoints Needed

#### Send Message

```
POST /api/chatbot/message
```

**Request Body:**

```typescript
{
  message: string;
  conversationId?: string; // For maintaining conversation context
  userId?: string; // If user is authenticated
}
```

**Response:**

```typescript
{
  response: string;
  conversationId: string;
  timestamp: string;
}
```

### Recommended AI Services

- **OpenAI GPT-4** - Most capable, good for complex explanations
- **Anthropic Claude** - Excellent for safety-focused responses
- **Google Gemini** - Good balance of capability and cost
- **Custom fine-tuned model** - Best for consistent brand voice

### Frontend Integration

**File:** `src/pages/Chatbot.tsx`

**Function to modify:** `handleSubmit`

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!inputValue.trim()) return;

  // Add user message to UI
  const userMessage: Message = {
    id: Date.now().toString(),
    text: inputValue,
    sender: "user",
    timestamp: new Date(),
  };
  setMessages((prev) => [...prev, userMessage]);
  setInputValue("");
  setIsTyping(true);

  try {
    const response = await fetch("/api/chatbot/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`, // If auth required
      },
      body: JSON.stringify({
        message: userMessage.text,
        conversationId: conversationId, // Store this in state
      }),
    });

    const data = await response.json();

    // Add bot response to UI
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: data.response,
      sender: "bot",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, botMessage]);

    // Update conversation ID if new
    if (data.conversationId) {
      setConversationId(data.conversationId);
    }
  } catch (error) {
    console.error("Chatbot error:", error);
    const errorMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: "Sorry, I encountered an error. Please try again.",
      sender: "bot",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, errorMessage]);
  } finally {
    setIsTyping(false);
  }
};
```

### Chatbot System Prompt

Recommended system prompt for the AI:

```
You are ForceShield AI Assistant, a friendly and knowledgeable cybersecurity expert.
Your role is to help users understand online threats and stay safe on the internet.

Guidelines:
- Explain technical concepts in simple, everyday language
- Be encouraging and supportive, not alarming
- Provide actionable advice
- Suggest using ForceShield tools when relevant
- If you don't know something, admit it and suggest resources
- Keep responses concise (under 200 words when possible)
- Use analogies to explain complex topics
- Always prioritize user safety

Topics you can help with:
- Phishing and scam identification
- Password security
- Malware and virus protection
- Privacy and tracking
- Social engineering
- Two-factor authentication
- Safe browsing practices
- Children's online safety
- Organizational cybersecurity
```

---

## 3. Scanner API

### Endpoints Needed

#### Scan URL

```
POST /api/scanner/url
```

**Request Body:**

```typescript
{
  url: string;
  userId?: string; // If tracking scans per user
}
```

**Response:**

```typescript
{
  url: string;
  status: 'safe' | 'warning' | 'danger';
  score: number; // 0-100, safety score
  threats: {
    type: string; // 'phishing', 'malware', 'scam', etc.
    severity: 'low' | 'medium' | 'high';
    description: string;
  }[];
  details: {
    ssl: boolean;
    reputation: number;
    blacklisted: boolean;
    suspiciousPatterns: string[];
  };
  scannedAt: string;
}
```

#### Scan File

```
POST /api/scanner/file
Content-Type: multipart/form-data
```

**Request:**

```typescript
{
  file: File; // Binary file upload
  userId?: string;
}
```

**Response:** Same structure as URL scan

### Frontend Integration

**File:** `src/pages/Home.tsx`

**Function to modify:** `handleScan`

```typescript
const handleScan = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!scanUrl.trim()) return;

  setScanResult("scanning");

  try {
    const response = await fetch("/api/scanner/url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`, // If auth required
      },
      body: JSON.stringify({ url: scanUrl }),
    });

    const data = await response.json();

    // Update state with full scan results
    setScanResult(data.status); // 'safe', 'warning', or 'danger'
    setScanDetails(data); // Store full details for display
  } catch (error) {
    console.error("Scanner error:", error);
    setScanResult("error");
  }
};
```

**Enhanced UI for scan results:**

```typescript
{
  scanDetails && (
    <div className={`scan-result ${scanDetails.status}`}>
      <div className="result-icon">
        {scanDetails.status === "safe" && "✅"}
        {scanDetails.status === "warning" && "⚠️"}
        {scanDetails.status === "danger" && "🚫"}
      </div>
      <div className="result-content">
        <h3>
          {scanDetails.status === "safe" && "Safe Website"}
          {scanDetails.status === "warning" && "Proceed with Caution"}
          {scanDetails.status === "danger" && "Dangerous Website"}
        </h3>
        <p>Safety Score: {scanDetails.score}/100</p>

        {scanDetails.threats.length > 0 && (
          <div className="threats-detected">
            <h4>Threats Detected:</h4>
            <ul>
              {scanDetails.threats.map((threat, idx) => (
                <li key={idx}>
                  <strong>{threat.type}</strong> ({threat.severity}):{" "}
                  {threat.description}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="scan-details">
          <p>SSL: {scanDetails.details.ssl ? "✓ Enabled" : "✗ Not Found"}</p>
          <p>Reputation Score: {scanDetails.details.reputation}/100</p>
          {scanDetails.details.blacklisted && (
            <p className="warning">⚠️ This site appears on threat blacklists</p>
          )}
        </div>
      </div>
    </div>
  );
}
```

### Scanner Service Recommendations

**Third-party APIs to integrate:**

- **VirusTotal** - File and URL scanning
- **Google Safe Browsing** - Phishing/malware detection
- **PhishTank** - Phishing URL database
- **URLScan.io** - Website screenshot and analysis
- **Hybrid Analysis** - Advanced malware analysis

**Build your own:**

- Maintain a blacklist database
- ML model for phishing detection
- Pattern matching for suspicious URLs
- Domain reputation tracking

---

## 4. API Client Setup

### Create a centralized API client

**File:** `src/services/api.ts`

```typescript
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

interface FetchOptions extends RequestInit {
  requiresAuth?: boolean;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: FetchOptions = {}
  ): Promise<T> {
    const { requiresAuth = false, ...fetchOptions } = options;

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...fetchOptions.headers,
    };

    if (requiresAuth) {
      const token = localStorage.getItem("authToken");
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...fetchOptions,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  }

  // Auth endpoints
  async signup(data: SignupData) {
    return this.request("/auth/signup", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async login(data: LoginData) {
    return this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // Chatbot endpoints
  async sendMessage(message: string, conversationId?: string) {
    return this.request("/chatbot/message", {
      method: "POST",
      body: JSON.stringify({ message, conversationId }),
      requiresAuth: true,
    });
  }

  // Scanner endpoints
  async scanUrl(url: string) {
    return this.request("/scanner/url", {
      method: "POST",
      body: JSON.stringify({ url }),
    });
  }

  async scanFile(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    return fetch(`${this.baseUrl}/scanner/file`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    }).then((res) => res.json());
  }
}

export const api = new ApiClient(API_BASE_URL);
```

### Environment Variables

**File:** `.env.local` (create this file)

```
VITE_API_BASE_URL=http://localhost:3000/api
VITE_GOOGLE_CLIENT_ID=your-google-oauth-client-id
```

Add to `.gitignore`:

```
.env.local
```

---

## 5. Error Handling

### Global Error Boundary

**File:** `src/components/ErrorBoundary.tsx`

```typescript
import React, { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-page">
          <h1>🚨 Something went wrong</h1>
          <p>
            We're sorry for the inconvenience. Please try refreshing the page.
          </p>
          <button onClick={() => window.location.reload()}>Refresh Page</button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

Wrap your app in `App.tsx`:

```typescript
<ErrorBoundary>
  <ThemeProvider>
    <Router>{/* ... */}</Router>
  </ThemeProvider>
</ErrorBoundary>
```

---

## 6. Loading States

### Create a loading component

**File:** `src/components/Loading.tsx`

```typescript
import React from "react";
import "./Loading.css";

const Loading: React.FC<{ message?: string }> = ({
  message = "Loading...",
}) => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>{message}</p>
    </div>
  );
};

export default Loading;
```

**File:** `src/components/Loading.css`

```css
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid var(--border-cosmic);
  border-top-color: #8b5cf6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
```

---

## 7. Rate Limiting & Caching

### Client-side rate limiting

```typescript
class RateLimiter {
  private requests: number[] = [];
  private limit: number;
  private window: number;

  constructor(limit: number, windowMs: number) {
    this.limit = limit;
    this.window = windowMs;
  }

  canMakeRequest(): boolean {
    const now = Date.now();
    this.requests = this.requests.filter((time) => now - time < this.window);

    if (this.requests.length < this.limit) {
      this.requests.push(now);
      return true;
    }
    return false;
  }
}

// Usage
const scanRateLimiter = new RateLimiter(10, 60000); // 10 requests per minute

if (!scanRateLimiter.canMakeRequest()) {
  alert("Too many requests. Please wait before scanning again.");
  return;
}
```

### Caching scan results

```typescript
const CACHE_DURATION = 3600000; // 1 hour

function getCachedScan(url: string) {
  const cached = localStorage.getItem(`scan_${url}`);
  if (cached) {
    const data = JSON.parse(cached);
    if (Date.now() - data.timestamp < CACHE_DURATION) {
      return data.result;
    }
  }
  return null;
}

function cacheScan(url: string, result: ScanResult) {
  localStorage.setItem(
    `scan_${url}`,
    JSON.stringify({
      result,
      timestamp: Date.now(),
    })
  );
}
```

---

## 8. Security Considerations

### CORS Configuration

Backend must allow requests from your frontend domain:

```javascript
// Express.js example
app.use(
  cors({
    origin: ["http://localhost:5173", "https://forceshield.com"],
    credentials: true,
  })
);
```

### Token Storage

- Use `httpOnly` cookies for production (more secure than localStorage)
- Implement token refresh mechanism
- Set appropriate expiration times

### Input Validation

Always validate/sanitize on backend, but also validate on frontend:

```typescript
function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
```

### HTTPS Only

Ensure all API calls use HTTPS in production.

---

## 9. Testing API Integration

### Manual Testing Checklist

- [ ] Sign up with all fields
- [ ] Sign up validation errors
- [ ] Login with correct credentials
- [ ] Login with incorrect credentials
- [ ] Token persistence across page refresh
- [ ] Logout clears token
- [ ] Chatbot sends messages
- [ ] Chatbot receives responses
- [ ] Chatbot maintains conversation context
- [ ] URL scanner with safe URLs
- [ ] URL scanner with malicious URLs
- [ ] File upload works
- [ ] Error handling for network failures
- [ ] Loading states display correctly
- [ ] Rate limiting works

### API Testing Tools

- **Postman** - Manual API testing
- **Insomnia** - API client
- **Thunder Client** - VS Code extension

---

## 10. Deployment

### Environment Setup

**Production `.env`:**

```
VITE_API_BASE_URL=https://api.forceshield.com
VITE_GOOGLE_CLIENT_ID=production-client-id
```

### Build Command

```bash
npm run build
```

### Deployment Platforms

- **Vercel** - Easy deployment with env vars
- **Netlify** - Similar to Vercel
- **AWS S3 + CloudFront** - More control
- **GitHub Pages** - Free for static sites

---

## Next Steps

1. **Set up backend API** with chosen framework (Node.js/Express, Python/FastAPI, etc.)
2. **Implement authentication** with JWT or session-based auth
3. **Connect to AI service** for chatbot (OpenAI, Anthropic, etc.)
4. **Integrate scanner services** (VirusTotal, Google Safe Browsing, etc.)
5. **Test end-to-end** with real API calls
6. **Deploy** to production

This frontend is fully prepared for these integrations - just update the specified functions with real API calls!
