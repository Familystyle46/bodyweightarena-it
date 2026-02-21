import type { Metadata } from "next"
import { CategoryPageContent } from "@/components/category/CategoryPageContent"

export const metadata: Metadata = {
  title: "Articolazioni",
  description:
    "Integratori per articolazioni e benessere articolare. Glucosamina, condroitina, MSM — Bodyweight Arena.",
}

export default function ArticolazioniPage() {
  return (
    <CategoryPageContent
      category="articolazioni"
      title="Articolazioni"
      description="Integratori per il benessere di articolazioni e tessuti connettivi."
    />
  )
}
