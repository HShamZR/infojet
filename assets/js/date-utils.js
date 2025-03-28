/**
 * Formate une plage de dates pour l'affichage
 * @param {string} startDateStr - Date de début au format ISO
 * @param {string} endDateStr - Date de fin au format ISO
 * @returns {string} - Chaîne formatée
 */
export function formatDateRange(startDateStr, endDateStr) {
  if (!startDateStr || !endDateStr) {
    return 'Sélectionner une période'
  }
  
  const start = new Date(startDateStr)
  const end = new Date(endDateStr)
  const options = { day: 'numeric', month: 'long' }
  const yearOptions = { year: 'numeric' }
  
  // Si même année, on ne l'affiche qu'une fois à la fin
  if (start.getFullYear() === end.getFullYear()) {
    return `${start.toLocaleDateString('fr-FR', options)} → ${end.toLocaleDateString('fr-FR', options)} ${end.toLocaleDateString('fr-FR', yearOptions)}`
  }
  
  // Si années différentes, on affiche l'année pour chaque date
  return `${start.toLocaleDateString('fr-FR', { ...options, year: 'numeric' })} → ${end.toLocaleDateString('fr-FR', { ...options, year: 'numeric' })}`
}

/**
 * Retourne les périodes rapides disponibles avec leurs libellés
 * @returns {Object} - Périodes avec leurs libellés
 */
export function getQuickPeriods() {
  return {
    today: "Aujourd'hui",
    yesterday: "Hier",
    last7days: "7 derniers jours",
    thisMonth: "Ce mois-ci",
    lastMonth: "Mois dernier",
    thisYear: "Cette année",
    last12Months: "12 derniers mois",
    custom: "Personnalisé"
  }
}

/**
 * Définit une période rapide (aujourd'hui, semaine dernière, etc.)
 * @param {string} period - Identifiant de la période
 * @returns {Object} - Dates de début et de fin
 */
export function getQuickPeriodDates(period) {
  const today = new Date()
  const startDate = new Date()
  let endDate = new Date()

  switch (period) {
    case 'today':
      // Début et fin à aujourd'hui
      break
    case 'yesterday':
      startDate.setDate(today.getDate() - 1)
      endDate = new Date(startDate)
      break
    case 'last7days':
      startDate.setDate(today.getDate() - 7)
      break
    case 'thisMonth':
      startDate.setDate(1)
      break
    case 'lastMonth':
      startDate.setMonth(today.getMonth() - 1, 1)
      endDate.setMonth(today.getMonth(), 0)
      break
    case 'thisYear':
      startDate.setMonth(0, 1)
      break
    case 'last12Months':
      startDate.setMonth(today.getMonth() - 11, 1)
      break
    case 'custom':
      return null // Ne rien faire, laisser l'utilisateur choisir
  }

  return {
    startDate: startDate.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0]
  }
}

/**
 * Vérifie si une période est active
 * @param {string} period - Identifiant de la période
 * @param {string} startDateStr - Date de début au format ISO
 * @param {string} endDateStr - Date de fin au format ISO
 * @returns {boolean} - Vrai si la période est active
 */
export function isActivePeriod(period, startDateStr, endDateStr) {
  const today = new Date()
  const start = startDateStr ? new Date(startDateStr) : null
  const end = endDateStr ? new Date(endDateStr) : null

  if (!start || !end) return false

  switch (period) {
    case 'today':
      return start.toDateString() === today.toDateString() && 
             end.toDateString() === today.toDateString()
    case 'yesterday':
      const yesterday = new Date(today)
      yesterday.setDate(today.getDate() - 1)
      return start.toDateString() === yesterday.toDateString() && 
             end.toDateString() === yesterday.toDateString()
    case 'last7days':
      const sevenDaysAgo = new Date(today)
      sevenDaysAgo.setDate(today.getDate() - 7)
      return start.toDateString() === sevenDaysAgo.toDateString() && 
             end.toDateString() === today.toDateString()
    case 'thisMonth':
      const firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
      return start.toDateString() === firstOfMonth.toDateString() && 
             end.toDateString() === today.toDateString()
    case 'lastMonth':
      const firstOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1)
      const lastOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0)
      return start.toDateString() === firstOfLastMonth.toDateString() && 
             end.toDateString() === lastOfLastMonth.toDateString()
    case 'thisYear':
      const firstOfYear = new Date(today.getFullYear(), 0, 1)
      return start.toDateString() === firstOfYear.toDateString() && 
             end.toDateString() === today.toDateString()
    case 'last12Months':
      const twelveMonthsAgo = new Date(today)
      twelveMonthsAgo.setMonth(today.getMonth() - 11, 1)
      return start.toDateString() === twelveMonthsAgo.toDateString() && 
             end.toDateString() === today.toDateString()
    default:
      return false
  }
}

/**
 * Formate une date selon la période (jour, semaine, mois)
 * @param {string} dateStr - Date au format ISO
 * @param {string} period - Période (day, week, month)
 * @returns {string} - Chaîne formatée
 */
export function formatDate(dateStr, period) {
  const date = new Date(dateStr)
  const options = { day: 'numeric', month: 'long' }
  const yearOptions = { year: 'numeric' }

  if (period === 'day') {
    // Si c'est une date unique
    const startStr = date.toLocaleDateString('fr-FR', options)
    const year = date.toLocaleDateString('fr-FR', yearOptions)
    return `${startStr} ${year}`
  } else if (period === 'week') {
    // Si c'est une semaine
    const endOfWeek = new Date(date)
    endOfWeek.setDate(date.getDate() + 6)
    
    const startStr = date.toLocaleDateString('fr-FR', options)
    const endStr = endOfWeek.toLocaleDateString('fr-FR', options)
    
    if (date.getFullYear() === endOfWeek.getFullYear()) {
      return `${startStr} → ${endStr} ${endOfWeek.toLocaleDateString('fr-FR', yearOptions)}`
    } else {
      return `${startStr} ${date.toLocaleDateString('fr-FR', yearOptions)} → ${endStr} ${endOfWeek.toLocaleDateString('fr-FR', yearOptions)}`
    }
  } else {
    // Pour les mois
    const startStr = date.toLocaleDateString('fr-FR', { month: 'long' })
    const year = date.toLocaleDateString('fr-FR', yearOptions)
    return `${startStr} ${year}`
  }
}

/**
 * Calcule la plage de dates par défaut
 * @param {Array} rawData - Données brutes avec des dates
 * @returns {Object} - Dates de début et fin par défaut
 */
export function getDefaultDateRange(rawData) {
  if (!rawData || rawData.length === 0) {
    return null
  }

  // Récupérer la dernière date disponible dans les données
  const dates = rawData.map(row => new Date(row.date))
  
  // Trier les dates par ordre décroissant
  dates.sort((a, b) => b.getTime() - a.getTime())
  
  const lastDate = dates[0]
  const firstDate = dates[dates.length - 1]

  // Si la période est inférieure à 7 jours, prendre toute la période
  if ((lastDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24) < 7) {
    return {
      startDate: firstDate.toISOString().split('T')[0],
      endDate: lastDate.toISOString().split('T')[0],
      period: 'day'
    }
  } else {
    // Sinon prendre les 7 derniers jours à partir de la dernière date
    const startDate = new Date(lastDate)
    startDate.setDate(lastDate.getDate() - 6)
    return {
      startDate: startDate.toISOString().split('T')[0],
      endDate: lastDate.toISOString().split('T')[0],
      period: 'day'
    }
  }
} 