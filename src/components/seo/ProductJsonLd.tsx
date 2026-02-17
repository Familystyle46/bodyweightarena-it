interface ProductJsonLdProps {
  produit: {
    nom: string
    description: string
    prix: number
    image_url: string
    slug: string
    disponible: boolean
  }
}

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pharmacie-provencale.com"

export function ProductJsonLd({ produit }: ProductJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: produit.nom,
    description: produit.description,
    image: produit.image_url || undefined,
    offers: {
      "@type": "Offer",
      price: produit.prix,
      priceCurrency: "EUR",
      availability: produit.disponible
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `${BASE_URL}/produits/${produit.slug}`,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
