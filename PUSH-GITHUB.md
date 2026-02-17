# Pousser le projet sur GitHub — guide pas à pas

## Option A : Tu as déjà un dépôt GitHub (ex. Familystyle46/pharmacie-provencale-next)

### Avec SSH (recommandé si tu as une clé SSH)

1. **Vérifier que ta clé SSH est enregistrée sur GitHub**
   - Ouvre : https://github.com/settings/keys
   - Si tu n’as pas de clé « SSH key », clique sur **New SSH key**, donne un titre, et colle le contenu de ta clé publique (sur Mac : `cat ~/.ssh/id_ed25519.pub` ou `cat ~/.ssh/id_rsa.pub` dans le Terminal). Si tu n’as pas de fichier, crée une clé avec : `ssh-keygen -t ed25519 -C "ton@email"` (Entrée pour tout accepter).

2. **Dans le Terminal (sur ton Mac)**
   ```bash
   cd /Users/ludo/pharmacie-provencale.com/pharmacie-provencale-next
   git push -u origin main
   ```
   - Si tu vois « Permission denied (publickey) », GitHub ne reconnaît pas ta clé : refais l’étape 1 ou passe à l’option B (HTTPS).

### Avec HTTPS (mot de passe = token GitHub)

1. **Créer un token GitHub**
   - Va sur : https://github.com/settings/tokens
   - **Generate new token** → **Generate new token (classic)**
   - Donne un nom (ex. « pharmacie-next »), coche au minimum **repo**
   - Génère, puis **copie le token** (tu ne le reverras plus).

2. **Changer la remote en HTTPS et pousser**
   ```bash
   cd /Users/ludo/pharmacie-provencale.com/pharmacie-provencale-next
   git remote set-url origin https://github.com/Familystyle46/pharmacie-provencale-next.git
   git push -u origin main
   ```
   - Quand on te demande **Username** : ton identifiant GitHub (ex. `Familystyle46` ou `girondin31`).
   - Quand on te demande **Password** : colle le **token** (pas ton mot de passe GitHub).

---

## Option B : Tu veux pousser vers TON propre dépôt (ex. girondin31)

1. **Créer un nouveau dépôt sur GitHub**
   - Va sur https://github.com/new
   - Nom du repo : par ex. `pharmacie-provencale-next`
   - Ne coche **pas** « Add a README » (le projet en a déjà un).
   - Crée le dépôt.

2. **Remplacer la remote et pousser**
   Remplace `TON_COMPTE` par ton identifiant GitHub (ex. `girondin31`) :
   ```bash
   cd /Users/ludo/pharmacie-provencale.com/pharmacie-provencale-next
   git remote set-url origin https://github.com/TON_COMPTE/pharmacie-provencale-next.git
   git push -u origin main
   ```
   - **Username** : ton identifiant GitHub.
   - **Password** : ton **token** (voir option A, étape 1 du HTTPS).

---

## En cas d’erreur « failed to push » ou « permission denied »

- **Permission denied (publickey)** → utilise l’option A (HTTPS) ou ajoute une clé SSH dans GitHub (option A SSH).
- **Repository not found** ou **403** → tu n’as pas les droits sur ce dépôt : utilise l’option B (ton propre repo).
- **Support for password authentication was removed** → tu dois utiliser un **token** (option A HTTPS, étape 1), pas ton mot de passe GitHub.

---

## Vérifier que tout est bien poussé

Après un `git push` réussi, ouvre dans le navigateur :
`https://github.com/Familystyle46/pharmacie-provencale-next` (ou ton repo si option B).
Tu dois voir les dossiers `src/`, `scripts/`, `supabase-schema.sql`, etc.
