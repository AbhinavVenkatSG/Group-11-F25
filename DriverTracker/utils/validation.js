// Shared validation helpers used by both screens.

export const MIN_PASSWORD_LENGTH = 6;

export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}
