import { useState } from 'react';

interface PasswordInputProps {
  password: string;
  setPassword: (password: string) => void;
}

export default function PasswordInput({ password, setPassword }: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="input-group-pw">
      <label className="input-label" htmlFor="password-input">
        Zadejte heslo
      </label>
      <input
        id="password-input"
        type={visible ? 'text' : 'password'}
        className="input-pw"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Napište heslo..."
        autoComplete="new-password"
      />
      <button
        type="button"
        className="btn-toggle-visibility"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? 'Skrýt heslo' : 'Zobrazit heslo'}
        title={visible ? 'Skrýt heslo' : 'Zobrazit heslo'}
      >
        <i className={`bi ${visible ? 'bi-eye-slash' : 'bi-eye'}`} />
      </button>
    </div>
  );
}
