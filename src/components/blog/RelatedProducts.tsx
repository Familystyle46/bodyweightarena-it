import { createServerClient } from "@/lib/supabase/server"
import Link from "next/link"
import Image from "next/image"
import { Constants } from "@/types/supabase"
import type { Database } from "@/types/supabase"

type ProductCategory = Database["public"]["Enums"]["product_category"]
const PRODUCT_CATEGORIES = Constants.public.Enums.product_category as readonly string[]

/** Mapping article_category → product_category pour proposer des produits cohérents */
const ARTICLE_TO_PRODUCT_CATEGORY: Record<string, string> = {
  minceur_detox: "minceur",
  detox_minceur: "minceur",
  probiotiques_digestion: "digestion",
  bien_etre: "equilibre",
  nutrition: "equilibre",
  sommeil_stress: "equilibre",
  sommeil_confort: "equilibre",
  sante_masculine: "equilibre",
  glycemie_diabete: "equilibre",
  articulations: "equilibre",
  cardio_tension: "equilibre",
  parasites_immunite: "immunite",
  conseils: "equilibre",
  actualites: "equilibre",
  transversal: "equilibre",
}

type ProductRow = {
  id: string
  title: string
  slug: string
  sale_price: number
  original_price: number
  images: string[]
}

export async function RelatedProducts({ category }: { category: string }) {
  const supabase = createServerClient()
  if (!supabase) return null

  const rawCategory = ARTICLE_TO_PRODUCT_CATEGORY[category]
  const productCategory: ProductCategory | null =
    rawCategory && PRODUCT_CATEGORIES.includes(rawCategory)
      ? (rawCategory as ProductCategory)
      : null

  let products: ProductRow[] = []

  if (productCategory) {
    const { data } = await supabase
      .from("products")
      .select("id, title, slug, sale_price, original_price, images")
      .eq("category", productCategory)
      .or("is_active.eq.true,is_active.is.null")
      .limit(3)
    products = (data ?? []) as ProductRow[]
  }

  if (products.length === 0) {
    const { data } = await supabase
      .from("products")
      .select("id, title, slug, sale_price, original_price, images")
      .or("is_active.eq.true,is_active.is.null")
      .limit(6)
    const all = (data ?? []) as ProductRow[]
    const shuffled = [...all].sort(() => Math.random() - 0.5)
    products = shuffled.slice(0, 3)
  }

  if (products.length === 0) return null

  return (
    <>
      <h2 className="mb-6 text-xl font-semibold">Produits recommandés pour vous</h2>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {products.map((p) => (
          <li key={p.id}>
            <Link
              href={`/produits/${p.slug}`}
              className="block overflow-hidden rounded-lg border bg-card transition hover:shadow-lg"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-muted">
                {p.images?.[0] ? (
                  <Image
                    src={p.images[0]}
                    alt={p.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-muted-foreground">
                    Pas d’image
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-medium">{p.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {p.sale_price < p.original_price ? (
                    <>
                      <span className="font-medium text-foreground">{p.sale_price} €</span>
                      <span className="ml-2 line-through">{p.original_price} €</span>
                    </>
                  ) : (
                    <span className="font-medium">{p.sale_price} €</span>
                  )}
                </p>
                <span className="mt-3 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline">
                  Voir le produit
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
