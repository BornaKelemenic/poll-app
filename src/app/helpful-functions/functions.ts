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

/**
 * Turns hex values to RGB value
 * @param hex
 */
export function hexToRgb(hex: string): { r: number, g: number, b: number } | null
{
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b)
  {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}
