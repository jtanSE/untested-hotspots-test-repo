import { describe, it, expect } from 'vitest';
import { clamp, slugify } from '../utils';

describe('clamp', () => {
  it('returns value within range unchanged', () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });

  it('clamps to min', () => {
    expect(clamp(-5, 0, 10)).toBe(0);
  });

  it('clamps to max', () => {
    expect(clamp(15, 0, 10)).toBe(10);
  });
});

describe('slugify', () => {
  it('lowercases and replaces spaces with hyphens', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });

  it('strips special characters', () => {
    expect(slugify('Hello, World!')).toBe('hello-world');
  });

  it('collapses multiple separators', () => {
    expect(slugify('foo   bar--baz')).toBe('foo-bar-baz');
  });
});
