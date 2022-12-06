import { Dayjs } from 'dayjs';

/**
 * Get date parsed in a short date.
 *
 * @param date Date to be transformed.
 * @returns String with new date.
 */
export function shortDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
