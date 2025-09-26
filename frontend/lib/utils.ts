import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isValidInstagramUrl(url: string): boolean {
  const patterns = [
    /^https?:\/\/(www\.)?instagram\.com\/p\/[A-Za-z0-9_-]+/,
    /^https?:\/\/(www\.)?instagram\.com\/reel\/[A-Za-z0-9_-]+/,
    /^https?:\/\/(www\.)?instagram\.com\/tv\/[A-Za-z0-9_-]+/,
    /^https?:\/\/(www\.)?instagram\.com\/stories\/[A-Za-z0-9_.-]+\/[0-9]+/
  ];
  
  return patterns.some(pattern => pattern.test(url));
}