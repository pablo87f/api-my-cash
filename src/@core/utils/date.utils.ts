import { parseISO, setYear } from 'date-fns';

export function getFutureDate(date: string): Date {
  const currentDate = parseISO(date);
  return setYear(currentDate, currentDate.getFullYear() + 1);
}
