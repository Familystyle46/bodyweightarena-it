import type { Metadata } from "next"
import { Mail } from "lucide-react"
import { ContactForm } from "./ContactForm"

export const metadata: Metadata = {
  title: "Contatti",
  description:
    "Domande sugli integratori? Contatta il team Bodyweight Arena via email. Ti rispondiamo al più presto.",
  robots: { index: false, follow: false },
}

export default function ContactPage() {
  return (
    <main className="min-h-screen p-6 md:p-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Contattaci
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Una domanda? Scrivici, il nostro team ti risponderà al più presto.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-6">
            <div className="rounded-lg border bg-card p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-sm text-muted-foreground">
                    contact@bodyweightarena.it
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-8 md:col-span-2">
            <h2 className="mb-6 text-2xl font-bold">Inviaci un messaggio</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  )
}
