/**
 * Migration des données : Lovable (source) → ta Supabase (destination)
 *
 * 1. Crée un fichier .env.migrate à la racine (ou utilise .env.local) avec :
 *    LOVABLE_SUPABASE_URL=https://wvirarytnsqmrzfngbxo.supabase.co
 *    LOVABLE_SUPABASE_SERVICE_ROLE_KEY=ta_cle_service_role_lovable
 *    NEXT_PUBLIC_SUPABASE_URL=https://tuhighhtxyalytwzhgle.supabase.co
 *    SUPABASE_SERVICE_ROLE_KEY=ta_cle_service_role_ta_base
 *
 * 2. Exécute le schéma SQL sur ta base (supabase-schema.sql) si pas déjà fait.
 *
 * 3. Lance : npx tsx scripts/migrate-data.ts
 */

import { createClient } from "@supabase/supabase-js"
import { readFileSync, existsSync } from "fs"
import { resolve } from "path"

// Charger .env.migrate ou .env.local pour les variables
function loadEnv() {
  const paths = [
    resolve(process.cwd(), ".env.migrate"),
    resolve(process.cwd(), ".env.local"),
    resolve(process.cwd(), ".env"),
  ]
  for (const p of paths) {
    if (existsSync(p)) {
      const content = readFileSync(p, "utf-8")
      for (const line of content.split("\n")) {
        const trimmed = line.trim()
        if (trimmed && !trimmed.startsWith("#")) {
          const eq = trimmed.indexOf("=")
          if (eq > 0) {
            const key = trimmed.slice(0, eq).trim()
            let val = trimmed.slice(eq + 1).trim()
            if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'")))
              val = val.slice(1, -1)
            process.env[key] = val
          }
        }
      }
      console.log("Env chargé depuis:", p)
      return
    }
  }
}

loadEnv()

const lovableUrl = process.env.LOVABLE_SUPABASE_URL
const lovableKey = process.env.LOVABLE_SUPABASE_SERVICE_ROLE_KEY
const myUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const myKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!lovableUrl || !lovableKey) {
  console.error("❌ Définis LOVABLE_SUPABASE_URL et LOVABLE_SUPABASE_SERVICE_ROLE_KEY (.env.migrate ou .env.local)")
  process.exit(1)
}
if (!myUrl || !myKey) {
  console.error("❌ Définis NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY (ta base de destination)")
  process.exit(1)
}

const lovableSupabase = createClient(lovableUrl, lovableKey)
const mySupabase = createClient(myUrl, myKey)

async function migrateProducts() {
  const { data: products, error: fetchError } = await lovableSupabase
    .from("products")
    .select("*")

  if (fetchError) {
    console.error("Erreur lecture products Lovable:", fetchError.message)
    return
  }
  if (!products?.length) {
    console.log("Aucun produit à migrer.")
    return
  }

  const { error: insertError } = await mySupabase.from("products").insert(products)
  if (insertError) {
    console.error("Erreur migration products:", insertError.message)
    return
  }
  console.log(`✅ ${products.length} produits migrés`)
}

async function migrateArticles() {
  const { data: articles, error: fetchError } = await lovableSupabase
    .from("articles")
    .select("*")

  if (fetchError) {
    console.error("Erreur lecture articles Lovable:", fetchError.message)
    return
  }
  if (!articles?.length) {
    console.log("Aucun article à migrer.")
    return
  }

  const { error: insertError } = await mySupabase.from("articles").insert(articles)
  if (insertError) {
    console.error("Erreur migration articles:", insertError.message)
    return
  }
  console.log(`✅ ${articles.length} articles migrés`)
}

async function migrateReviews() {
  const { data: reviews, error: fetchError } = await lovableSupabase
    .from("reviews")
    .select("*")

  if (fetchError) {
    console.error("Erreur lecture reviews Lovable:", fetchError.message)
    return
  }
  if (!reviews?.length) {
    console.log("Aucun avis à migrer.")
    return
  }

  const { error: insertError } = await mySupabase.from("reviews").insert(reviews)
  if (insertError) {
    console.error("Erreur migration reviews:", insertError.message)
    return
  }
  console.log(`✅ ${reviews.length} avis (reviews) migrés`)
}

async function main() {
  console.log("Migration Lovable → ta Supabase\n")
  await migrateProducts()
  await migrateArticles()
  await migrateReviews()
  console.log("\nMigration terminée.")
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
