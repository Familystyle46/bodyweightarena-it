import { createServerClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { ProductFormClient } from "../ProductFormClient"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditProductPage({ params }: PageProps) {
  const { id } = await params
  const supabase = createServerClient()
  if (!supabase) notFound()
  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single()
  if (!product) notFound()
  return (
    <div className="mx-auto max-w-3xl">
      <ProductFormClient initialData={product} />
    </div>
  )
}
