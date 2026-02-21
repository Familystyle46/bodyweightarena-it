import { createServerClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import type { Database } from "@/types/supabase"

export const revalidate = 7200

// URL slug (può avere trattino) -> valore enum DB
const SLUG_TO_CATEGORY: Record<string, Database["public"]["Enums"]["product_category"]> = {
  integratori: "integratori",
  dimagrire: "dimagrire",
  "massa-muscolare": "massa_muscolare",
  energia: "energia",
  articolazioni: "articolazioni",
}

const CATEGORY_LABELS: Record<string, string> = {
  integratori: "Integratori",
  dimagrire: "Dimagrire",
  massa_muscolare: "Massa muscolare",
  energia: "Energia",
  articolazioni: "Articolazioni",
}

const STATIC_PARAMS = [
  { slug: "integratori" },
  { slug: "dimagrire" },
  { slug: "massa-muscolare" },
  { slug: "energia" },
  { slug: "articolazioni" },
] as const

export async function generateStaticParams() {
  return STATIC_PARAMS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const category = SLUG_TO_CATEGORY[slug]
  if (!category) return { title: "Categoria non trovata" }
  const nom = CATEGORY_LABELS[category] ?? slug
  return {
    title: nom,
    description: `Prodotti della categoria ${nom} — Bodyweight Arena. Integratori e nutraceutica.`,
  }
}

export default async function CategoriePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const category = SLUG_TO_CATEGORY[slug]
  if (!category) notFound()

  const supabase = createServerClient()
  if (!supabase) notFound()
  const { data: prodotti } = await supabase
    .from("products")
    .select("id, title, slug, sale_price, images")
    .eq("category", category)
    .or("is_active.eq.true,is_active.is.null")

  const list = prodotti ?? []
  const nom = CATEGORY_LABELS[category] ?? slug

  return (
    <main className="min-h-screen p-6 md:p-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-3xl font-bold">Categoria: {nom}</h1>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((p) => (
            <li key={p.id}>
              <Link
                href={`/produits/${p.slug}`}
                className="block rounded-lg border p-4 transition hover:shadow-md"
              >
                {p.images?.[0] && (
                  <div className="relative mb-3 aspect-square overflow-hidden rounded-md bg-muted">
                    <Image
                      src={p.images[0]}
                      alt={p.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  </div>
                )}
                <h2 className="font-medium">{p.title}</h2>
                <p className="text-sm text-muted-foreground">{p.sale_price} €</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
