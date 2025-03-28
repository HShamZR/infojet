/**
 * Filtre les emails en fonction de la recherche
 * @param {Array} uniqueEmails - Liste des emails uniques
 * @param {string} searchQuery - Terme de recherche
 * @returns {Array} - Liste filtrée des emails
 */
export function filterEmails(uniqueEmails, searchQuery) {
  if (!searchQuery || searchQuery.trim() === '') {
    return uniqueEmails;
  }
  
  const query = searchQuery.toLowerCase().trim();
  return uniqueEmails.filter(email => 
    email.toLowerCase().includes(query)
  );
}

/**
 * Réinitialise les filtres de statistiques
 * @returns {Object} - Filtres par défaut
 */
export function getDefaultFilters() {
  return {
    email: '',
    startDate: '',
    endDate: '',
    period: 'day'
  };
}

/**
 * Construit un objet avec les périodes prédéfinies
 * @returns {Object} - Objets des périodes rapides
 */
export function getQuickPeriods() {
  return {
    today: "Aujourd'hui",
    yesterday: "Hier",
    last7days: "7 derniers jours",
    thisMonth: "Ce mois",
    lastMonth: "Mois dernier",
    thisYear: "Cette année",
    last12Months: "12 derniers mois",
    custom: "Custom"
  };
} 