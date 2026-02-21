import { createServerClient } from "@/lib/supabase/server"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Sparkles } from "lucide-react"

export default async function HomePage() {
  const supabase = createServerClient()
  let featured: { id: string; title: string; slug: string; sale_price: number; original_price: number; images: string[] }[] = []
  let recent: { id: string; title: string; slug: string; sale_price: number; images: string[] }[] = []

  if (supabase) {
    const [resFeatured, resRecent] = await Promise.all([
      supabase
        .from("products")
        .select("id, title, slug, sale_price, original_price, images")
        .or("is_featured.eq.true,is_featured.is.null")
        .or("is_active.eq.true,is_active.is.null")
        .limit(8),
      supabase
        .from("products")
        .select("id, title, slug, sale_price, images")
        .or("is_active.eq.true,is_active.is.null")
        .order("created_at", { ascending: false })
        .limit(8),
    ])
    featured = resFeatured.data ?? []
    recent = resRecent.data ?? []
  }

  return (
    <main>
      {/* Bandeau promo */}
      <div className="bg-primary py-2 text-center text-sm text-primary-foreground">
        Spedizione veloce · Soddisfatti o rimborsati
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10 py-16 md:py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-4 text-center md:px-6">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            Integratori e nutraceutica
          </div>
          <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            Il tuo <span className="text-primary">benessere</span> al centro
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Integratori per dimagrimento, massa muscolare, energia e articolazioni. Prodotti selezionati in affiliazione per sport e benessere.
          </p>
          <div className="mt-8">
            <Link
              href="/produits"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              Scopri i prodotti
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Badges confiance */}
      <section className="border-y bg-card py-8">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-8 px-4 md:gap-12">
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <span className="text-2xl">🌿</span>
            </div>
            <span className="font-medium">Qualità</span>
            <span className="text-xs text-muted-foreground">Prodotti selezionati</span>
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <span className="text-2xl">🚚</span>
            </div>
            <span className="font-medium">Spedizione rapida</span>
            <span className="text-xs text-muted-foreground">24/48h</span>
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <span className="text-2xl">💬</span>
            </div>
            <span className="font-medium">Assistenza</span>
            <span className="text-xs text-muted-foreground">Sempre disponibile</span>
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <span className="text-2xl">🔒</span>
            </div>
            <span className="font-medium">Pagamento sicuro</span>
            <span className="text-xs text-muted-foreground">SSL</span>
          </div>
        </div>
      </section>

      {/* Prodotti in evidenza */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">I nostri prodotti in evidenza</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Integratori per dimagrimento, massa muscolare, energia e articolazioni. Scelta orientata alla qualità e al risultato.
            </p>
          </div>

          {featured.length > 0 ? (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((p) => (
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
                    <h3 className="font-medium">{p.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {p.sale_price} €
                      {p.original_price > p.sale_price && (
                        <span className="ml-2 line-through">{p.original_price} €</span>
                      )}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {recent.slice(0, 4).map((p) => (
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
                    <h3 className="font-medium">{p.title}</h3>
                    <p className="text-sm text-muted-foreground">{p.sale_price} €</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-12 text-center">
            <Link
              href="/produits"
              className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted"
            >
              Vedi tutti i prodotti
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16 text-center text-primary-foreground">
        <div className="mx-auto max-w-xl px-4">
          <h2 className="text-3xl font-bold md:text-4xl">Pronto a iniziare?</h2>
          <p className="mt-4 opacity-90">Scopri gli integratori più adatti ai tuoi obiettivi</p>
          <Link
            href="/produits"
            className="mt-8 inline-block rounded-lg bg-white px-6 py-3 text-sm font-medium text-primary hover:bg-white/90"
          >
            Vai al catalogo
          </Link>
        </div>
      </section>
    </main>
  )
}
