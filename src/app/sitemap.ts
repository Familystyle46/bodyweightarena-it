import type { MetadataRoute } from "next"
import { createServerClient } from "@/lib/supabase/server"
import { Constants } from "@/types/supabase"

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://pharmacie-provencale.com"
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

  const categorySlugs = Constants.public.Enums.product_category
  const categoryUrls = categorySlugs.map((slug) => ({
    url: `${baseUrl}/categories/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
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
    ...productUrls,
    ...articleUrls,
  ]
}
