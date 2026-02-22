import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Normalise un slug pour la recherche : enlève les accents (é→e, è→e, etc.) */
export function normalizeSlugForLookup(slug: string): string {
  return slug
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
}

/** Cherche un article par slug exact ou slug normalisé (sans accents) */
export function getSlugVariants(slug: string): string[] {
  const normalized = normalizeSlugForLookup(slug)
  if (normalized === slug) return [slug]
  return [slug, normalized]
}
