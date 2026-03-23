import { describe, it, expect } from 'vitest';
import { isValidEmail } from '../users';

describe('isValidEmail', () => {
  it('accepts valid emails', () => {
    expect(isValidEmail('alice@example.com')).toBe(true);
    expect(isValidEmail('bob+tag@sub.domain.org')).toBe(true);
  });

  it('rejects invalid emails', () => {
    expect(isValidEmail('notanemail')).toBe(false);
    expect(isValidEmail('@nodomain')).toBe(false);
    expect(isValidEmail('missing@')).toBe(false);
  });
});
