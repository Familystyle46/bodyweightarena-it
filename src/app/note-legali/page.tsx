import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Note legali",
  description:
    "Note legali del sito Bodyweight Arena - Informazioni sull'editore, hosting e condizioni di utilizzo. Conformità Codice del Consumo italiano.",
}

export default function NoteLegaliPage() {
  return (
    <main className="min-h-screen p-6 md:p-10">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-4xl font-bold">Note legali</h1>

        <div className="prose prose-lg max-w-none text-foreground">
          <h2 className="mt-8 text-xl font-semibold">1. Editore del sito</h2>
          <p>
            Il sito bodyweightarena.it è edito da:<br />
            <strong>Bodyweight Arena</strong><br />
            Email: contact@bodyweightarena.it
          </p>

          <h2 className="mt-8 text-xl font-semibold">2. Direttore della pubblicazione</h2>
          <p>Il direttore della pubblicazione è il responsabile del sito Bodyweight Arena.</p>

          <h2 className="mt-8 text-xl font-semibold">3. Hosting</h2>
          <p>
            Il sito è ospitato da:<br />
            <strong>Vercel Inc.</strong><br />
            440 N Barranca Ave #4133, Covina, CA 91723, USA<br />
            https://vercel.com
          </p>

          <h2 className="mt-8 text-xl font-semibold">4. Proprietà intellettuale</h2>
          <p>
            Gli elementi che costituiscono il sito Bodyweight Arena (testi, immagini, grafica, logo, icone, ecc.) sono di
            proprietà esclusiva di Bodyweight Arena o dei suoi partner. È vietata la riproduzione senza autorizzazione scritta.
          </p>

          <h2 className="mt-8 text-xl font-semibold">5. Link ipertestuali</h2>
          <p>
            Il sito può contenere link verso altri siti. Bodyweight Arena non esercita alcun controllo su tali siti e declina
            ogni responsabilità sul loro contenuto o accessibilità.
          </p>

          <h2 className="mt-8 text-xl font-semibold">6. Dati personali e cookie</h2>
          <p>
            In conformità al Regolamento (UE) 2016/679 (GDPR) e alla normativa italiana sulla privacy, hai diritto di accesso,
            rettifica e cancellazione dei dati che ti riguardano. Per esercitare questi diritti: contact@bodyweightarena.it
          </p>
          <p>
            Per maggiori informazioni, consulta la nostra{" "}
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy e cookie
            </Link>
            .
          </p>

          <h2 className="mt-8 text-xl font-semibold">7. Affiliazione</h2>
          <p>
            Bodyweight Arena è un sito in affiliazione. I prodotti presentati sono venduti da partner commerciali. I link
            verso i marchi sono in regime di affiliazione (attributo rel=&quot;sponsored&quot; secondo le linee guida SEO).
          </p>

          <h2 className="mt-8 text-xl font-semibold">8. Legge applicabile</h2>
          <p>
            Le presenti note legali sono soggette alla legge italiana (Codice del Consumo e normativa sui servizi digitali).
            In caso di controversia, saranno competenti i tribunali italiani.
          </p>

          <p className="mt-8 text-sm text-muted-foreground">
            Ultimo aggiornamento:{" "}
            {new Date().toLocaleDateString("it-IT", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
      </div>
    </main>
  )
}
