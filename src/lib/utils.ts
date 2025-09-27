import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// NOVO: Função para converter datas no formato brasileiro (DD/MM/YYYY)
export function parseBrazilianDate(dateString?: string): Date | null {
  
  if (!dateString || typeof dateString !== 'string') {
    return null;
  }

  const parts = dateString.split('/');
  if (parts.length === 3) {
    const [day, month, year] = parts.map(Number);
    const date = new Date(year, month - 1, day);

    if (!isNaN(date.getTime()) && year > 1900) {
      return date;
    }
  }

  return null;
}