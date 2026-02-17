import { createServerClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { ArticleFormClient } from "../ArticleFormClient"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditArticlePage({ params }: PageProps) {
  const { id } = await params
  const supabase = createServerClient()
  if (!supabase) notFound()
  const { data: article } = await supabase
    .from("articles")
    .select("*")
    .eq("id", id)
    .single()
  if (!article) notFound()
  return (
    <div className="mx-auto max-w-3xl">
      <ArticleFormClient initialData={article} />
    </div>
  )
}
