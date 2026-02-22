import type { SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"
import { normalizeSlugForLookup } from "@/lib/utils"

export type ArticleRow = Database["public"]["Tables"]["articles"]["Row"]

/** Trouve un article par slug (exact, normalisé sans accents, ou match par préfixe). */
export async function getArticleBySlug(
  supabase: SupabaseClient<Database> | null,
  slug: string
): Promise<ArticleRow | null> {
  if (!supabase) return null

  // 1) Slug exact
  const { data: exact } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .or("is_published.eq.true,is_published.is.null")
    .single()
  if (exact) return exact

  // 2) Slug normalisé (sans accents)
  const normalized = normalizeSlugForLookup(slug)
  if (normalized !== slug) {
    const { data: byNormalized } = await supabase
      .from("articles")
      .select("*")
      .eq("slug", normalized)
      .or("is_published.eq.true,is_published.is.null")
      .single()
    if (byNormalized) return byNormalized
  }

  // 3) Fallback : charger les articles et matcher par slug normalisé (préfixe ou égal)
  // Gère les cas : slug en base = "....-medicale", URL = "....-medical" ou slug tronqué
  const { data: list } = await supabase
    .from("articles")
    .select("*")
    .or("is_published.eq.true,is_published.is.null")
    .limit(500)
  if (!list?.length) return null

  const normRequest = normalized
  let best: ArticleRow | null = null
  let bestLen = 0
  for (const row of list) {
    const normRow = normalizeSlugForLookup(row.slug)
    const exactMatch = normRow === normRequest
    const requestIsPrefix = normRow.startsWith(normRequest) && normRequest.length >= 20
    const rowIsPrefix = normRequest.startsWith(normRow) && normRow.length >= 20
    if (exactMatch) return row as ArticleRow
    if (requestIsPrefix && row.slug.length > bestLen) {
      best = row as ArticleRow
      bestLen = row.slug.length
    }
    if (rowIsPrefix && normRow.length > bestLen) {
      best = row as ArticleRow
      bestLen = normRow.length
    }
  }
  return best
}
