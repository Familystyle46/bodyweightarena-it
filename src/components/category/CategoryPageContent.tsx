import { createServerClient } from "@/lib/supabase/server"
import Link from "next/link"
import Image from "next/image"
import type { Database } from "@/types/supabase"

type ProductCategory = Database["public"]["Enums"]["product_category"]

type Props = {
  category: ProductCategory
  title: string
  description?: string
}

export async function CategoryPageContent({ category, title, description }: Props): Promise<React.ReactElement | null> {
  const supabase = createServerClient()
  if (!supabase) return null
  const { data: prodotti } = await supabase
    .from("products")
    .select("id, title, slug, sale_price, images")
    .eq("category", category)
    .or("is_active.eq.true,is_active.is.null")
  const list = prodotti ?? []

  return (
    <main className="min-h-screen p-6 md:p-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-3xl font-bold">{title}</h1>
        {description && (
          <p className="mb-8 max-w-2xl text-muted-foreground">{description}</p>
        )}
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
