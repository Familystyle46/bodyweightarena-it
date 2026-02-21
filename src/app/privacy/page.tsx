import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy e cookie",
  description:
    "Privacy e cookie di Bodyweight Arena - Come proteggiamo i tuoi dati e utilizziamo i cookie, in conformità con la normativa italiana ed europea.",
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen p-6 md:p-10">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-4xl font-bold">Privacy e cookie</h1>

        <div className="prose prose-lg max-w-none text-foreground">
          <h2 className="mt-8 text-xl font-semibold">1. Introduzione</h2>
          <p>
            Bodyweight Arena si impegna a proteggere la privacy degli utenti. Questa informativa spiega come raccogliamo,
            utilizziamo e proteggiamo i tuoi dati personali, in conformità al Regolamento (UE) 2016/679 (GDPR) e alla
            normativa italiana (incluso il D.Lgs. 196/2003 come modificato).
          </p>

          <h2 className="mt-8 text-xl font-semibold">2. Titolare del trattamento</h2>
          <p>
            Il titolare del trattamento è:<br />
            <strong>Bodyweight Arena</strong><br />
            Email: contact@bodyweightarena.it
          </p>

          <h2 className="mt-8 text-xl font-semibold">3. Dati raccolti</h2>
          <p>Possiamo raccogliere:</p>
          <ul>
            <li><strong>Dati di navigazione:</strong> indirizzo IP, tipo di browser, pagine visitate, durata della visita</li>
            <li><strong>Dati di contatto:</strong> nome, email (se utilizzi il modulo contatti)</li>
            <li><strong>Cookie:</strong> per migliorare l&apos;esperienza e le analisi (vedi sotto)</li>
          </ul>

          <h2 className="mt-8 text-xl font-semibold">4. Finalità e base giuridica</h2>
          <p>I dati sono utilizzati per:</p>
          <ul>
            <li>Migliorare contenuti e funzionalità del sito</li>
            <li>Analisi statistiche (anche tramite Google Analytics / GA4)</li>
            <li>Rispondere alle richieste di contatto</li>
          </ul>
          <p>La base giuridica è il consenso (cookie) e il legittimo interesse (analisi e sicurezza).</p>

          <h2 className="mt-8 text-xl font-semibold">5. Cookie e legge italiana</h2>
          <p>
            Il sito utilizza cookie tecnici e, con il tuo consenso, cookie analitici (es. Google Analytics). In base alla
            normativa italiana (Provvedimento Garante Privacy e direttiva ePrivacy) raccogliamo il consenso prima di
            attivare cookie non strettamente necessari. Puoi revocare il consenso in qualsiasi momento tramite le
            impostazioni del banner cookie o del browser.
          </p>

          <h2 className="mt-8 text-xl font-semibold">6. Conservazione</h2>
          <p>
            I dati personali sono conservati per il tempo strettamente necessario alle finalità indicate e comunque nei
            limiti previsti dalla legge.
          </p>

          <h2 className="mt-8 text-xl font-semibold">7. Condivisione</h2>
          <p>
            Non vendiamo i tuoi dati. I dati possono essere condivisi con: fornitori tecnici (hosting, analytics),
            autorità competenti se richiesto dalla legge.
          </p>

          <h2 className="mt-8 text-xl font-semibold">8. I tuoi diritti</h2>
          <p>In base al GDPR hai diritto a: accesso, rettifica, cancellazione, limitazione, portabilità, opposizione.</p>
          <p>Per esercitarli: contact@bodyweightarena.it. Hai anche il diritto di proporre reclamo all&apos;Autorità Garante per la protezione dei dati personali (garanteprivacy.it).</p>

          <h2 className="mt-8 text-xl font-semibold">9. Link esterni</h2>
          <p>
            Il sito può contenere link verso siti partner (affiliazione). Non siamo responsabili delle loro politiche
            sulla privacy.
          </p>

          <h2 className="mt-8 text-xl font-semibold">10. Modifiche</h2>
          <p>
            Possiamo aggiornare questa informativa. La versione aggiornata sarà pubblicata su questa pagina con data di
            revisione.
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
