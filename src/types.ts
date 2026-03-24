export type StrengthLevel = 'Prázdné' | 'Slabé' | 'Střední' | 'Silné';

export interface PasswordCriteria {
  minLength: boolean;
  hasUppercase: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
}

export interface SequenceValidationResult {
  isValid: boolean;
  validSequenceCount: number;
  message: string;
}

export interface TimeValidationResult {
  isValid: boolean;
  elapsedSeconds: number;
  message: string;
  tooFast: boolean;
}
