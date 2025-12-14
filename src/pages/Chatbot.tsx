import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m ForceShield AI Assistant. I can help you understand cyber threats, answer security questions, and provide safety tips. What would you like to know?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const suggestedQuestions = [
    'What is phishing?',
    'How can I create a strong password?',
    'Is this website safe to use?',
    'What should I do if I clicked a suspicious link?',
    'How can I protect my children online?',
    'What is two-factor authentication?'
  ];

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Phishing related
    if (lowerMessage.includes('phishing') || lowerMessage.includes('phish')) {
      return 'Phishing is when attackers try to trick you into giving away personal information by pretending to be someone trustworthy. Always check the sender\'s email address, never click suspicious links, and look for HTTPS and a padlock icon. Our ForceShield extension can scan links before you click them!';
    }

    // Password related
    if (lowerMessage.includes('password')) {
      return 'Strong passwords should be at least 12 characters long and include uppercase letters, lowercase letters, numbers, and special characters. Use a unique password for each account and consider using a password manager. Enable two-factor authentication (2FA) wherever possible for extra security!';
    }

    // Website safety
    if (lowerMessage.includes('website safe') || lowerMessage.includes('site safe')) {
      return 'To check if a website is safe: 1) Look for HTTPS and a padlock icon, 2) Check the URL for misspellings, 3) Research the website\'s reputation, 4) Use our ForceShield scanner on the home page, 5) Check for contact information and privacy policy. Avoid sites with too-good-to-be-true offers!';
    }

    // Suspicious link clicked
    if (lowerMessage.includes('clicked') && (lowerMessage.includes('link') || lowerMessage.includes('suspicious'))) {
      return 'If you clicked a suspicious link: 1) Don\'t enter any information on the page, 2) Close the browser immediately, 3) Run a virus scan, 4) Change your passwords from a different device, 5) Enable 2FA on important accounts, 6) Monitor your accounts for unusual activity. If you entered sensitive information, contact your bank!';
    }

    // Children protection
    if (lowerMessage.includes('children') || lowerMessage.includes('kids') || lowerMessage.includes('child')) {
      return 'To protect children online: 1) Use parental controls and monitoring software, 2) Teach them about online safety, 3) Set screen time limits, 4) Monitor their social media activity, 5) Create a safe browsing environment, 6) Use our ForceShield extension with parent mode. Open communication is key - make them comfortable talking about online concerns!';
    }

    // Two-factor authentication
    if (lowerMessage.includes('two-factor') || lowerMessage.includes('2fa') || lowerMessage.includes('authentication')) {
      return 'Two-factor authentication (2FA) adds an extra layer of security beyond just your password. You\'ll need two things to log in: something you know (password) and something you have (phone, security key, or authenticator app). This makes it much harder for attackers to access your accounts, even if they steal your password!';
    }

    // Malware/Virus
    if (lowerMessage.includes('malware') || lowerMessage.includes('virus')) {
      return 'Malware includes viruses, trojans, ransomware, and spyware. To protect yourself: 1) Only download from official sources, 2) Keep software updated, 3) Use reliable antivirus software, 4) Don\'t open unknown email attachments, 5) Be cautious with USB drives, 6) Use our website scanner before downloading. If infected, disconnect from internet and run a full scan!';
    }

    // Social engineering
    if (lowerMessage.includes('social engineering')) {
      return 'Social engineering is when attackers manipulate people into revealing confidential information. They might pretend to be IT support, executives, or friends. Always verify the identity of anyone asking for sensitive information, be skeptical of urgent requests, and never share passwords. Remember: legitimate organizations won\'t ask for passwords via email or phone!';
    }

    // VPN
    if (lowerMessage.includes('vpn')) {
      return 'A VPN (Virtual Private Network) encrypts your internet connection and hides your IP address, making your online activity more private and secure. It\'s especially useful on public Wi-Fi, for accessing region-restricted content, and protecting against tracking. Choose a reputable VPN provider with a no-logs policy!';
    }

    // Default response
    return 'That\'s a great question! While I\'m a demo chatbot with limited responses, the full version will be connected to our AI API for comprehensive answers. For now, try asking about: phishing, passwords, website safety, protecting children, two-factor authentication, malware, or social engineering. You can also explore our educational content on the home page!';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      // Add user message
      const userMessage: Message = {
        id: Date.now().toString(),
        text: inputValue,
        sender: 'user',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMessage]);
      setInputValue('');
      setIsTyping(true);

      // Simulate bot response delay
      setTimeout(() => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: getBotResponse(inputValue),
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botResponse]);
        setIsTyping(false);
      }, 1000 + Math.random() * 1000);
    }
  };

  const handleSuggestionClick = (question: string) => {
    setInputValue(question);
  };

  return (
    <div className="chatbot-page">
      <div className="chatbot-container">
        <div className="chatbot-header">
          <div className="chatbot-header-content">
            <div className="chatbot-avatar">🤖</div>
            <div className="chatbot-header-text">
              <h2>ForceShield AI Assistant</h2>
              <p className="chatbot-status">
                <span className="status-dot"></span> Online
              </p>
            </div>
          </div>
          <div className="chatbot-info">
            <p>Ask me anything about cybersecurity and online safety!</p>
          </div>
        </div>

        <div className="chatbot-messages">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message ${message.sender === 'user' ? 'message-user' : 'message-bot'}`}
            >
              {message.sender === 'bot' && (
                <div className="message-avatar">🤖</div>
              )}
              <div className="message-content">
                <div className="message-bubble">
                  {message.text}
                </div>
                <div className="message-time">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
              {message.sender === 'user' && (
                <div className="message-avatar">👤</div>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="message message-bot">
              <div className="message-avatar">🤖</div>
              <div className="message-content">
                <div className="message-bubble typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chatbot-suggestions">
          <p className="suggestions-title">Suggested questions:</p>
          <div className="suggestions-list">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                className="suggestion-chip"
                onClick={() => handleSuggestionClick(question)}
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        <form className="chatbot-input-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your question here..."
            className="chatbot-input"
          />
          <button type="submit" className="chatbot-send-button" disabled={!inputValue.trim()}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </form>

        <div className="chatbot-disclaimer">
          <strong>Note:</strong> This is a demo chatbot with pre-programmed responses. 
          The full version will be connected to our AI API for more comprehensive and personalized assistance.
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
