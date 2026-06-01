export const PASSWORD_REQUIREMENTS =
  "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo.";

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function isStrongPassword(password: string) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(password);
}

export function getEmailValidationError(email: string) {
  return isValidEmail(email) ? "" : "Ingresa un correo electrónico válido.";
}

export function getPasswordValidationError(password: string) {
  return isStrongPassword(password) ? "" : PASSWORD_REQUIREMENTS;
}
