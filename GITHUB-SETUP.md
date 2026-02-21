# Créer le dépôt GitHub pour bodyweightarena.it

## 1. Créer le dépôt sur GitHub

1. Va sur **https://github.com/new**
2. **Repository name** : `bodyweightarena-it` (ou `bodyweightarena.it`)
3. **Description** (optionnel) : `Site nutra affiliation bodyweightarena.it — Next.js 14, Supabase`
4. Choisis **Public**
5. **Ne coche pas** "Add a README" (le projet en a déjà un)
6. Clique sur **Create repository**

## 2. Lier le projet et pousser

Dans le terminal, à la racine du projet :

```bash
# Remplacer TON_COMPTE par ton username GitHub (ex. Familystyle46)
git remote set-url origin https://github.com/TON_COMPTE/bodyweightarena-it.git

# Ou si tu préfères SSH :
# git remote set-url origin git@github.com:TON_COMPTE/bodyweightarena-it.git

git add -A
git status   # vérifier les fichiers
git commit -m "bodyweightarena.it: site nutra IT, italien, catégories, légales, slugs legacy"
git push -u origin main
```

Si le dépôt GitHub a été créé avec une branche `main` vide, le `git push` suffit.  
Si GitHub a créé une branche `master`, utilise plutôt : `git push -u origin main` (ou renomme la branche côté GitHub en `main`).

## 3. (Optionnel) Installer GitHub CLI pour la prochaine fois

```bash
# macOS (Homebrew)
brew install gh
gh auth login
# Puis pour créer un repo directement :
# gh repo create bodyweightarena-it --private --source=. --remote=origin --push
```
