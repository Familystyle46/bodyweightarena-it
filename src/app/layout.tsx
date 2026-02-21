import type { Metadata } from "next"
import "./globals.css"
import { Providers } from "@/components/Providers"
import { LayoutClient } from "@/components/layout/LayoutClient"

export const metadata: Metadata = {
  title: {
    template: "%s | Bodyweight Arena",
    default: "Bodyweight Arena — Integratori, dimagrimento, massa muscolare e benessere",
  },
  description:
    "Integratori alimentari, consigli su dimagrimento, massa muscolare, energia e articolazioni. Prodotti selezionati in affiliazione per il tuo benessere.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://bodyweightarena.it"
  ),
  openGraph: {
    siteName: "Bodyweight Arena",
    locale: "it_IT",
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
    <html lang="it">
      <head>
        {/* Google tag (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-SS4MS3TQEJ"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-SS4MS3TQEJ');
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
