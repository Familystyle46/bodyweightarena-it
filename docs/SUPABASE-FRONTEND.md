# Liaison Supabase ↔ Frontend (bodyweightarena.it)

## D’où vient le contenu affiché ?

Tout le contenu **produits** et **articles** affiché sur le site vient **uniquement** de Supabase :

| Page | Table Supabase | Champs affichés |
|------|----------------|-----------------|
| Fiche produit `/produits/[slug]` | `products` | `title`, `short_description`, `description`, `sale_price`, `original_price`, `images`, `faq`, `affiliate_link` |
| Liste produits `/produits` | `products` | `title`, `slug`, `sale_price`, `images`, `category` |
| Article blog `/blog/[slug]` | `articles` | `title`, `excerpt`, `content`, `cover_image`, `published_at`, `category` |
| Liste blog `/blog` | `articles` | `title`, `slug`, `excerpt`, `cover_image`, `published_at`, `category` |
| URLs legacy `/[year]/[month]/[day]/[slug]` | `articles` | même chose que blog (recherche par `slug`) |

Il n’y a **aucun texte français en dur** pour le contenu des produits ou des articles. Si tu vois du français à l’écran, c’est donc soit les **données en base**, soit le **cache** Next.js.

---

## Checklist : contenu encore en français

1. **Vérifier le bon projet Supabase**  
   Dans `.env.local` :
   - `NEXT_PUBLIC_SUPABASE_URL` doit être l’URL du projet où tu as traduit (ex. `https://vjfklvbmwzfyvhveamab.supabase.co`).

2. **Vérifier les données dans Supabase**  
   - **Table Editor** → table `products` (ou `articles`).  
   - Ouvre la ligne du produit/article concerné (ex. Lulutox ou l’article affiché).  
   - Regarde les colonnes `title`, `short_description`, `description`.  
   - Si elles sont encore en français, la traduction n’a pas été enregistrée dans **ce** projet / **cette** table.

3. **Vérifier le slug**  
   L’URL détermine quelle ligne est chargée :
   - `/produits/lulutox-detox-tea` → la ligne avec `slug = 'lulutox-detox-tea'`.  
   Si tu as dupliqué le produit ou créé une nouvelle ligne en italien avec un autre slug, le front affiche toujours celui qui correspond au slug de l’URL.

4. **Forcer le rafraîchissement du cache**  
   - Les pages produits/blog ont `revalidate = 60` (environ 1 minute).  
   - Après modification en base : attendre 1 min ou redémarrer le serveur (`npm run dev`) et recharger la page.  
   - En production : refaire un build (`npm run build`) pour régénérer les pages avec les nouvelles données.

5. **Pas d’autre source de contenu**  
   Le code utilise uniquement :
   - `createServerClient()` (avec les variables d’env ci‑dessus),
   - `.from("products")` ou `.from("articles")`,
   - `.eq("slug", slug)` (ou `.eq("id", id)` en admin).  
   Donc ce que tu vois = ce qui est dans la table concernée pour ce `slug` / cet `id`.

---

## Résumé

- **Liaison** : le front lit bien les tables Supabase ; il n’y a pas de bug de “mauvaise table”.  
- **Contenu en français** : soit les champs en base sont encore en français (mauvaise ligne ou mauvais projet), soit tu regardes une version en cache.  
- Après avoir corrigé les textes en italien dans Supabase et vérifié l’URL du projet dans `.env.local`, un rechargement (et au besoin un rebuild) doit suffire pour voir l’italien.
