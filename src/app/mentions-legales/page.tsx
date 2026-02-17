import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Mentions Légales",
  description:
    "Mentions légales du site Pharmacie Provençale - Informations sur l&apos;éditeur, l&apos;hébergeur et les conditions d'utilisation du site.",
}

export default function MentionsLegalesPage() {
  return (
    <main className="min-h-screen p-6 md:p-10">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-4xl font-bold">Mentions Légales</h1>

        <div className="prose prose-lg max-w-none text-foreground">
          <h2 className="mt-8 text-xl font-semibold">1. Éditeur du site</h2>
          <p>
            Le site Pharmacie Provençale est édité par :<br />
            <strong>Pharmacie Provençale</strong><br />
            45 Cours Mirabeau<br />
            13100 Aix-en-Provence, France<br />
            SIRET : 123 456 789 00001<br />
            Email : contact@pharmacie-provencale.com<br />
            Téléphone : 04 42 00 00 00
          </p>

          <h2 className="mt-8 text-xl font-semibold">2. Directeur de la publication</h2>
          <p>Le directeur de la publication est le responsable de la Pharmacie Provençale.</p>

          <h2 className="mt-8 text-xl font-semibold">3. Hébergement</h2>
          <p>
            Le site est hébergé par :<br />
            <strong>Vercel Inc.</strong><br />
            440 N Barranca Ave #4133, Covina, CA 91723, USA<br />
            https://vercel.com
          </p>

          <h2 className="mt-8 text-xl font-semibold">4. Propriété intellectuelle</h2>
          <p>
            L&apos;ensemble des éléments constituant le site Pharmacie Provençale (textes, images, graphismes, logo, icônes, etc.)
            sont la propriété exclusive de la Pharmacie Provençale ou de ses partenaires. Toute reproduction, représentation,
            modification, publication ou adaptation de tout ou partie des éléments du site est interdite, sauf autorisation
            écrite préalable.
          </p>

          <h2 className="mt-8 text-xl font-semibold">5. Liens hypertextes</h2>
          <p>
            Le site Pharmacie Provençale peut contenir des liens hypertextes vers d&apos;autres sites. La Pharmacie Provençale n&apos;exerce
            aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu ou leur accessibilité.
          </p>

          <h2 className="mt-8 text-xl font-semibold">6. Données personnelles</h2>
          <p>
            Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d&apos;un droit d&apos;accès, de
            rectification et de suppression des données vous concernant. Pour exercer ce droit, veuillez nous contacter à
            l&apos;adresse : contact@pharmacie-provencale.com
          </p>
          <p>
            Pour plus d&apos;informations, consultez notre{" "}
            <Link href="/confidentialite" className="text-primary hover:underline">
              Politique de Confidentialité
            </Link>
            .
          </p>

          <h2 className="mt-8 text-xl font-semibold">7. Cookies</h2>
          <p>
            Le site utilise des cookies pour améliorer l&apos;expérience utilisateur. En naviguant sur notre site, vous acceptez
            l&apos;utilisation de cookies conformément à notre politique de confidentialité.
          </p>

          <h2 className="mt-8 text-xl font-semibold">8. Droit applicable</h2>
          <p>
            Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux français seront
            seuls compétents.
          </p>

          <p className="mt-8 text-sm text-muted-foreground">
            Dernière mise à jour :{" "}
            {new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
      </div>
    </main>
  )
}
