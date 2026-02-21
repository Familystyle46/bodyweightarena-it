import { createServerClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"

export const revalidate = 3600

/** Tag legacy à restaurer — SEO bodyweightarena.it */
const LEGACY_TAGS = ["project-invictus"] as const

export async function generateStaticParams() {
  return LEGACY_TAGS.map((tag) => ({ tag }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>
}): Promise<Metadata> {
  const { tag } = await params
  if (!LEGACY_TAGS.includes(tag as (typeof LEGACY_TAGS)[number]))
    return { title: "Tag" }
  const title = tag === "project-invictus" ? "Project Invictus" : tag
  return {
    title: `Tag: ${title} | Bodyweight Arena`,
    description: `Articoli e contenuti con tag ${title}. Allenamento a corpo libero, skills e nutraceutica.`,
    robots: { index: true, follow: true },
  }
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>
}) {
  const { tag } = await params
  if (!LEGACY_TAGS.includes(tag as (typeof LEGACY_TAGS)[number])) notFound()

  const supabase = createServerClient()
  if (!supabase) notFound()

  // Les articles n'ont pas de colonne "tags" dans le schéma actuel :
  // on affiche une page tag avec lien vers le blog ; tu pourras ajouter
  // un champ tags (text[]) aux articles et filtrer ici.
  const { data: articles } = await supabase
    .from("articles")
    .select("id, title, slug, excerpt, cover_image, published_at")
    .or("is_published.eq.true,is_published.is.null")
    .order("published_at", { ascending: false })
    .limit(20)

  const list = articles ?? []
  const title = tag === "project-invictus" ? "Project Invictus" : tag

  return (
    <main className="min-h-screen p-6 md:p-10">
      <div className="mx-auto max-w-4xl">
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link href="/blog">Blog</Link>
          <span className="mx-2">/</span>
          <span>Tag: {title}</span>
        </nav>
        <h1 className="mb-8 text-3xl font-bold">Tag: {title}</h1>
        <p className="mb-8 text-muted-foreground">
          Contenuti e articoli. Per una lista completa visita il{" "}
          <Link href="/blog" className="text-primary hover:underline">
            blog
          </Link>
          .
        </p>
        {list.length > 0 ? (
          <ul className="grid gap-6 sm:grid-cols-2">
            {list.map((a) => (
              <li key={a.id}>
                <Link
                  href={`/blog/${a.slug}`}
                  className="block overflow-hidden rounded-lg border bg-card transition hover:shadow-lg"
                >
                  {a.cover_image && (
                    <div className="relative aspect-video overflow-hidden bg-muted">
                      <Image
                        src={a.cover_image}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h2 className="font-semibold">{a.title}</h2>
                    {a.excerpt && (
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                        {a.excerpt}
                      </p>
                    )}
                    {a.published_at && (
                      <p className="mt-2 text-xs text-muted-foreground">
                        {new Date(a.published_at).toLocaleDateString("it-IT")}
                      </p>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </main>
  )
}
