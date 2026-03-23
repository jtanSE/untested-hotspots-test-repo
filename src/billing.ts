// Billing module — some functions tested, some not

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  discountCode?: string;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  unitPrice: number;
}

export interface Invoice {
  orderId: string;
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
}

// ── Tested functions ─────────────────────────────────────────────────────────

export function calculateSubtotal(items: OrderItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
}

export function applyDiscount(subtotal: number, discountPercent: number): number {
  if (discountPercent < 0 || discountPercent > 100) {
    throw new Error('Discount percent must be between 0 and 100');
  }
  return subtotal * (1 - discountPercent / 100);
}

// ── Untested functions ───────────────────────────────────────────────────────

export function calculateTax(subtotal: number, taxRate: number = 0.08): number {
  return Math.round(subtotal * taxRate * 100) / 100;
}

export function buildInvoice(order: Order, discountPercent: number = 0): Invoice {
  const subtotal = calculateSubtotal(order.items);
  const discount = subtotal - applyDiscount(subtotal, discountPercent);
  const discounted = subtotal - discount;
  const tax = calculateTax(discounted);

  return {
    orderId: order.id,
    subtotal,
    discount,
    tax,
    total: discounted + tax,
  };
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}

export function validateDiscountCode(code: string): boolean {
  // Real implementation would check a database
  const validCodes = ['SAVE10', 'WELCOME20', 'LOYAL15'];
  return validCodes.includes(code.toUpperCase());
}

export function resolveDiscountPercent(code?: string): number {
  if (!code) return 0;
  if (!validateDiscountCode(code)) return 0;
  const map: Record<string, number> = { SAVE10: 10, WELCOME20: 20, LOYAL15: 15 };
  return map[code.toUpperCase()] ?? 0;
}
