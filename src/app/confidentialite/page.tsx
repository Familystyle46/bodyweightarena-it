import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Politique de Confidentialité",
  description:
    "Politique de confidentialité de Pharmacie Provençale - Découvrez comment nous protégeons vos données personnelles et respectons votre vie privée.",
}

export default function ConfidentialitePage() {
  return (
    <main className="min-h-screen p-6 md:p-10">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-4xl font-bold">Politique de Confidentialité</h1>

        <div className="prose prose-lg max-w-none text-foreground">
          <h2 className="mt-8 text-xl font-semibold">1. Introduction</h2>
          <p>
            Pharmacie Provençale s&apos;engage à protéger la vie privée des utilisateurs de son site internet. Cette politique de
            confidentialité explique comment nous collectons, utilisons et protégeons vos données personnelles.
          </p>

          <h2 className="mt-8 text-xl font-semibold">2. Responsable du traitement</h2>
          <p>
            Le responsable du traitement des données est :<br />
            <strong>Pharmacie Provençale</strong><br />
            45 Cours Mirabeau<br />
            13100 Aix-en-Provence, France<br />
            Email : contact@pharmacie-provencale.com
          </p>

          <h2 className="mt-8 text-xl font-semibold">3. Données collectées</h2>
          <p>Nous pouvons collecter les types de données suivants :</p>
          <ul>
            <li>
              <strong>Données de navigation :</strong> adresse IP, type de navigateur, pages visitées, durée de visite
            </li>
            <li>
              <strong>Données de contact :</strong> nom, email (si vous utilisez notre formulaire de contact)
            </li>
            <li>
              <strong>Cookies :</strong> pour améliorer votre expérience de navigation
            </li>
          </ul>

          <h2 className="mt-8 text-xl font-semibold">4. Finalités du traitement</h2>
          <p>Vos données sont utilisées pour :</p>
          <ul>
            <li>Améliorer la qualité et le contenu de notre site</li>
            <li>Analyser les tendances de navigation</li>
            <li>Répondre à vos demandes de contact</li>
            <li>Vous envoyer des informations sur nos produits (avec votre consentement)</li>
          </ul>

          <h2 className="mt-8 text-xl font-semibold">5. Base légale</h2>
          <p>
            Le traitement de vos données repose sur votre consentement et notre intérêt légitime à améliorer nos services et à
            communiquer avec nos visiteurs.
          </p>

          <h2 className="mt-8 text-xl font-semibold">6. Durée de conservation</h2>
          <p>
            Vos données personnelles sont conservées pendant une durée n&apos;excédant pas celle nécessaire aux finalités pour
            lesquelles elles sont collectées et traitées.
          </p>

          <h2 className="mt-8 text-xl font-semibold">7. Partage des données</h2>
          <p>Nous ne vendons pas vos données personnelles à des tiers. Vos données peuvent être partagées avec :</p>
          <ul>
            <li>Nos prestataires techniques (hébergement, analyse)</li>
            <li>Nos partenaires affiliés (lors d&apos;un clic vers leurs sites)</li>
            <li>Les autorités compétentes (en cas d&apos;obligation légale)</li>
          </ul>

          <h2 className="mt-8 text-xl font-semibold">8. Vos droits</h2>
          <p>Conformément au RGPD, vous disposez des droits suivants :</p>
          <ul>
            <li><strong>Droit d&apos;accès :</strong> obtenir une copie de vos données personnelles</li>
            <li><strong>Droit de rectification :</strong> corriger des données inexactes</li>
            <li><strong>Droit à l&apos;effacement :</strong> demander la suppression de vos données</li>
            <li><strong>Droit à la portabilité :</strong> recevoir vos données dans un format structuré</li>
            <li><strong>Droit d&apos;opposition :</strong> vous opposer au traitement de vos données</li>
            <li><strong>Droit de limitation :</strong> limiter le traitement de vos données</li>
          </ul>
          <p>Pour exercer ces droits, contactez-nous à : contact@pharmacie-provencale.com</p>

          <h2 className="mt-8 text-xl font-semibold">9. Cookies</h2>
          <p>
            Notre site utilise des cookies pour améliorer votre expérience de navigation. Vous pouvez configurer votre
            navigateur pour refuser les cookies. Cependant, cela peut affecter certaines fonctionnalités du site.
          </p>

          <h2 className="mt-8 text-xl font-semibold">10. Sécurité</h2>
          <p>
            Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos
            données personnelles contre tout accès non autorisé, modification, divulgation ou destruction.
          </p>

          <h2 className="mt-8 text-xl font-semibold">11. Liens vers d&apos;autres sites</h2>
          <p>
            Notre site peut contenir des liens vers des sites tiers (partenaires affiliés). Nous ne sommes pas responsables des
            pratiques de confidentialité de ces sites.
          </p>

          <h2 className="mt-8 text-xl font-semibold">12. Modifications</h2>
          <p>
            Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Toute modification sera
            publiée sur cette page avec une date de mise à jour.
          </p>

          <h2 className="mt-8 text-xl font-semibold">13. Contact</h2>
          <p>
            Pour toute question relative à cette politique :<br />
            Email : contact@pharmacie-provencale.com<br />
            Adresse : 45 Cours Mirabeau, 13100 Aix-en-Provence, France
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
