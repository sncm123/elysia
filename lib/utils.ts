import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getBasePath() {
  return process.env.NODE_ENV === 'production' ? '/elysia' : ''
}

export function getFullPath(path: string) {
  return `${getBasePath()}${path}`
}
