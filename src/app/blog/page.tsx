import { createServerClient } from "@/lib/supabase/server"
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Blog",
  description: "Conseils santé, actualités et dossiers par la Pharmacie Provençale.",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
}

export default async function BlogPage() {
  const supabase = createServerClient()
  let list: { id: string; title: string; slug: string; excerpt: string; cover_image: string | null; published_at: string | null }[] = []
  if (supabase) {
    const { data: articles } = await supabase
      .from("articles")
      .select("id, title, slug, excerpt, cover_image, published_at")
      .or("is_published.eq.true,is_published.is.null")
      .order("published_at", { ascending: false })
    list = articles ?? []
  }

  return (
    <main className="min-h-screen p-6 md:p-10">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-3xl font-bold">Blog</h1>
        <ul className="space-y-8">
          {list.map((a) => (
            <li key={a.id}>
              <Link
                href={`/blog/${a.slug}`}
                className="block rounded-lg border p-4 transition hover:shadow-md"
              >
                {a.cover_image && (
                  <div className="relative mb-3 aspect-video overflow-hidden rounded-md bg-muted">
                    <Image
                      src={a.cover_image}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 800px"
                    />
                  </div>
                )}
                <h2 className="text-xl font-semibold">{a.title}</h2>
                {a.excerpt && (
                  <p className="mt-2 text-muted-foreground">{a.excerpt}</p>
                )}
                {a.published_at && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {new Date(a.published_at).toLocaleDateString("fr-FR")}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
