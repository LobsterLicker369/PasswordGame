import { useState, useEffect } from 'react';
import type { StrengthLevel } from './types';
import PasswordInput from './components/PasswordInput';
import PasswordStrength from './components/PasswordStrength';
import CharacterSequenceValidator from './components/CharacterSequenceValidator';
import PasswordTimeValidator from './components/PasswordTimeValidator';
import CountryFlagValidator from './components/CountryFlagValidator';



function evaluatePassword(password: string): StrengthLevel {
  if (password.length === 0) return 'Prázdné';

  let score = 0;
  if (password.length >= 8)          score++;
  if (/[A-Z]/.test(password))        score++;
  if (/[0-9]/.test(password))        score++;
  if (/[!@#$%^&*]/.test(password))   score++;

  if (score <= 1) return 'Slabé';
  if (score <= 3) return 'Střední';
  return 'Silné';
}



export default function App() {
  const [password, setPassword]               = useState('');
  const [passwordStrength, setPasswordStrength] = useState<StrengthLevel>('Prázdné');
  const [startTime, setStartTime]             = useState<number | null>(null);
  const [sabotageActive, setSabotageActive]   = useState(false);


  const handleSetPassword = (value: string) => {
    if (value.length > 0 && startTime === null) {
      setStartTime(Date.now());
    }
    if (value.length === 0) {
      setStartTime(null);
    }
    setPassword(value);
  };


  useEffect(() => {
    const strength = evaluatePassword(password);
    setPasswordStrength(strength);
  }, [password]);


  useEffect(() => {
    document.title = password.length === 0
        ? 'Password Checker'
        : `Síla hesla: ${passwordStrength}`;
  }, [passwordStrength, password]);


  useEffect(() => {
    const sabotageInterval = setInterval(() => {
      setPassword((prevPassword) => {
        if (prevPassword.length === 0) return prevPassword;

        setSabotageActive(true);
        setTimeout(() => setSabotageActive(false), 3000);

        const action = Math.random() < 0.5 ? 'add' : 'remove';
        if (action === 'add') {
          return prevPassword + '😜';
        } else {
          const index = Math.floor(Math.random() * prevPassword.length);
          return prevPassword.slice(0, index) + prevPassword.slice(index + 1);
        }
      });
    }, 10000);

    return () => clearInterval(sabotageInterval);
  }, []);

  return (
      <div className="app-wrapper">
        <div className="app-container container">

          {/* Header */}
          <header className="app-header mb-4">
            <h1 className="app-header__title">🔒 Password<span>Checker</span></h1>
            <p className="app-header__subtitle mb-0">Ověřte sílu svého hesla</p>
          </header>

          {/* Sabotage warning */}
          {sabotageActive && (
              <div className="alert sabotage-alert" role="alert">
                <i className="bi bi-bug-fill sabotage-alert__icon" />
                <span>⚠️ Sabotáž aktivována! Heslo bylo náhodně upraveno.</span>
              </div>
          )}

          {/* Main Card */}
          <div className="card card-main">
            <div className="card-body">

              {/* Password Input */}
              <PasswordInput password={password} setPassword={handleSetPassword} />

              {/* Strength + Criteria */}
              <PasswordStrength password={password} strength={passwordStrength} />

              <hr className="section-divider" />

              {/* Additional Validators */}
              <p className="criteria-title mb-3">Rozšířená analýza</p>
              <div className="row validator-grid g-2">
                <div className="col-6">
                  <CharacterSequenceValidator password={password} />
                </div>
                <div className="col-6">
                  <PasswordTimeValidator password={password} startTime={startTime} />
                </div>
              </div>

              <CountryFlagValidator password={password} />

            </div>
          </div>

          {/* Footer */}
          <footer className="app-footer text-center mt-3">
            Sabotáž aktivní každých 10s &nbsp;·&nbsp; Přizpůsobuje se světlému i tmavému režimu
          </footer>

        </div>
      </div>
  );
}