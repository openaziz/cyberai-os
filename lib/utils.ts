import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getBasePath() {
  // For static export, we need to use the basePath
  return process.env.NODE_ENV === "production" ? "/cyberai-os" : ""
}
