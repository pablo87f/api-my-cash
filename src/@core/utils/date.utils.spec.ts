import { parseISO } from 'date-fns';
import { getFutureDate } from './date.utils';

describe('DateUtils', () => {
  it('should increse date with one year', () => {
    const year = 2022;

    expect(getFutureDate(`${year}-08-10`).getFullYear()).toEqual(2023);
  });
});
