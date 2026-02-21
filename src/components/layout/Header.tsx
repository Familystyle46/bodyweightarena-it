"use client"

import Link from "next/link"
import Image from "next/image"

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold text-foreground">
          <Image
            src="/logo.png"
            alt="Bodyweight Arena"
            width={180}
            height={48}
            className="h-10 w-auto object-contain md:h-12"
            priority
          />
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="text-muted-foreground transition hover:text-foreground">
            Home
          </Link>
          <Link href="/produits" className="text-muted-foreground transition hover:text-foreground">
            Prodotti
          </Link>
          <Link href="/blog" className="text-muted-foreground transition hover:text-foreground">
            Blog
          </Link>
          <Link href="/contact" className="text-muted-foreground transition hover:text-foreground">
            Contatti
          </Link>
          <Link
            href="/admin"
            className="rounded-md px-2 py-1 text-muted-foreground transition hover:bg-muted hover:text-foreground"
            title="Admin"
          >
            Admin
          </Link>
        </nav>
      </div>
    </header>
  )
}
