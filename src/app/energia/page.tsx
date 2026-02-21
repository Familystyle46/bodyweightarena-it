import type { Metadata } from "next"
import { CategoryPageContent } from "@/components/category/CategoryPageContent"

export const metadata: Metadata = {
  title: "Energia",
  description:
    "Integratori per energia e performance. Vitamine, stimolanti naturali e nutraceutica — Bodyweight Arena.",
}

export default function EnergiaPage() {
  return (
    <CategoryPageContent
      category="energia"
      title="Energia"
      description="Integratori per energia, concentrazione e performance."
    />
  )
}
