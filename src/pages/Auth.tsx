import React, { useState } from 'react';
import './Auth.css';

type AuthMode = 'login' | 'signup';
type UserRole = 'pro' | 'basic' | null;

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  role: UserRole;
  organizationName?: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  name?: string;
  role?: string;
  organizationName?: string;
}

const Auth: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>('signup');
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    role: null,
    organizationName: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleRoleSelect = (role: UserRole) => {
    setFormData(prev => ({ ...prev, role }));
    if (errors.role) {
      setErrors(prev => ({ ...prev, role: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Authentication functionality not yet implemented
    alert('⚠️ Оваа функционалност сè уште не е додадена. Автентикацијата и регистрацијата моментално не се достапни.');
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1 className="auth-title">
            {mode === 'signup' ? 'Создадете ја Вашата Сметка' : 'Добредојдовте Назад'}
          </h1>
          <p className="auth-subtitle">
            {mode === 'signup' 
              ? 'Придружете се на ForceShield и заштитете го вашиот дигитален живот' 
              : 'Најавете се за пристап до вашата ForceShield контролна табла'}
          </p>
        </div>

        {mode === 'signup' && !formData.role && (
          <div className="role-selection">
            <h2 className="role-title">Изберете го Вашиот Тип на Сметка</h2>
            <div className="role-cards">
              <div 
                className="role-card role-pro"
                onClick={() => handleRoleSelect('pro')}
              >
                <div className="role-icon">👨‍💼</div>
                <h3>Про Сметка</h3>
                <p className="role-description">
                  За родители, училишта, универзитети и организации
                </p>
                <ul className="role-features">
                  <li>✓ Целосна контрола и следење</li>
                  <li>✓ Управувајте со повеќе корисници</li>
                  <li>✓ Напредни опции за филтрирање</li>
                  <li>✓ Детални извештаи и аналитика</li>
                  <li>✓ Приоритетна поддршка</li>
                </ul>
                <button className="role-button">Избери Про</button>
              </div>

              <div 
                className="role-card role-basic"
                onClick={() => handleRoleSelect('basic')}
              >
                <div className="role-icon">👤</div>
                <h3>Основна Сметка</h3>
                <p className="role-description">
                  За деца, студенти и вработени
                </p>
                <ul className="role-features">
                  <li>✓ Лична заштита</li>
                  <li>✓ Откривање на закани во реално време</li>
                  <li>✓ Пристап до АИ асистент</li>
                  <li>✓ Безбедно искуство за прелистување</li>
                  <li>✓ Едукативни ресурси</li>
                </ul>
                <button className="role-button">Избери Основна</button>
              </div>
            </div>
          </div>
        )}

        {(mode === 'login' || formData.role) && (
          <form className="auth-form" onSubmit={handleSubmit}>
            {mode === 'signup' && formData.role && (
              <div className="selected-role-badge">
                <span className="role-badge-icon">
                  {formData.role === 'pro' ? '👨‍💼' : '👤'}
                </span>
                <span className="role-badge-text">
                  {formData.role === 'pro' ? 'Про Сметка' : 'Основна Сметка'}
                </span>
                <button 
                  type="button" 
                  className="role-badge-change"
                  onClick={() => handleRoleSelect(null)}
                >
                  Промени
                </button>
              </div>
            )}

            {mode === 'signup' && (
              <div className="form-group">
                <label htmlFor="name">Цело Име</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={errors.name ? 'error' : ''}
                  placeholder="Внесете го вашето цело име"
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Емаил Адреса</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={errors.email ? 'error' : ''}
                placeholder="vashemail@priimer.com"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            {mode === 'signup' && formData.role === 'pro' && (
              <div className="form-group">
                <label htmlFor="organizationName">Име на Организација</label>
                <input
                  type="text"
                  id="organizationName"
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleInputChange}
                  className={errors.organizationName ? 'error' : ''}
                  placeholder="Вашето училиште, компанија или име на организација"
                />
                {errors.organizationName && <span className="error-message">{errors.organizationName}</span>}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="password">Лозинка</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={errors.password ? 'error' : ''}
                placeholder="Внесете силна лозинка"
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
              {mode === 'signup' && (
                <span className="input-hint">Најмалку 8 карактери со букви и броеви</span>
              )}
            </div>

            {mode === 'signup' && (
              <div className="form-group">
                <label htmlFor="confirmPassword">Потврдете Лозинка</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={errors.confirmPassword ? 'error' : ''}
                  placeholder="Повторно внесете ја вашата лозинка"
                />
                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
              </div>
            )}

            {mode === 'login' && (
              <div className="form-extras">
                <label className="checkbox-label">
                  <input type="checkbox" />
                  <span>Запомни ме</span>
                </label>
                <a href="#" className="forgot-password">Заборавивте лозинка?</a>
              </div>
            )}

            <button type="submit" className="submit-button">
              {mode === 'signup' ? 'Создади Сметка' : 'Најави Се'}
            </button>

            <div className="auth-divider">
              <span>или</span>
            </div>

            <button type="button" className="oauth-button google-button">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Продолжи со Google
            </button>

            <div className="auth-switch">
              <p>
                {mode === 'signup' ? 'Веќе имате сметка?' : 'Немате сметка?'}
                <button 
                  type="button" 
                  className="switch-mode-button"
                  onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}
                >
                  {mode === 'signup' ? 'Најави Се' : 'Регистрирај Се'}
                </button>
              </p>
            </div>
          </form>
        )}

        <div className="auth-footer">
          <p className="disclaimer">
            <strong>⚠️ Напомена:</strong> Оваа функционалност сè уште не е додадена. 
            Автентикацијата и регистрацијата на корисници моментално не се достапни.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
