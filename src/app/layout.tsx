import type { Metadata } from "next"
import "./globals.css"
import { Providers } from "@/components/Providers"
import { LayoutClient } from "@/components/layout/LayoutClient"

export const metadata: Metadata = {
  title: {
    template: "%s | Pharmacie Provençale",
    default: "Pharmacie Provençale — Produits de santé et parapharmacie",
  },
  description:
    "Votre pharmacie en ligne : médicaments, parapharmacie, conseils santé.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://pharmacie-provencale.com"
  ),
  openGraph: {
    siteName: "Pharmacie Provençale",
    locale: "fr_FR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <head>
        {/* Google tag (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-S1LE3F1TNH"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-S1LE3F1TNH');
            `,
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col bg-background text-foreground font-sans antialiased">
        <Providers>
          <LayoutClient>{children}</LayoutClient>
        </Providers>
      </body>
    </html>
  )
}
