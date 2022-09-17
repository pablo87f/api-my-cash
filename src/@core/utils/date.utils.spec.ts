import { getFutureDate } from './date.utils';

describe('DateUtils', () => {
  it('should increse date with oine year', () => {
    const year = new Date().getFullYear();

    expect(getFutureDate(`${year}-08-10`).getFullYear()).toEqual(2023);
  });
});
