import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [messages, _setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Здраво! Јас сум Козмо, вашиот ForceShield асистент. Можам да ви помогнам да разберете сајбер закани, да одговорам на безбедносни прашања и да обезбедам совети за безбедност. Што сакате да знаете?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, _setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const suggestedQuestions = [
    'Што е фишинг?',
    'Како можам да креирам силна лозинка?',
    'Дали оваа веб-страница е безбедна за користење?',
    'Што треба да направам ако кликнав на сомнителна врска?',
    'Како можам да ги заштитам моите деца онлајн?',
    'Што е двофакторска автентикација?'
  ];

  const handleSuggestionClick = (question: string) => {
    setInputValue(question);
  };

  return (
    <div className="chatbot-page">
      <div className="chatbot-container">
        <div className="chatbot-header">
          <div className="chatbot-header-content">
            <div className="chatbot-avatar">
              <img src="/Cosmo.png" alt="Козмо" className="avatar-img" />
            </div>
            <div className="chatbot-header-text">
              <h2>Козмо</h2>
              <p className="chatbot-status">
                <span className="status-dot"></span>
                Активен и подготвен за помош
              </p>
            </div>
          </div>
          <div className="chatbot-info">
            <p>Прашајте ме за сајбер безбедност, заканите, и како да останете безбедни онлајн.</p>
          </div>
        </div>

        <div className="chatbot-messages">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message ${message.sender === 'user' ? 'message-user' : 'message-bot'}`}
            >
              {message.sender === 'bot' && (
                <div className="message-avatar">
                  <img src="/Cosmo.png" alt="Козмо" className="avatar-img" />
                </div>
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
              <div className="message-avatar">
                <img src="/Cosmo.png" alt="Козмо" className="avatar-img" />
              </div>
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
          <p className="suggestions-title">Предложени прашања:</p>
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

        <form className="chatbot-input-form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Внесете го вашето прашање овде..."
            className="chatbot-input"
            disabled
            title="Оваа функционалност сè уште не е додадена"
          />
          <button type="submit" className="chatbot-send-button" disabled title="Оваа функционалност сè уште не е додадена">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </form>

        <div className="chatbot-disclaimer">
          <strong>⚠️ Напомена:</strong> Оваа функционалност сè уште не е додадена. 
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
