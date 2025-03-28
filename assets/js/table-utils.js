/**
 * Formate une date selon le type de période
 * @param {string} date - Date au format YYYY-MM-DD
 * @param {string} periodType - Type de période (day, week, month)
 * @returns {string} - Date formatée
 */
function formatDate(date, periodType) {
  const dateObj = new Date(date);
  const options = {
    day: { day: '2-digit', month: 'short', year: 'numeric' },
    week: { day: '2-digit', month: 'short', year: 'numeric' },
    month: { month: 'long', year: 'numeric' }
  };

  return new Intl.DateTimeFormat('fr-FR', options[periodType]).format(dateObj);
}

/**
 * Formate les données pour l'affichage dans le tableau
 * @param {Array} periodStats - Statistiques par période
 * @param {string} periodType - Type de période (day, week, month)
 * @returns {Array} - Données formatées
 */
export function formatTableData(periodStats, periodType) {
  return periodStats
    .map(stat => ({
      date: stat.date,
      formattedDate: formatDate(stat.date, periodType),
      delivered: stat.delivered.toLocaleString('fr-FR'),
      opened: stat.opened.toLocaleString('fr-FR'),
      clicked: stat.clicked.toLocaleString('fr-FR'),
      bounced: stat.bounced.toLocaleString('fr-FR'),
      unsubscribed: stat.unsubscribed.toLocaleString('fr-FR')
    }))
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // Tri par date décroissante
} 