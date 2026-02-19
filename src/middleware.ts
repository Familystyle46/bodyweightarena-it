import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

/**
 * Redirections SEO : http→https et www→canonique. Puis Supabase : session / cookies.
 * les cookies. Sans cela, la session peut expirer et l’admin est déconnecté
 * au refresh ou en naviguant.
 */
const CANONICAL_HOST =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/^https?:\/\//, "").replace(/\/$/, "") ??
  "pharmacie-provencale.com"

function redirectToCanonical(request: NextRequest): NextResponse | null {
  const nextUrl = request.nextUrl
  const host = (request.headers.get("host") ?? "").toLowerCase()
  const needsHttps = nextUrl.protocol === "http:"
  const needsNoWww = host.startsWith("www.")

  if (!needsHttps && !needsNoWww) return null

  // Une seule redirection 301 vers l’URL canonique (évite chaîne http→https→sans www)
  const canonical = new URL(`https://${CANONICAL_HOST}${nextUrl.pathname}${nextUrl.search}`)
  return NextResponse.redirect(canonical, 301)
}

export async function middleware(request: NextRequest) {
  const redirect = redirectToCanonical(request)
  if (redirect) return redirect

  let supabaseResponse = NextResponse.next({ request })

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !anonKey) return supabaseResponse

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        supabaseResponse = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        )
      },
    },
  })

  // Rafraîchir la session (renouvelle le JWT si proche de l’expiration)
  await supabase.auth.getSession()

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Toutes les routes sauf :
     * - _next/static, _next/image, favicon, fichiers statiques
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
