import type { MetadataRoute } from "next"
import { createServerClient } from "@/lib/supabase/server"

export const revalidate = 3600

const CATEGORY_PATHS = [
  "/integratori",
  "/dimagrire",
  "/massa-muscolare",
  "/energia",
  "/articolazioni",
] as const

/** Anciens permaliens à conserver pour le SEO (bodyweightarena.it) */
const LEGACY_DATE_PATHS = [
  "/2020/03/30/routine-stretching-full-body",
  "/2019/01/18/3-motivi-per-cui-overcoming-gravity-e-un-ottimo-libro-e-per-cui-non-lo-e",
  "/2017/11/30/front-lever-raises-tecnica-ed-errori-da-non-fare",
  "/2017/10/16/programma-allenamento-front-lever",
  "/2019/12/04/allenamento-skills-front-lever-livello-intermedio",
  "/2019/10/23/allenamento-skills-planche-livello-intermedio",
  "/2019/03/08/squat-migliora-la-flessibilita-con-questa-routine",
  "/2016/10/12/split-routine-vs-full-body-routine",
  "/2015/03/10/the-passive-and-active-hang",
  "/2017/08/03/corpo-libero-e-pesi-come-integrarli",
  "/2016/07/25/lo-scarico",
  "/2019/03/29/metodo-di-allenamento-emom-allena-anche-la-forza",
  "/2017/05/22/tecniche-di-aumento-forza-e-ipertrofia-a-corpo-libero",
] as const

const LEGACY_TAG_PATHS = ["/tag/project-invictus"] as const

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://bodyweightarena.it"
  const supabase = createServerClient()
  let produits: { slug: string; updated_at: string }[] | null = null
  let articles: { slug: string; updated_at: string }[] | null = null
  if (supabase) {
    const [resProd, resArt] = await Promise.all([
      supabase.from("products").select("slug, updated_at").or("is_active.eq.true,is_active.is.null"),
      supabase
        .from("articles")
        .select("slug, updated_at")
        .or("is_published.eq.true,is_published.is.null"),
    ])
    produits = resProd.data
    articles = resArt.data
  }

  const productUrls = (produits ?? []).map((p) => ({
    url: `${baseUrl}/produits/${p.slug}`,
    lastModified: p.updated_at ? new Date(p.updated_at) : new Date(),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }))

  const articleUrls = (articles ?? []).map((a) => ({
    url: `${baseUrl}/blog/${a.slug}`,
    lastModified: a.updated_at ? new Date(a.updated_at) : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  const categoryUrls = CATEGORY_PATHS.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }))

  const legacyDateUrls = LEGACY_DATE_PATHS.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  const legacyTagUrls = LEGACY_TAG_PATHS.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/produits`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...categoryUrls,
    ...legacyDateUrls,
    ...legacyTagUrls,
    ...productUrls,
    ...articleUrls,
  ]
}
