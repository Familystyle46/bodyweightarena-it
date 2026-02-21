import type { Metadata } from "next"
import { CategoryPageContent } from "@/components/category/CategoryPageContent"

export const metadata: Metadata = {
  title: "Integratori",
  description:
    "Integratori alimentari per sport e benessere. Proteine, vitamine, minerali e nutraceutica selezionata — Bodyweight Arena.",
}

export default function IntegratoriPage() {
  return (
    <CategoryPageContent
      category="integratori"
      title="Integratori"
      description="Integratori alimentari per supportare allenamento, recupero e benessere generale."
    />
  )
}
