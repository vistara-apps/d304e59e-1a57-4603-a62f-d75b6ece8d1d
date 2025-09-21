import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCarbonValue(value: number, unit: string = 'kg CO₂'): string {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}t ${unit.replace('kg', 't')}`;
  }
  return `${value.toFixed(1)} ${unit}`;
}

export function calculatePercentageChange(current: number, previous: number): number {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
}

export function getEmissionColor(type: 'transport' | 'food' | 'energy'): string {
  switch (type) {
    case 'transport':
      return 'bg-red-100 text-red-700';
    case 'food':
      return 'bg-orange-100 text-orange-700';
    case 'energy':
      return 'bg-yellow-100 text-yellow-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
}

export function getEmissionIcon(type: 'transport' | 'food' | 'energy'): string {
  switch (type) {
    case 'transport':
      return '🚗';
    case 'food':
      return '🍽️';
    case 'energy':
      return '⚡';
    default:
      return '📊';
  }
}
