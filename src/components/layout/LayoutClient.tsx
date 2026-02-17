"use client"

import { usePathname } from "next/navigation"
import { Header } from "./Header"
import { Footer } from "./Footer"

export function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith("/admin")

  return (
    <>
      {!isAdmin && <Header />}
      <div className="flex-1">{children}</div>
      {!isAdmin && <Footer />}
    </>
  )
}
