import { FormControl } from '@angular/forms';

/**
 * Checks if the form control has nothing but whitespaces
 * @param control
 * @returns - { 'whitespace': true } | null
 */
export function noWhitespaceValidator(control: FormControl)
{
  const isWhitespace = (control.value || '').trim().length === 0;
  const isValid = !isWhitespace;
  return isValid ? null : { 'whitespace': true };
}
