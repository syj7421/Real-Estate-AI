// src/utils/index.js
/**
 * Tailwind 클래스 조합 헬퍼
 * Usage: cn('p-4', condition && 'bg-blue-500')
 */
export function cn(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  