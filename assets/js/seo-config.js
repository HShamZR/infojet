/**
 * Configuration SEO pour l'application
 * @returns {Object} - Configuration pour useHead()
 */
export function getSeoConfig() {
  return {
    title: 'InfoJet - Analyseur de statistiques Mailjet',
    meta: [
      { 
        name: 'description', 
        content: 'Analysez facilement vos statistiques Mailjet avec InfoJet. Visualisez les taux d\'ouverture, clics et performances de vos campagnes email en quelques secondes.' 
      },
      { 
        name: 'keywords', 
        content: 'Mailjet, statistiques email, analyse newsletter, taux ouverture, taux clic, CSV Mailjet' 
      },
      { 
        property: 'og:title', 
        content: 'InfoJet - Analyseur de statistiques Mailjet' 
      },
      { 
        property: 'og:description', 
        content: 'Analysez facilement vos statistiques Mailjet avec InfoJet. Visualisez les taux d\'ouverture, clics et performances de vos campagnes email en quelques secondes.' 
      },
      { 
        property: 'og:type', 
        content: 'website' 
      },
      { 
        name: 'twitter:title', 
        content: 'InfoJet - Analyseur de statistiques Mailjet' 
      },
      { 
        name: 'twitter:description', 
        content: 'Analysez facilement vos statistiques Mailjet avec InfoJet. Visualisez les taux d\'ouverture, clics et performances de vos campagnes email.' 
      }
    ]
  };
} 