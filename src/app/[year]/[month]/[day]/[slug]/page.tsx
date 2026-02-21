import { createServerClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { MarkdownContent } from "@/components/content/MarkdownContent"
import { RelatedProducts } from "@/components/blog/RelatedProducts"

export const revalidate = 3600

/** Slugs legacy à restaurer (structure /anno/mese/giorno/slug) — SEO bodyweightarena.it */
const LEGACY_DATE_SLUGS = [
  { year: "2020", month: "03", day: "30", slug: "routine-stretching-full-body" },
  { year: "2019", month: "01", day: "18", slug: "3-motivi-per-cui-overcoming-gravity-e-un-ottimo-libro-e-per-cui-non-lo-e" },
  { year: "2017", month: "11", day: "30", slug: "front-lever-raises-tecnica-ed-errori-da-non-fare" },
  { year: "2017", month: "10", day: "16", slug: "programma-allenamento-front-lever" },
  { year: "2019", month: "12", day: "04", slug: "allenamento-skills-front-lever-livello-intermedio" },
  { year: "2019", month: "10", day: "23", slug: "allenamento-skills-planche-livello-intermedio" },
  { year: "2019", month: "03", day: "08", slug: "squat-migliora-la-flessibilita-con-questa-routine" },
  { year: "2016", month: "10", day: "12", slug: "split-routine-vs-full-body-routine" },
  { year: "2015", month: "03", day: "10", slug: "the-passive-and-active-hang" },
  { year: "2017", month: "08", day: "03", slug: "corpo-libero-e-pesi-come-integrarli" },
  { year: "2016", month: "07", day: "25", slug: "lo-scarico" },
  { year: "2019", month: "03", day: "29", slug: "metodo-di-allenamento-emom-allena-anche-la-forza" },
  { year: "2017", month: "05", day: "22", slug: "tecniche-di-aumento-forza-e-ipertrofia-a-corpo-libero" },
] as const

export async function generateStaticParams() {
  return LEGACY_DATE_SLUGS.map(({ year, month, day, slug }) => ({
    year,
    month,
    day,
    slug,
  }))
}

function isValidDateSegment(year: string, month: string, day: string): boolean {
  return /^\d{4}$/.test(year) && /^\d{1,2}$/.test(month) && /^\d{1,2}$/.test(day)
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ year: string; month: string; day: string; slug: string }>
}): Promise<Metadata> {
  const { year, month, day, slug } = await params
  if (!isValidDateSegment(year, month, day)) return { title: "Bodyweight Arena" }
  const supabase = createServerClient()
  if (!supabase) return { title: "Blog" }
  const { data: article } = await supabase
    .from("articles")
    .select("title, meta_description, excerpt, cover_image")
    .eq("slug", slug)
    .single()
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

export default async function LegacyDatePostPage({
  params,
}: {
  params: Promise<{ year: string; month: string; day: string; slug: string }>
}) {
  const { year, month, day, slug } = await params
  if (!isValidDateSegment(year, month, day)) notFound()

  const supabase = createServerClient()
  if (!supabase) notFound()
  const { data: article } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .or("is_published.eq.true,is_published.is.null")
    .single()
  if (!article) notFound()

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
          {(article.published_at || (year && month && day)) && (
            <p className="mt-2 text-sm text-muted-foreground">
              {article.published_at
                ? new Date(article.published_at).toLocaleDateString("it-IT")
                : `${day}/${month}/${year}`}
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
