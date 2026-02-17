# Pharmacie Provençale — Next.js 14 (ISR)

Migration du site Lovable (Vite/React SPA) vers **Next.js 14 App Router** avec **ISR** pour le SEO.

## Démarrage

```bash
cd pharmacie-provencale-next
cp .env.local.example .env.local   # puis remplir les clés Supabase
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Structure

- **`src/app/`** — Pages App Router (accueil, `/produits`, `/produits/[slug]`, `/categories/[slug]`, `/blog`, `/blog/[slug]`)
- **`src/lib/supabase/`** — Client serveur (ISR) et client navigateur
- **`src/types/`** — Types Supabase (products, articles, etc.)
- **`src/components/seo/`** — JSON-LD Product pour les fiches produit
- **`sitemap.xml`** et **`robots.txt`** — Générés dynamiquement

## Variables d’environnement

| Variable | Usage |
|----------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL du projet Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clé anon (client + build) |
| `SUPABASE_SERVICE_ROLE_KEY` | Clé service (serveur uniquement, optionnel au build) |
| `NEXT_PUBLIC_SITE_URL` | URL du site (sitemap, JSON-LD) |

## Build

```bash
npm run build
```

Les pages produits, catégories et articles sont pré-générées (ISR avec `revalidate`).  
Toutes les images utilisent `next/image` (lazy loading, formats optimisés).

## Admin

- **`/auth`** — Connexion (rôle admin requis via `user_roles`).
- **`/admin`** — Tableau produits / articles (toggle actif/publié, suppression, liens modifier/ajouter).
- **`/admin/produits/nouveau`** et **`/admin/produits/[id]`** — Formulaire produit (nom, slug, description, prix, stock, catégorie, image, lien affilié, FAQ, actif).
- **`/admin/articles/nouveau`** et **`/admin/articles/[id]`** — Formulaire article (titre, slug, extrait, contenu, catégorie, image de couverture, publié/brouillon).

**Supabase Storage** : créer un bucket **`images`** (public) pour les uploads produits et articles. Chemins utilisés : `products/<uuid>.<ext>` et `articles/<uuid>.<ext>`.

## Déploiement Vercel

1. Lier le repo au projet Vercel.
2. Ajouter les variables d’environnement (voir tableau ci-dessus).
3. Domaine : `pharmacie-provencale.com` (DNS selon la doc Vercel).

## Suite de la migration (Lovable)

- Copier les composants depuis `../source/src/components/` vers `src/components/ui/` et `src/components/pharmacy/`.
- Ajouter `"use client"` aux composants qui utilisent des hooks ou des événements.
- Remplacer les `<img>` par `next/image` et vérifier les domaines dans `next.config.mjs`.
