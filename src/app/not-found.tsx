import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6">
      <h1 className="text-2xl font-bold">Pagina non trovata</h1>
      <p className="text-muted-foreground">
        Questa pagina non esiste o è stata spostata.
      </p>
      <Link
        href="/"
        className="rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:opacity-90"
      >
        Torna alla home
      </Link>
    </div>
  )
}
