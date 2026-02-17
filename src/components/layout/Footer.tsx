import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t bg-muted/30 mt-auto">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <p className="font-semibold text-foreground">Pharmacie Provençale</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Découvrez notre sélection de compléments alimentaires naturels pour prendre soin de votre bien-être au quotidien.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              contact@pharmacie-provencale.com<br />
              04 42 00 00 00<br />
              15 Cours Mirabeau, 13100 Aix-en-Provence
            </p>
          </div>
          <div>
            <p className="font-semibold text-foreground">Catégories</p>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li><Link href="/categories/equilibre" className="hover:text-foreground">Équilibre</Link></li>
              <li><Link href="/categories/minceur" className="hover:text-foreground">Minceur</Link></li>
              <li><Link href="/categories/energie" className="hover:text-foreground">Énergie</Link></li>
              <li><Link href="/categories/beaute" className="hover:text-foreground">Beauté</Link></li>
              <li><Link href="/categories/immunite" className="hover:text-foreground">Immunité</Link></li>
              <li><Link href="/categories/digestion" className="hover:text-foreground">Digestion</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-foreground">Navigation</p>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-foreground">Accueil</Link></li>
              <li><Link href="/produits" className="hover:text-foreground">Tous les produits</Link></li>
              <li><Link href="/blog" className="hover:text-foreground">Blog & Conseils</Link></li>
              <li><Link href="/contact" className="hover:text-foreground">Nous contacter</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-foreground">Informations</p>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li><Link href="/mentions-legales" className="hover:text-foreground">Mentions légales</Link></li>
              <li><Link href="/cgv" className="hover:text-foreground">Conditions de vente</Link></li>
              <li><Link href="/confidentialite" className="hover:text-foreground">Politique de confidentialité</Link></li>
            </ul>
          </div>
        </div>
        <p className="mt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Pharmacie Provençale. Tous droits réservés. Site affilié.
        </p>
      </div>
    </footer>
  )
}
