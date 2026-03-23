import { describe, it, expect } from 'vitest';
import { calculateSubtotal, applyDiscount, OrderItem } from '../billing';

describe('calculateSubtotal', () => {
  it('sums quantity * unitPrice for all items', () => {
    const items: OrderItem[] = [
      { productId: 'a', quantity: 2, unitPrice: 10 },
      { productId: 'b', quantity: 1, unitPrice: 5 },
    ];
    expect(calculateSubtotal(items)).toBe(25);
  });

  it('returns 0 for empty order', () => {
    expect(calculateSubtotal([])).toBe(0);
  });
});

describe('applyDiscount', () => {
  it('reduces price by the given percent', () => {
    expect(applyDiscount(100, 20)).toBe(80);
  });

  it('returns original price for 0% discount', () => {
    expect(applyDiscount(50, 0)).toBe(50);
  });

  it('throws for out-of-range discount', () => {
    expect(() => applyDiscount(100, -5)).toThrow();
    expect(() => applyDiscount(100, 110)).toThrow();
  });
});
