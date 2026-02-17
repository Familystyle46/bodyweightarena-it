import type { Metadata } from "next"
import { AdminPageClient } from "./AdminPageClient"

export const metadata: Metadata = {
  title: "Admin",
  description: "Gestion des produits et articles",
  robots: { index: false, follow: false },
}

export default function AdminPage() {
  return <AdminPageClient />
}
