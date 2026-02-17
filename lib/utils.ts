import { type ClassValue, clsx } from "clsx";
import { format, parseISO } from "date-fns";
import { GradingService } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatPrice(price: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'MMM dd, yyyy');
}

export function formatYear(year?: number): string {
  if (!year) return 'Unknown';
  return year.toString();
}

export function getGradeBadgeClass(grade: string, service: GradingService): string {
  const numericGrade = extractNumericGrade(grade, service);
  
  if (numericGrade >= 70) return 'grade-ms70';
  if (numericGrade >= 69) return 'grade-ms69';
  if (numericGrade >= 68) return 'grade-ms68';
  if (numericGrade >= 67) return 'grade-ms67';
  
  return 'grade-default';
}

export function extractNumericGrade(grade: string, service: GradingService): number {
  // Remove service prefix and extract numeric value
  const cleaned = grade.replace(/^(PCGS|NGC|ANACS|ICG)\s*/i, '');
  
  // Handle MS grades
  const msMatch = cleaned.match(/MS[- ]?(\d+)/i);
  if (msMatch) return parseInt(msMatch[1]);
  
  // Handle PR/PF grades
  const prMatch = cleaned.match(/(?:PR|PF)[- ]?(\d+)/i);
  if (prMatch) return parseInt(prMatch[1]);
  
  // Handle AU grades
  const auMatch = cleaned.match(/AU[- ]?(\d+)/i);
  if (auMatch) return parseInt(auMatch[1]);
  
  // Handle VF, XF, etc.
  const gradeMap: { [key: string]: number } = {
    'UNC': 60,
    'AU': 55,
    'XF': 45,
    'VF': 35,
    'F': 25,
    'VG': 15,
    'G': 8,
    'AG': 3,
    'PO': 1,
  };
  
  for (const [key, value] of Object.entries(gradeMap)) {
    if (cleaned.toUpperCase().includes(key)) {
      return value;
    }
  }
  
  // Try to extract any number
  const numberMatch = cleaned.match(/(\d+)/);
  return numberMatch ? parseInt(numberMatch[1]) : 0;
}

export function getServiceColor(service: GradingService): string {
  switch (service) {
    case GradingService.PCGS:
      return 'text-blue-600 dark:text-blue-400';
    case GradingService.NGC:
      return 'text-purple-600 dark:text-purple-400';
    case GradingService.ANACS:
      return 'text-green-600 dark:text-green-400';
    case GradingService.ICG:
      return 'text-orange-600 dark:text-orange-400';
    default:
      return 'text-gray-600 dark:text-gray-400';
  }
}

export function formatComposition(composition?: string): string {
  if (!composition) return 'Unknown';
  
  const compositionMap: { [key: string]: string } = {
    'ag': 'Silver',
    'au': 'Gold',
    'cu': 'Copper',
    'ni': 'Nickel',
    'zn': 'Zinc',
    'sn': 'Tin',
    'pb': 'Lead',
  };
  
  let formatted = composition;
  Object.entries(compositionMap).forEach(([symbol, name]) => {
    formatted = formatted.replace(new RegExp(symbol, 'gi'), name);
  });
  
  return formatted;
}

export function formatWeight(weight?: number): string {
  if (!weight) return 'Unknown';
  return `${weight}g`;
}

export function formatDiameter(diameter?: number): string {
  if (!diameter) return 'Unknown';
  return `${diameter}mm`;
}

export function formatMintage(mintage?: number): string {
  if (!mintage) return 'Unknown';
  
  if (mintage >= 1000000) {
    return `${(mintage / 1000000).toFixed(1)}M`;
  } else if (mintage >= 1000) {
    return `${(mintage / 1000).toFixed(1)}K`;
  }
  
  return mintage.toLocaleString();
}

export function getCategoryDisplayName(category: string): string {
  switch (category.toLowerCase()) {
    case 'us':
      return 'United States';
    case 'world':
      return 'World Coins';
    case 'ancient':
      return 'Ancient Coins';
    default:
      return category;
  }
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export function getImageUrl(url?: string, fallback = '/images/coin-placeholder.png'): string {
  if (!url) return fallback;
  if (url.startsWith('http')) return url;
  return `${process.env.NEXT_PUBLIC_API_URL}${url}`;
}

export function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  } else {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'absolute';
    textArea.style.left = '-999999px';
    document.body.prepend(textArea);
    textArea.select();
    
    try {
      document.execCommand('copy');
    } catch (error) {
      console.error('Failed to copy to clipboard', error);
    } finally {
      textArea.remove();
    }
    
    return Promise.resolve();
  }
}