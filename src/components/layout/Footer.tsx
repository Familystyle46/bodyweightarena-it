import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t bg-muted/30 mt-auto">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <p className="font-semibold text-foreground">Bodyweight Arena</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Integratori alimentari, dimagrimento, massa muscolare, energia e articolazioni. Consigli e prodotti per il tuo benessere.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              contact@bodyweightarena.it
            </p>
          </div>
          <div>
            <p className="font-semibold text-foreground">Categorie</p>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li><Link href="/integratori" className="hover:text-foreground">Integratori</Link></li>
              <li><Link href="/dimagrire" className="hover:text-foreground">Dimagrire</Link></li>
              <li><Link href="/massa-muscolare" className="hover:text-foreground">Massa muscolare</Link></li>
              <li><Link href="/energia" className="hover:text-foreground">Energia</Link></li>
              <li><Link href="/articolazioni" className="hover:text-foreground">Articolazioni</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-foreground">Navigation</p>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-foreground">Home</Link></li>
              <li><Link href="/produits" className="hover:text-foreground">Tutti i prodotti</Link></li>
              <li><Link href="/blog" className="hover:text-foreground">Blog & Consigli</Link></li>
              <li><Link href="/contact" className="hover:text-foreground">Contatti</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-foreground">Informazioni</p>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li><Link href="/note-legali" className="hover:text-foreground">Note legali</Link></li>
              <li><Link href="/condizioni" className="hover:text-foreground">Condizioni</Link></li>
              <li><Link href="/privacy" className="hover:text-foreground">Privacy e cookie</Link></li>
            </ul>
          </div>
        </div>
        <p className="mt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Bodyweight Arena. Tutti i diritti riservati. Sito in affiliazione.
        </p>
      </div>
    </footer>
  )
}
