import React, { useState } from 'react';
import './Home.css';

interface Threat {
  id: string;
  title: string;
  icon: string;
  description: string;
  howItWorks: string;
  prevention: string[];
  whatToDo: string[];
}

const threats: Threat[] = [
  {
    id: 'phishing',
    title: 'Phishing Attacks',
    icon: '🎣',
    description: 'Phishing is when cybercriminals try to trick you into giving away sensitive information like passwords, credit card numbers, or personal data by pretending to be a trustworthy source.',
    howItWorks: 'Attackers send fake emails, messages, or create fake websites that look like legitimate organizations (banks, social media, companies). They create a sense of urgency to make you act quickly without thinking - like claiming your account will be closed or you won a prize.',
    prevention: [
      'Always check the sender\'s email address carefully - look for misspellings',
      'Never click on suspicious links - hover over links to see the real URL',
      'Look for HTTPS and a padlock icon in the address bar',
      'Be skeptical of urgent messages asking for personal information',
      'Use our ForceShield extension to scan links before clicking'
    ],
    whatToDo: [
      'Don\'t click any more links in the suspicious email/message',
      'Change your passwords immediately if you entered any information',
      'Enable two-factor authentication on all important accounts',
      'Report the phishing attempt to the organization being impersonated',
      'Run a security scan on your device',
      'Monitor your bank accounts and credit reports for unusual activity'
    ]
  },
  {
    id: 'malware',
    title: 'Malware & Viruses',
    icon: '🦠',
    description: 'Malware (malicious software) includes viruses, trojans, ransomware, and spyware - programs designed to harm your computer, steal your data, or take control of your system.',
    howItWorks: 'Malware can be hidden in innocent-looking downloads, email attachments, fake software updates, or infected websites. Once installed, it can steal passwords, encrypt your files for ransom, spy on your activities, or turn your computer into a "zombie" for attacking others.',
    prevention: [
      'Only download software from official sources and trusted websites',
      'Keep your operating system and all software updated',
      'Install reliable antivirus software and keep it updated',
      'Don\'t open email attachments from unknown senders',
      'Be cautious with USB drives from unknown sources',
      'Use our website scanner before downloading files'
    ],
    whatToDo: [
      'Disconnect from the internet immediately to prevent spread',
      'Run a full system scan with updated antivirus software',
      'Don\'t pay ransomware demands - contact authorities instead',
      'Restore your system from a clean backup if available',
      'Change all passwords from a different, clean device',
      'Seek professional help for serious infections'
    ]
  },
  {
    id: 'tracking',
    title: 'Privacy Invasion & Tracking',
    icon: '👁️',
    description: 'Many websites and online services track your every move online, collecting data about your browsing habits, location, purchases, and personal information - often without your knowledge or clear consent.',
    howItWorks: 'Websites use cookies, tracking pixels, fingerprinting techniques, and third-party scripts to follow you across the internet. This data is used to build detailed profiles about you for targeted advertising, sold to data brokers, or can be exposed in data breaches.',
    prevention: [
      'Use privacy-focused browsers or browser extensions',
      'Regularly clear cookies and browsing data',
      'Use a VPN to hide your IP address and location',
      'Review and adjust privacy settings on websites and apps',
      'Use our ForceShield extension to detect excessive tracking',
      'Read privacy policies before accepting them'
    ],
    whatToDo: [
      'Review which websites have access to your data',
      'Request data deletion under GDPR or similar privacy laws',
      'Use privacy-focused alternatives to popular services',
      'Enable "Do Not Track" in your browser settings',
      'Use separate email addresses for different purposes',
      'Monitor your digital footprint regularly'
    ]
  },
  {
    id: 'social-engineering',
    title: 'Social Engineering',
    icon: '🎭',
    description: 'Social engineering is when attackers manipulate people into breaking security procedures or revealing confidential information by exploiting human psychology rather than technical hacking.',
    howItWorks: 'Attackers research their targets and craft convincing scenarios. They might pretend to be IT support, a company executive, or a friend in need. They use psychological tricks like authority, urgency, fear, or curiosity to bypass your logical thinking and get you to comply.',
    prevention: [
      'Be skeptical of unsolicited requests for information',
      'Verify the identity of anyone asking for sensitive data',
      'Don\'t share too much personal information on social media',
      'Be cautious about what you post online - it can be used against you',
      'Educate yourself and family members about common tactics',
      'Establish verification procedures in your organization'
    ],
    whatToDo: [
      'Stop all communication with the suspected attacker',
      'Report the incident to IT/security team or relevant authorities',
      'Warn others who might be targeted similarly',
      'Review what information was disclosed and take appropriate action',
      'Change any passwords or security questions that might be compromised',
      'Learn from the experience to recognize future attempts'
    ]
  },
  {
    id: 'weak-passwords',
    title: 'Weak Passwords & Credential Theft',
    icon: '🔐',
    description: 'Using weak, reused, or compromised passwords is one of the easiest ways for attackers to gain access to your accounts and personal information.',
    howItWorks: 'Attackers use automated tools to guess common passwords, try leaked passwords from data breaches, or use "credential stuffing" where they try username/password combinations stolen from one site on many others. Weak passwords like "password123" or "qwerty" can be cracked in seconds.',
    prevention: [
      'Use strong, unique passwords for each account (12+ characters)',
      'Include uppercase, lowercase, numbers, and special characters',
      'Use a reputable password manager to generate and store passwords',
      'Enable two-factor authentication (2FA) wherever possible',
      'Never share passwords or write them down insecurely',
      'Check if your passwords have been compromised using breach checkers'
    ],
    whatToDo: [
      'Change the compromised password immediately',
      'Change passwords on any other accounts using the same password',
      'Enable 2FA on the affected account',
      'Review account activity for unauthorized access',
      'Set up alerts for suspicious login attempts',
      'Consider using a password manager going forward'
    ]
  },
  {
    id: 'fake-websites',
    title: 'Fake Websites & Scams',
    icon: '🌐',
    description: 'Fake websites impersonate legitimate businesses or services to steal your money, personal information, or install malware. They often look nearly identical to the real thing.',
    howItWorks: 'Scammers create websites with URLs that are slight misspellings of legitimate sites (like "amaz0n.com" instead of "amazon.com"). They may offer deals that are too good to be true, fake customer support, or counterfeit products. Some are entirely fake online stores that take your money and never deliver.',
    prevention: [
      'Double-check URLs before entering any information',
      'Look for HTTPS and valid security certificates',
      'Research unfamiliar websites before making purchases',
      'Be wary of deals that seem too good to be true',
      'Use our ForceShield scanner to verify website legitimacy',
      'Check for contact information and physical address'
    ],
    whatToDo: [
      'Contact your bank/credit card company immediately if you made a payment',
      'Dispute the charges and request a new card if needed',
      'Document everything - screenshots, emails, receipts',
      'Report the scam to authorities (FTC, IC3, local police)',
      'Leave reviews warning others about the fake site',
      'Check your credit report for signs of identity theft'
    ]
  }
];

const Home: React.FC = () => {
  const [selectedThreat, setSelectedThreat] = useState<Threat | null>(null);
  const [scanUrl, setScanUrl] = useState('');
  const [scanResult, setScanResult] = useState<string | null>(null);

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (scanUrl.trim()) {
      // Placeholder for actual scanning functionality
      setScanResult('scanning');
      setTimeout(() => {
        setScanResult('safe');
      }, 2000);
    }
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Заштитете се од<br />
            <span className="gradient-text">Кибер Закани</span>
          </h1>
          <p className="hero-subtitle">
            Научете за најчестите онлајн закани и како да останете безбедни. 
            ForceShield обезбедува заштита во реално време за семејства, училишта и организации.
          </p>
          <div className="hero-buttons">
            <a href="#scanner" className="btn btn-primary">Пробајте го нашиот Скенер</a>
            <a href="#threats" className="btn btn-secondary">Дознајте Повеќе</a>
          </div>
        </div>
        <div className="hero-image">
          <div className="shield-illustration">
            <svg width="300" height="300" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1Z"
                fill="url(#hero-shield)"
                stroke="white"
                strokeWidth="0.5"
              />
              <defs>
                <linearGradient id="hero-shield" x1="3" y1="1" x2="21" y2="23">
                  <stop offset="0%" stopColor="#c4b5fd" />
                  <stop offset="50%" stopColor="#a78bfa" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2 className="section-title">Како ForceShield ве заштитува</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <h3>Проширување за Прелистувач</h3>
            <p>Скенирање во реално време на секоја веб-страница која ја посетувате. Добивајте моментални предупредувања за опасни страници, фишинг обиди и малициозен софтвер.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Скенер за Врски и Датотеки</h3>
            <p>Скенирајте сомнителни врски и датотеки пред да ги отворите. Нашиот АИ систем ги открива заканите пред тие да ви наштетат.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👨‍👩‍👧‍👦</div>
            <h3>Семејна Заштита</h3>
            <p>Родителите можат да поставуваат филтри, блокираат веб-страници и ги следат онлајн активностите на нивните деца за да обезбедат безбедно прелистување.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🏫</div>
            <h3>Училиште и Организација</h3>
            <p>Централно управувана заштита која не може да биде оневозможена од ученици или вработени, обезбедувајќи безбедна дигитална околина.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>АИ Едукативен Бот</h3>
            <p>Интерактивен chatbot кој ги објаснува заканите на едноставен јазик и одговара на вашите безбедносни прашања 24/7.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>Безбедносна Едукација</h3>
            <p>Научете за вообичаените закани, како функционираат и практични чекори за да се заштитите вие и вашите најблиски.</p>
          </div>
        </div>
      </section>

      {/* Scanner Section */}
      <section id="scanner" className="scanner-section">
        <div className="scanner-container">
          <h2 className="section-title">Скенирај Врска или Веб-страница</h2>
          <p className="scanner-subtitle">
            Внесете URL адреса за да проверите дали е безбедна пред да ја посетите. Нашата АИ анализира милиони показатели за закани.
          </p>
          <form onSubmit={handleScan} className="scanner-form">
            <input
              type="url"
              value={scanUrl}
              onChange={(e) => setScanUrl(e.target.value)}
              placeholder="Внесете URL адреса за скенирање (пр. https://example.com)"
              className="scanner-input"
              required
            />
            <button type="submit" className="btn btn-primary">
              {scanResult === 'scanning' ? 'Скенирам...' : 'Скенирај Сега'}
            </button>
          </form>
          {scanResult && scanResult !== 'scanning' && (
            <div className={`scan-result ${scanResult}`}>
              {scanResult === 'safe' && (
                <>
                  <div className="result-icon">✅</div>
                  <div className="result-content">
                    <h3>Безбедна Веб-страница</h3>
                    <p>Оваа веб-страница изгледа дека е безбедна. Не се открие ни закани.</p>
                    <small>Напомена: Ова е демо. Поврзете се со нашето API за реално скенирање.</small>
                  </div>
                </>
              )}
            </div>
          )}
          <div className="scanner-note">
            <strong>Напомена:</strong> Скенирање на датотеки наскоро ќе биде достапно. Моментално поддржуваме само скенирање на URL адреси.
          </div>
        </div>
      </section>

      {/* Threats Education Section */}
      <section id="threats" className="threats-section">
        <h2 className="section-title">Објаснети Вообичаени Кибер Закани</h2>
        <p className="threats-subtitle">
          Разбирањето на заканите е првиот чекор кон безбедност онлајн. Кликнете на која било закана за да дознаете повеќе.
        </p>
        <div className="threats-grid">
          {threats.map((threat) => (
            <div
              key={threat.id}
              className="threat-card"
              onClick={() => setSelectedThreat(threat)}
            >
              <div className="threat-icon">{threat.icon}</div>
              <h3>{threat.title}</h3>
              <p>{threat.description}</p>
              <button className="threat-learn-more">Дознај Повеќе →</button>
            </div>
          ))}
        </div>
      </section>

      {/* Educational Resources */}
      <section className="resources-section">
        <h2 className="section-title">Дополнителни Ресурси</h2>
        <p className="resources-subtitle">
          Проширете го вашето знаење за кибер безбедност со овие корисни материјали.
        </p>
        <div className="resources-grid">
          <div className="resource-card">
            <h3>📖 Водич за Почетници за Онлајн Безбедност</h3>
            <p>Сеопфатен водич кој ги покрива основите на безбедноста онлајн.</p>
            <a href="#" className="resource-link">Наскоро</a>
          </div>
          <div className="resource-card">
            <h3>🎓 Најдобри Практики за Безбедност</h3>
            <p>Суштински практики кои секој треба да ги следи за подобра безбедност.</p>
            <a href="#" className="resource-link">Наскоро</a>
          </div>
          <div className="resource-card">
            <h3>👨‍👩‍👧 Водич за Родители</h3>
            <p>Како да ги заштитите вашите деца онлајн и да ги научите на дигитална безбедност.</p>
            <a href="#" className="resource-link">Наскоро</a>
          </div>
          <div className="resource-card">
            <h3>🏢 Водич за Организации</h3>
            <p>Имплементирање на безбедносни мерки во училиштата и работните места.</p>
            <a href="#" className="resource-link">Наскоро</a>
          </div>
        </div>
      </section>

      {/* Threat Detail Modal */}
      {selectedThreat && (
        <div className="modal-overlay" onClick={() => setSelectedThreat(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedThreat(null)}>×</button>
            <div className="modal-header">
              <div className="modal-icon">{selectedThreat.icon}</div>
              <h2>{selectedThreat.title}</h2>
            </div>
            <div className="modal-body">
              <section className="modal-section">
                <h3>Што е тоа?</h3>
                <p>{selectedThreat.description}</p>
              </section>
              <section className="modal-section">
                <h3>Како функционира?</h3>
                <p>{selectedThreat.howItWorks}</p>
              </section>
              <section className="modal-section">
                <h3>Како да го спречите:</h3>
                <ul>
                  {selectedThreat.prevention.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </section>
              <section className="modal-section">
                <h3>Што да направите ако се случи:</h3>
                <ul>
                  {selectedThreat.whatToDo.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
