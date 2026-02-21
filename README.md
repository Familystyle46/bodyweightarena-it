# Bodyweight Arena (bodyweightarena.it) — Next.js 14 (ISR)

Site nutra affiliation pour le marché italien : intégrateurs, dimagrimento, massa muscolare, energia, articolazioni. Basé sur le template Next.js 14 App Router avec ISR pour le SEO.

## Démarrage

```bash
cd bodyweightarena.it
cp .env.local.example .env.local   # puis remplir les clés Supabase
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Structure

- **`src/app/`** — Pages : accueil, `/produits`, `/produits/[slug]`, `/integratori`, `/dimagrire`, `/massa-muscolare`, `/energia`, `/articolazioni`, `/categories/[slug]`, `/blog`, `/blog/[slug]`, `/contact`, `/note-legali`, `/condizioni`, `/privacy`
- **`src/lib/supabase/`** — Client serveur (ISR) et client navigateur
- **`src/types/`** — Types Supabase (products, articles, product_category : integratori, dimagrire, massa_muscolare, energia, articolazioni)
- **`src/components/seo/`** — JSON-LD Product pour les fiches produit
- **Bandeau cookie** — Conformité normativa italiana (Privacy, cookie law)
- **Sitemap** et **robots.txt** — Générés dynamiquement

## Variables d'environnement

| Variable | Usage |
|----------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL du projet Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clé anon (client + build) |
| `SUPABASE_SERVICE_ROLE_KEY` | Clé service (serveur, optionnel au build) |
| `NEXT_PUBLIC_SITE_URL` | URL du site (ex. https://bodyweightarena.it) |
| `CONTACT_EMAIL` | Email de contact (formulaire) |
| `RESEND_API_KEY` | Optionnel : envoi email sur formulaire contact |

## Build

```bash
npm run build
```

Pages produits, catégories et articles en ISR. Liens affiliés en `rel="sponsored"`. GA4/GTM : remplacer l’ID dans `src/app/layout.tsx` par votre propriété.

## Admin

- **`/auth`** — Connexion (rôle admin requis via `user_roles`).
- **`/admin`** — Tableau produits / articles.
- **`/admin/produits/nouveau`** et **`/admin/produits/[id]`** — Formulaire produit (catégories : Integratori, Dimagrire, Massa muscolare, Energia, Articolazioni).
- **`/admin/articles/`** — Formulaire article.

**Supabase** : bucket **`images`** (public), chemins `products/<uuid>.<ext>` et `articles/<uuid>.<ext>`.

## Migration schéma Supabase

Si vous partez d’un schéma « Pharmacie Provençale » avec l’ancien enum `product_category` (equilibre, minceur, …), exécuter dans le SQL Editor Supabase :

```sql
-- Ajouter les nouvelles valeurs à l’enum (ou recréer le type si besoin)
ALTER TYPE product_category ADD VALUE IF NOT EXISTS 'integratori';
ALTER TYPE product_category ADD VALUE IF NOT EXISTS 'dimagrire';
ALTER TYPE product_category ADD VALUE IF NOT EXISTS 'massa_muscolare';
ALTER TYPE product_category ADD VALUE IF NOT EXISTS 'energia';
ALTER TYPE product_category ADD VALUE IF NOT EXISTS 'articolazioni';
```

Pour une base neuve, utiliser le fichier **`supabase-schema.sql`** (déjà configuré pour Bodyweight Arena).

## Déploiement Vercel

1. Lier le repo au projet Vercel.
2. Ajouter les variables d’environnement.
3. Domaine : `bodyweightarena.it` (DNS selon la doc Vercel).
4. Soumettre le sitemap à Google Search Console après mise en ligne.
