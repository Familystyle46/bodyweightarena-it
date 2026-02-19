# Previews Vercel avant déploiement définitif

## Principe

- **Branche `main`** → déploiement **production** (domaine définitif, ex. pharmacie-provencale.com).
- **Branche `preview`** → déploiements **preview** : chaque push génère une URL temporaire pour tester avant de merger.

## Configuration Vercel (une fois)

1. Va sur [vercel.com](https://vercel.com) → ton projet **pharmacie-provencale-next**.
2. **Settings** → **Git** :
   - **Production Branch** : `main` (déploiements définitifs).
   - Les autres branches (dont `preview`) sont automatiquement déployées en **Preview**.
3. Les variables d’environnement (Supabase, etc.) sont partagées entre Production et Preview sauf si tu définis des overrides par branche.

## Workflow au quotidien

### 1. Travailler et pousser sur la branche preview

```bash
cd pharmacie-provencale-next

# Créer la branche preview (une seule fois)
git checkout -b preview

# Ou si elle existe déjà, la prendre
git checkout preview

# Faire tes modifs, puis :
git add .
git commit -m "feat: description des changements"
git push origin preview
```

### 2. Voir la preview

- Dans le dashboard Vercel : onglet **Deployments** → le dernier déploiement de la branche `preview` a une URL du type :
  - `pharmacie-provencale-next-git-preview-xxx.vercel.app`
  - ou un domaine preview personnalisé si tu en as configuré un.
- Tu peux aussi cliquer sur **Visit** depuis la notif ou l’email Vercel après un push.

### 3. Mettre en production quand c’est bon

```bash
git checkout main
git merge preview
git push origin main
```

→ Vercel déploie automatiquement `main` en production.

### 4. Continuer à développer sur preview

```bash
git checkout preview
# travailler, commit, push...
```

## Récap des branches

| Branche   | Rôle        | URL type                          |
|-----------|-------------|-----------------------------------|
| `main`    | Production  | pharmacie-provencale.com         |
| `preview` | Aperçu test | xxx-git-preview-xxx.vercel.app    |

## Première fois : pousser la branche `preview`

Si tu viens de créer la branche `preview` en local, pousse-la vers GitHub (une fois) :

```bash
cd pharmacie-provencale-next
git push -u origin preview
```

Ensuite Vercel détectera la branche et créera un déploiement preview à chaque `git push origin preview`.

## Astuce

Pour créer une preview à partir de ta branche actuelle sans tout merger dans `main` :

```bash
git checkout -b preview    # crée preview à partir de l’état actuel
git push -u origin preview # envoie sur GitHub → Vercel build la preview
```

Ensuite tu peux revenir sur `main` avec `git checkout main` et merger `preview` plus tard quand tu valides.
