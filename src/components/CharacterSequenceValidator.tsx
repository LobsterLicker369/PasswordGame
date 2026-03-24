import { useMemo } from 'react';
import type { SequenceValidationResult } from '../types';

interface CharacterSequenceValidatorProps {
  password: string;
}


function validateSequence(password: string): SequenceValidationResult {
  const WINDOW = 4;

  if (password.length < WINDOW) {
    return {
      isValid: false,
      validSequenceCount: 0,
      message: `Heslo musí mít alespoň ${WINDOW} znaky pro kontrolu sekvence.`,
    };
  }

  let validSequenceCount = 0;

  for (let i = 0; i <= password.length - WINDOW; i++) {
    const window = password.slice(i, i + WINDOW);
    const hasLower   = /[a-z]/.test(window);
    const hasUpper   = /[A-Z]/.test(window);
    const hasDigit   = /[0-9]/.test(window);
    const hasSpecial = /[!@#$%^&*]/.test(window);

    if (hasLower && hasUpper && hasDigit && hasSpecial) {
      validSequenceCount++;
    }
  }

  const isValid = validSequenceCount > 0;

  return {
    isValid,
    validSequenceCount,
    message: isValid
      ? `Nalezeny ${validSequenceCount} platné sekvence různých typů znaků.`
      : 'Heslo neobsahuje sekvenci se všemi typy znaků najednou.',
  };
}

export default function CharacterSequenceValidator({ password }: CharacterSequenceValidatorProps) {
  const result: SequenceValidationResult = useMemo(
    () => validateSequence(password),
    [password],
  );

  const isEmpty = password.length === 0;

  const cardState = isEmpty
    ? 'neutral'
    : result.isValid
    ? 'valid'
    : 'invalid';

  return (
    <div className={`validator-card validator-card--${cardState}`}>
      <div className="validator-card__header">
        <i
          className={`bi validator-card__icon ${
            isEmpty
              ? 'bi-layers'
              : result.isValid
              ? 'bi-check2-all'
              : 'bi-x-circle'
          }`}
          style={{
            color: isEmpty
              ? 'var(--text-muted)'
              : result.isValid
              ? 'var(--strength-strong)'
              : 'var(--strength-weak)',
          }}
        />
        <span className="validator-card__title">Sekvence znaků</span>
      </div>
      <div className="validator-card__value">
        {isEmpty ? '—' : result.isValid ? `${result.validSequenceCount}× nalezena` : 'Nenalezena'}
      </div>
      <div className="validator-card__sub">{isEmpty ? 'Zadejte heslo' : result.message}</div>
    </div>
  );
}

export { validateSequence };
