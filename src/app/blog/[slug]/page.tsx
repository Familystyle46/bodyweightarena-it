import { createServerClient } from "@/lib/supabase/server"
import { notFound, redirect } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { MarkdownContent } from "@/components/content/MarkdownContent"
import { RelatedProducts } from "@/components/blog/RelatedProducts"
import { getArticleBySlug } from "@/lib/supabase/articles"
import { normalizeSlugForLookup } from "@/lib/utils"

export const revalidate = 60

function decodeSlug(slug: string): string {
  if (!slug.includes("%")) return slug
  try {
    return decodeURIComponent(slug)
  } catch {
    return slug
  }
}

export async function generateStaticParams() {
  const supabase = createServerClient()
  if (!supabase) return []
  const { data: articles } = await supabase
    .from("articles")
    .select("slug")
    .or("is_published.eq.true,is_published.is.null")
    .limit(500)
  const slugs = (articles ?? []).map((a) => normalizeSlugForLookup(a.slug))
  const unique = Array.from(new Set(slugs))
  return unique.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug: rawSlug } = await params
  const slug = decodeSlug(rawSlug)
  const supabase = createServerClient()
  if (!supabase) return { title: "Blog" }
  const article = await getArticleBySlug(supabase, slug)
  if (!article) return { title: "Articolo non trovato" }
  const description =
    article.meta_description ?? article.excerpt?.slice(0, 160) ?? ""
  return {
    title: article.title,
    description: description || undefined,
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      title: article.title,
      description: description || undefined,
      images: article.cover_image ? [{ url: article.cover_image }] : [],
      type: "article",
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug: rawSlug } = await params
  const slug = decodeSlug(rawSlug)
  const supabase = createServerClient()
  if (!supabase) notFound()
  const article = await getArticleBySlug(supabase, slug)
  if (!article) notFound()

  // Rediriger vers l’URL canonique (sans accents) pour cohérence et SEO
  const canonicalSlug = normalizeSlugForLookup(article.slug)
  if (canonicalSlug !== slug && normalizeSlugForLookup(slug) === canonicalSlug) {
    redirect(`/blog/${canonicalSlug}`)
  }

  return (
    <main className="min-h-screen p-6 md:p-10">
      <div className="mx-auto max-w-3xl">
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link href="/blog">Blog</Link>
          <span className="mx-2">/</span>
          <span>{article.title}</span>
        </nav>
        <article>
          {article.cover_image && (
            <div className="relative mb-8 aspect-video overflow-hidden rounded-lg bg-muted">
              <Image
                src={article.cover_image}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
                priority
              />
            </div>
          )}
          <h1 className="text-3xl font-bold">{article.title}</h1>
          {article.published_at && (
            <p className="mt-2 text-sm text-muted-foreground">
              {new Date(article.published_at).toLocaleDateString("it-IT")}
            </p>
          )}
          <MarkdownContent
            content={article.content}
            size="lg"
            className="mt-8"
          />
        </article>
        <section className="mt-12 border-t pt-8">
          <RelatedProducts category={article.category} />
        </section>
      </div>
    </main>
  )
}
