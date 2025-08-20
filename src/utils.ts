import type { StockOption } from './types/stockOption';
import type { SECCompany } from './types/SECCompany';

/* This region is responsible for managing localStorage operations,
   including setting and getting items in a type-safe manner. */

export function setItem<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getItem<T>(key: string): T | null {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) as T : null;
}
