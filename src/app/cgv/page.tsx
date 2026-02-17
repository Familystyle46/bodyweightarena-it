import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Conditions Générales de Vente",
  description:
    "Conditions générales de vente de Pharmacie Provençale - Informations sur les commandes, livraisons, retours et garanties.",
}

export default function CGVPage() {
  return (
    <main className="min-h-screen p-6 md:p-10">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-4xl font-bold">Conditions Générales de Vente</h1>

        <div className="prose prose-lg max-w-none text-foreground">
          <h2 className="mt-8 text-xl font-semibold">1. Objet</h2>
          <p>
            Les présentes conditions générales de vente régissent les relations contractuelles entre Pharmacie Provençale
            et ses clients dans le cadre de la vente de compléments alimentaires via le site internet
            pharmacie-provencale.com.
          </p>

          <h2 className="mt-8 text-xl font-semibold">2. Produits</h2>
          <p>
            Pharmacie Provençale propose une sélection de compléments alimentaires naturels. Les produits sont décrits et
            présentés avec la plus grande exactitude possible. Toutefois, des erreurs ou omissions peuvent survenir.
          </p>
          <p>
            <strong>Important :</strong> Pharmacie Provençale est un site affilié. Les produits présentés sont vendus par
            nos partenaires. En cliquant sur &quot;Commander&quot;, vous serez redirigé vers le site du vendeur officiel.
          </p>

          <h2 className="mt-8 text-xl font-semibold">3. Prix</h2>
          <p>
            Les prix affichés sur le site sont indicatifs et peuvent varier sur le site du partenaire. Les prix sont exprimés
            en euros et incluent toutes taxes applicables. Les frais de livraison sont précisés sur le site du vendeur
            partenaire.
          </p>

          <h2 className="mt-8 text-xl font-semibold">4. Commande</h2>
          <p>
            En cliquant sur les boutons d&apos;achat du site Pharmacie Provençale, vous êtes redirigé vers nos partenaires
            commerciaux. La commande est donc passée directement auprès de ces partenaires, qui sont seuls responsables de la
            transaction, de la livraison et du service après-vente.
          </p>

          <h2 className="mt-8 text-xl font-semibold">5. Livraison</h2>
          <p>
            Les conditions de livraison (délais, frais, zones géographiques) sont définies par chaque partenaire commercial.
            Veuillez consulter les conditions de vente du partenaire avant toute commande.
          </p>

          <h2 className="mt-8 text-xl font-semibold">6. Droit de rétractation</h2>
          <p>
            Conformément à la réglementation en vigueur, le droit de rétractation s&apos;applique selon les conditions définies par
            le vendeur partenaire. En général, vous disposez d&apos;un délai de 14 jours à compter de la réception du produit pour
            exercer votre droit de rétractation.
          </p>

          <h2 className="mt-8 text-xl font-semibold">7. Garanties</h2>
          <p>
            Les garanties légales (conformité et vices cachés) s&apos;appliquent aux produits vendus par nos partenaires. Pour toute
            réclamation, veuillez contacter directement le service client du vendeur.
          </p>

          <h2 className="mt-8 text-xl font-semibold">8. Responsabilité</h2>
          <p>
            Pharmacie Provençale agit en qualité d&apos;affilié et ne peut être tenu responsable des produits, services ou
            transactions effectuées sur les sites partenaires. Notre responsabilité se limite à la fourniture d&apos;informations sur
            les produits présentés.
          </p>

          <h2 className="mt-8 text-xl font-semibold">9. Protection des données</h2>
          <p>
            Les données personnelles collectées sur le site Pharmacie Provençale sont traitées conformément à notre{" "}
            <Link href="/confidentialite" className="text-primary hover:underline">
              Politique de Confidentialité
            </Link>
            .
          </p>

          <h2 className="mt-8 text-xl font-semibold">10. Litiges</h2>
          <p>
            En cas de litige relatif à une commande, le client doit s&apos;adresser directement au vendeur partenaire. Pour tout
            différend concernant le site Pharmacie Provençale, les tribunaux d&apos;Aix-en-Provence seront seuls compétents.
          </p>

          <h2 className="mt-8 text-xl font-semibold">11. Modification des CGV</h2>
          <p>
            Pharmacie Provençale se réserve le droit de modifier les présentes conditions générales de vente à tout moment. Les
            conditions applicables sont celles en vigueur à la date de navigation sur le site.
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
