"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

const COOKIE_CONSENT_KEY = "bodyweightarena_cookie_consent"

export function CookieBanner() {
  const [mounted, setMounted] = useState(false)
  const [accepted, setAccepted] = useState<boolean | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY)
    setAccepted(stored === "true" || stored === "false" ? stored === "true" : null)
    setMounted(true)
  }, [])

  const accept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "true")
    setAccepted(true)
  }

  const decline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "false")
    setAccepted(false)
  }

  if (!mounted || accepted !== null) return null

  return (
    <div
      role="dialog"
      aria-label="Informativa cookie"
      className="fixed bottom-0 left-0 right-0 z-[100] border-t bg-card p-4 shadow-lg md:left-4 md:right-auto md:bottom-4 md:max-w-md md:rounded-lg"
    >
      <p className="text-sm text-foreground">
        Utilizziamo cookie e tecnologie simili per migliorare l&apos;esperienza e le analisi del sito, in conformità con la
        normativa italiana (Provvedimento Garante Privacy). Continuando la navigazione accetti la nostra{" "}
        <Link href="/privacy" className="text-primary underline hover:no-underline">
          Privacy e cookie
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={accept}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          Accetta
        </button>
        <button
          type="button"
          onClick={decline}
          className="rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-muted"
        >
          Rifiuta
        </button>
      </div>
    </div>
  )
}
