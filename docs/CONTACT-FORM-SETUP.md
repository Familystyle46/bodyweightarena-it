# Formulaire de contact — dépannage Supabase

Si tu vois **« Erreur lors de l'enregistrement du message »** sur la preview ou la prod, l’insert Supabase échoue. Voici quoi vérifier.

## Erreur « Could not find the 'name' column » (PGRST204)

La table existe mais **les colonnes ne correspondent pas** à ce que l’API attend (ou le cache schéma Supabase est obsolète). Il faut que la table ait exactement : `id`, `name`, `email`, `subject`, `message`, `created_at`.

**À faire dans Supabase → SQL Editor** : exécute le script suivant. Il supprime la table puis la recrée avec la bonne structure (les éventuels messages déjà en base seront perdus).

```sql
DROP TABLE IF EXISTS contact_messages;

CREATE TABLE contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
```

Ensuite, dans Supabase : **Project Settings** → **API** → bouton **Reload schema** (ou redémarre le projet) pour que le cache soit à jour. Puis refais un test d’envoi du formulaire.

---

## 1. La table `contact_messages` existe

Dans **Supabase** (le projet utilisé par Vercel) : **Table Editor** → tu dois voir une table **`contact_messages`** avec les colonnes `name`, `email`, `subject`, `message`, `created_at`.

Si la table n’existe pas du tout, exécute dans **SQL Editor** :

```sql
CREATE TABLE contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
```

## 2. Variables d’environnement sur Vercel

Pour la **preview** (et la prod), le projet Vercel doit avoir :

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **`SUPABASE_SERVICE_ROLE_KEY`** ← important : l’API utilise cette clé en priorité pour écrire en base (elle contourne le RLS).

Sans **Service Role Key**, l’API utilise la clé anon ; si le RLS est activé sur `contact_messages`, l’insert peut être refusé.

**Où les mettre :** Vercel → projet → **Settings** → **Environment Variables**. Ajoute les variables pour **Preview** et **Production** si besoin.

## 3. Si le RLS est activé sur `contact_messages`

Si tu as activé le RLS sur cette table et que tu n’utilises **pas** la Service Role Key côté API, autorise au moins l’insert pour le formulaire :

```sql
-- À exécuter seulement si contact_messages a RLS activé et que l’API utilise la clé anon
CREATE POLICY "Allow insert for contact form"
  ON contact_messages FOR INSERT
  TO anon
  WITH CHECK (true);
```

**Recommandation :** configurer **`SUPABASE_SERVICE_ROLE_KEY`** sur Vercel et ne pas s’appuyer sur une policy anon pour le contact.

## 4. Vérifier les logs

Sur Vercel : **Deployments** → dernier déploiement → **Functions** → clic sur la requête `/api/contact`. Les logs serveur affichent l’erreur Supabase exacte (`Supabase contact_messages insert: ...`), ce qui permet de confirmer table manquante, RLS ou permissions.
