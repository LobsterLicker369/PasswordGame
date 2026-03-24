import { useMemo } from 'react';
import type { TimeValidationResult } from '../types';

interface PasswordTimeValidatorProps {
  password: string;
  startTime: number | null;
}

const MIN_SECONDS = 3;
const MAX_SECONDS = 300;


function validateTime(password: string, startTime: number | null): TimeValidationResult {
  if (!startTime || password.length === 0) {
    return {
      isValid: false,
      elapsedSeconds: 0,
      tooFast: false,
      message: 'Zadejte heslo pro měření času.',
    };
  }

  const elapsed = Math.round((Date.now() - startTime) / 1000);

  if (elapsed < MIN_SECONDS) {
    return {
      isValid: false,
      elapsedSeconds: elapsed,
      tooFast: true,
      message: `Heslo zadáno příliš rychle (${elapsed}s). Možné automatické generování.`,
    };
  }

  if (elapsed > MAX_SECONDS) {
    return {
      isValid: false,
      elapsedSeconds: elapsed,
      tooFast: false,
      message: `Časové okno vypršelo (${elapsed}s). Zadejte heslo znovu.`,
    };
  }

  return {
    isValid: true,
    elapsedSeconds: elapsed,
    tooFast: false,
    message: `Heslo zadáno v pořádku za ${elapsed}s.`,
  };
}

export default function PasswordTimeValidator({ password, startTime }: PasswordTimeValidatorProps) {
  const result: TimeValidationResult = useMemo(
    () => validateTime(password, startTime),
    [password, startTime],
  );

  const isEmpty = password.length === 0 || !startTime;

  const cardState = isEmpty
    ? 'neutral'
    : result.tooFast
    ? 'warn'
    : result.isValid
    ? 'valid'
    : 'invalid';

  const icon = isEmpty
    ? 'bi-clock'
    : result.tooFast
    ? 'bi-lightning-fill'
    : result.isValid
    ? 'bi-clock-history'
    : 'bi-hourglass-bottom';

  const iconColor = isEmpty
    ? 'var(--text-muted)'
    : result.tooFast
    ? 'var(--strength-medium)'
    : result.isValid
    ? 'var(--strength-strong)'
    : 'var(--strength-weak)';

  return (
    <div className={`validator-card validator-card--${cardState}`}>
      <div className="validator-card__header">
        <i
          className={`bi validator-card__icon ${icon}`}
          style={{ color: iconColor }}
        />
        <span className="validator-card__title">Čas zadání</span>
      </div>
      <div className="validator-card__value">
        {isEmpty ? '—' : `${result.elapsedSeconds}s`}
      </div>
      <div className="validator-card__sub">{result.message}</div>
    </div>
  );
}

export { validateTime };
