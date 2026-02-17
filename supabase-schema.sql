-- ============================================================
-- Schéma Pharmacie Provençale — à exécuter dans ton projet Supabase
-- Dashboard > SQL Editor > New query > coller ce script > Run
-- ============================================================

-- Enums
CREATE TYPE app_role AS ENUM ('admin', 'user');

CREATE TYPE article_category AS ENUM (
  'bien_etre',
  'nutrition',
  'conseils',
  'actualites',
  'probiotiques_digestion',
  'sommeil_stress',
  'minceur_detox',
  'sommeil_confort',
  'sante_masculine',
  'detox_minceur',
  'glycemie_diabete',
  'articulations',
  'cardio_tension',
  'parasites_immunite',
  'transversal'
);

CREATE TYPE product_category AS ENUM (
  'equilibre',
  'minceur',
  'energie',
  'beaute',
  'immunite',
  'digestion'
);

-- Table products
CREATE TABLE products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text NOT NULL,
  short_description text,
  original_price numeric NOT NULL,
  sale_price numeric NOT NULL,
  stock integer,
  category product_category NOT NULL DEFAULT 'equilibre',
  affiliate_link text NOT NULL,
  images text[] NOT NULL DEFAULT '{}',
  badges text[],
  faq jsonb,
  is_active boolean DEFAULT true,
  is_featured boolean DEFAULT false,
  offer_end_date date,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Table articles
CREATE TABLE articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  excerpt text NOT NULL,
  content text NOT NULL,
  category article_category NOT NULL DEFAULT 'bien_etre',
  cover_image text,
  is_published boolean DEFAULT false,
  published_at timestamptz,
  author_name text,
  author_title text,
  author_bio text,
  keyword text,
  meta_description text,
  faqs jsonb,
  product_ids uuid[],
  internal_links jsonb,
  related_articles text[],
  same_category_links text[],
  cross_category_links text[],
  pillar_type text,
  search_intent text,
  secondary_keywords text[],
  reading_time integer,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Table reviews (avis clients, liés aux produits)
CREATE TABLE reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  author_name text NOT NULL,
  comment text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  is_verified boolean DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_reviews_product_id ON reviews(product_id);

-- Table profiles (optionnel, pour l’auth)
CREATE TABLE profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE,
  email text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Table user_roles (admin / user — pour protéger /admin)
CREATE TABLE user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role app_role NOT NULL DEFAULT 'user',
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Fonction utilisée par l’app pour vérifier le rôle (ex. has_role('admin', user_id))
CREATE OR REPLACE FUNCTION has_role(_role app_role, _user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = _user_id AND role = _role
  );
$$;

-- Trigger updated_at sur products et articles
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE PROCEDURE set_updated_at();

CREATE TRIGGER articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW EXECUTE PROCEDURE set_updated_at();

-- Table contact_messages (formulaire de contact)
CREATE TABLE contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- ============================================================
-- Politiques RLS (Row Level Security) — à activer si tu veux
-- restreindre l’accès par rôle. Sinon, la clé anon peut tout lire.
-- ============================================================
-- ALTER TABLE products ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
-- Puis créer des policies selon tes besoins (ex: tout le monde peut lire products/articles, seul admin peut écrire).

-- ============================================================
-- Ton compte admin : après avoir activé Auth (Email ou autre),
-- récupère ton user_id (uuid) dans Authentication > Users,
-- puis exécute (remplace USER_ID_ICI par ton uuid) :
-- ============================================================
-- INSERT INTO user_roles (user_id, role) VALUES ('USER_ID_ICI', 'admin');
-- ============================================================
