import domtoimage from 'dom-to-image-more'

/**
 * Exporte la zone de statistiques en PNG
 * @param {Object} chartRef - Référence au composant Chart.js
 * @returns {Promise<void>}
 */
export async function exportToPNG(chartRef) {
  try {
    const element = document.getElementById('export-zone')
    if (!element) {
      console.error('Zone d\'export non trouvée')
      return
    }

    // Désactiver les animations du graphique
    if (chartRef?.chart) {
      chartRef.chart.options.animation = false
      chartRef.chart.update('none')
    }

    // Attendre que le DOM soit stable
    await new Promise(resolve => setTimeout(resolve, 500))

    const dataUrl = await domtoimage.toPng(element, {
      cacheBust: true,
      bgcolor: '#ffffff',
      style: {
        transform: 'scale(1)',
        transformOrigin: 'top left'
      }
    })

    // Créer le lien de téléchargement
    const link = document.createElement('a')
    const date = new Date().toLocaleDateString('fr-FR').replace(/\//g, '-')
    link.download = `statistiques_${date}.png`
    link.href = dataUrl
    link.click()

    // Réactiver les animations du graphique
    if (chartRef?.chart) {
      chartRef.chart.options.animation = true
      chartRef.chart.update()
    }
  } catch (error) {
    console.error('Erreur lors de la génération du PNG:', error)
  }
}

/**
 * Exporte les données filtrées en CSV
 * @param {Array} filteredData - Données filtrées à exporter
 * @returns {void}
 */
export function exportToCSV(filteredData) {
  if (!filteredData || filteredData.length === 0) {
    alert('Aucune donnée à exporter')
    return
  }

  // Récupérer les en-têtes du premier objet
  const headers = Object.keys(filteredData[0])
  
  // Créer le contenu CSV avec BOM UTF-8 pour Excel
  const BOM = '\uFEFF'
  const csvContent = BOM + [
    headers.join(','), // En-têtes
    ...filteredData.map(row => 
      headers.map(header => {
        const value = row[header]
        // Échapper les virgules et les guillemets si nécessaire
        return typeof value === 'string' && (value.includes(',') || value.includes('"')) 
          ? `"${value.replace(/"/g, '""')}"` 
          : value
      }).join(',')
    )
  ].join('\n')

  // Créer le blob et le lien de téléchargement
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const date = new Date().toLocaleDateString('fr-FR').replace(/\//g, '-')
  link.href = URL.createObjectURL(blob)
  link.download = `statistiques_${date}.csv`
  link.click()
  URL.revokeObjectURL(link.href)
} 