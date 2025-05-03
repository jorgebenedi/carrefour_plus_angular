import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Validador para el nombre
export const nombreValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const pattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
  return pattern.test(control.value.trim()) ? null : { nombreInvalido: true };
};

// Validador para apellidos
export const apellidosValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const pattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
  return pattern.test(control.value.trim()) ? null : { apellidosInvalidos: true };
};

// Validador para teléfono
// Validador para teléfono
export const telefonoValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const pattern = /^\+34[67]\d{8}$/;
  return pattern.test(control.value.trim()) ? null : { telefonoInvalido: true };
};

// Validador para DNI/NIF
export const dninifValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const pattern = /^[0-9]{8}[A-Z]$/;
  return pattern.test(control.value.trim()) ? null : { dninifInvalido: true };
};

// Validador para código postal
export const cpValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const pattern = /^\d{5}$/;
  return !control.value.trim() || pattern.test(control.value.trim()) ? null : { cpInvalido: true };
};

// Validador para el correo electrónico
export const emailValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const value = control.value;
  const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return !value || pattern.test(value.trim()) ? null : { emailInvalido: true };
};

// Validador para la contraseña

export function passwordValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value ?? '';

  const hasUpperCase = /[A-Z]/.test(value);
  const hasLowerCase = /[a-z]/.test(value);
  const hasNumber = /\d/.test(value);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
  const isValidLength = value.length >= 8 && value.length <= 40;

  // Aquí se devuelve el error si alguna condición no se cumple
  if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar || !isValidLength) {
    return { pattern: true };
  }

  return null; // Si pasa todas las condiciones, no hay errores
}


export const passwordsIgualesValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const password = group.get('password')?.value;
  const repassword = group.get('repassword')?.value;

  if (!password || !repassword) return null;

  return password === repassword ? null : { passwordsNoCoinciden: true };
};





