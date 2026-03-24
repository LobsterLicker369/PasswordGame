import { useMemo } from 'react';
import type { StrengthLevel, PasswordCriteria } from '../types';

interface PasswordStrengthProps {
  password: string;
  strength: StrengthLevel;
}

function getCriteria(password: string): PasswordCriteria {
  return {
    minLength:    password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasNumber:    /[0-9]/.test(password),
    hasSpecial:   /[!@#$%^&*]/.test(password),
  };
}

function getBarClass(strength: StrengthLevel): string {
  switch (strength) {
    case 'Slabé':   return 'weak';
    case 'Střední': return 'medium';
    case 'Silné':   return 'strong';
    default:        return 'empty';
  }
}

const CRITERIA_LABELS: { key: keyof PasswordCriteria; label: string }[] = [
  { key: 'minLength',    label: 'Min. 8 znaků' },
  { key: 'hasUppercase', label: 'Velké písmeno' },
  { key: 'hasNumber',    label: 'Číslo' },
  { key: 'hasSpecial',   label: 'Speciální znak' },
];

export default function PasswordStrength({ password, strength }: PasswordStrengthProps) {
  const criteria = useMemo(() => getCriteria(password), [password]);
  const barClass = getBarClass(strength);
  const isEmpty = password.length === 0;

  return (
    <>
      {/* Strength Bar */}
      <div className="strength-section">
        <div className="strength-header">
          <span className="strength-label">Síla hesla</span>
          <span className={`strength-badge strength-badge--${isEmpty ? 'empty' : barClass}`}>
            {isEmpty ? '—' : strength}
          </span>
        </div>
        <div className="strength-bar-track">
          <div className={`strength-bar-fill strength-bar-fill--${barClass}`} />
        </div>
      </div>

      {/* Criteria Checklist */}
      <div className="criteria-section">
        <p className="criteria-title">Požadavky</p>
        <ul className="criteria-list">
          {CRITERIA_LABELS.map(({ key, label }) => (
            <li
              key={key}
              className={`criteria-item${criteria[key] ? ' criteria-item--met' : ''}`}
            >
              <i
                className={`bi criteria-icon ${
                  criteria[key] ? 'bi-check-circle-fill' : 'bi-circle'
                }`}
              />
              {label}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export { getCriteria };
