import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Condizioni e disclaimer affiliazione",
  description:
    "Condizioni di utilizzo e disclaimer affiliazione di Bodyweight Arena - Informazioni su ordini, spedizioni e rapporto con i partner.",
}

export default function CondizioniPage() {
  return (
    <main className="min-h-screen p-6 md:p-10">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-4xl font-bold">Condizioni e disclaimer affiliazione</h1>

        <div className="prose prose-lg max-w-none text-foreground">
          <h2 className="mt-8 text-xl font-semibold">1. Oggetto</h2>
          <p>
            Le presenti condizioni regolano l&apos;utilizzo del sito bodyweightarena.it. Bodyweight Arena è un sito in affiliazione:
            non vendiamo prodotti direttamente, ma indirizziamo gli utenti verso partner commerciali.
          </p>

          <h2 className="mt-8 text-xl font-semibold">2. Prodotti</h2>
          <p>
            Bodyweight Arena propone una selezione di integratori alimentari (dimagrimento, massa muscolare, energia,
            articolazioni). I prodotti sono descritti con la massima accuratezza possibile.
          </p>
          <p>
            <strong>Importante:</strong> Bodyweight Arena è un sito affiliato. I prodotti sono venduti dai nostri partner.
            Cliccando su &quot;Acquista&quot; o sui link prodotto, verrai reindirizzato sul sito del venditore ufficiale.
          </p>

          <h2 className="mt-8 text-xl font-semibold">3. Prezzi</h2>
          <p>
            I prezzi indicati sono puramente indicativi e possono variare sul sito del partner. I prezzi sono in euro.
            Spese di spedizione e modalità di consegna sono definite dal partner.
          </p>

          <h2 className="mt-8 text-xl font-semibold">4. Ordine</h2>
          <p>
            Cliccando sui pulsanti d&apos;acquisto su bodyweightarena.it, vieni reindirizzato ai partner. L&apos;ordine è effettuato
            direttamente presso il partner, unico responsabile della transazione, della spedizione e del servizio clienti.
          </p>

          <h2 className="mt-8 text-xl font-semibold">5. Spedizione e recesso</h2>
          <p>
            Tempi, costi e zone di consegna sono stabiliti da ogni partner. Il diritto di recesso (14 giorni) si applica
            secondo le condizioni del venditore partner.
          </p>

          <h2 className="mt-8 text-xl font-semibold">6. Responsabilità</h2>
          <p>
            Bodyweight Arena agisce in qualità di affiliato e non può essere ritenuto responsabile di prodotti, servizi o
            transazioni effettuate sui siti partner. La nostra responsabilità si limita alla correttezza delle informazioni
            presentate sul sito.
          </p>

          <h2 className="mt-8 text-xl font-semibold">7. Protezione dei dati</h2>
          <p>
            I dati personali raccolti su bodyweightarena.it sono trattati secondo la nostra{" "}
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy e cookie
            </Link>
            .
          </p>

          <h2 className="mt-8 text-xl font-semibold">8. Modifiche</h2>
          <p>
            Bodyweight Arena si riserva il diritto di modificare le presenti condizioni. Le condizioni applicabili sono
            quelle in vigore alla data di navigazione.
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
