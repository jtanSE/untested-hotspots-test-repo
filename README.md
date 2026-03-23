# untested-hotspots-test-repo

A sample TypeScript project used to test the [`untested-hotspots`](https://github.com/jtanSE/untested-hotspots) GitHub Action.

## Purpose

This repo is intentionally designed with a mix of tested and untested functions across three modules:

| Module | Tested | Untested |
|--------|--------|----------|
| `billing.ts` | `calculateSubtotal`, `applyDiscount` | `calculateTax`, `buildInvoice`, `formatCurrency`, `validateDiscountCode`, `resolveDiscountPercent` |
| `users.ts` | `isValidEmail` | `hasPermission`, `formatUserDisplayName`, `sanitizeProfile`, `mergeProfiles`, `getUserAge`, `isAdmin` |
| `utils.ts` | `clamp`, `slugify` | `truncate`, `groupBy`, `debounce`, `retry` |

## Running tests locally

```bash
npm install
npm test
```

## GitHub Action

On every pull request, the `untested-hotspots` action analyzes the repo and posts a comment listing the highest-risk untested functions.

To use it, add a `SUPERMODEL_API_KEY` secret to this repository's settings.
