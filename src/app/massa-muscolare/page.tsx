import type { Metadata } from "next"
import { CategoryPageContent } from "@/components/category/CategoryPageContent"

export const metadata: Metadata = {
  title: "Massa muscolare",
  description:
    "Integratori per la massa muscolare: proteine, creatina, aminoacidi. Prodotti in affiliazione — Bodyweight Arena.",
}

export default function MassaMuscolarePage() {
  return (
    <CategoryPageContent
      category="massa_muscolare"
      title="Massa muscolare"
      description="Integratori per supportare la crescita muscolare e il recupero."
    />
  )
}
