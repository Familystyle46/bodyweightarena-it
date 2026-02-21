import type { Metadata } from "next"
import { CategoryPageContent } from "@/components/category/CategoryPageContent"

export const metadata: Metadata = {
  title: "Dimagrire",
  description:
    "Integratori per il dimagrimento e il controllo del peso. Prodotti selezionati in affiliazione — Bodyweight Arena.",
}

export default function DimagrirePage() {
  return (
    <CategoryPageContent
      category="dimagrire"
      title="Dimagrire"
      description="Integratori per supportare il dimagrimento e il metabolismo."
    />
  )
}
