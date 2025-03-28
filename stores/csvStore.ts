import { defineStore } from 'pinia'
import Papa from 'papaparse'

interface NewsletterData {
  Email: string
  status: string
  blocked: string
  soft_bounce: string
  hard_bounce: string
  retrying: string
  opened: string
  clicked: string
  unsub: string
  spam: string
  date: string
  messageid: string
  Sender: string
  subject: string
  campaign_id: string
  contactid: string
}

interface FilterOptions {
  email: string
  startDate: string
  endDate: string
  period: string
}

interface PeriodStats {
  date: string
  delivered: number
  opened: number
  clicked: number
  bounced: number
  unsubscribed: number
}

export const useCsvStore = defineStore('csv', {
  state: () => ({
    rawData: [] as NewsletterData[],
    filteredData: [] as NewsletterData[],
    progress: {
      status: '',
      current: 0,
      total: 0
    },
    stats: {
      totalEmails: 0,
      delivered: 0,
      blocked: 0,
      softBounce: 0,
      hardBounce: 0,
      retrying: 0,
      opened: 0,
      clicked: 0,
      unsubscribed: 0,
      spam: 0
    },
    periodStats: [] as PeriodStats[],
    filters: {
      email: '',
      startDate: '',
      endDate: '',
      period: 'day'
    } as FilterOptions
  }),

  getters: {
    uniqueEmails: (state) => {
      return [...new Set(state.rawData.map(row => row.Sender))]
    }
  },

  actions: {
    parseCSV(csvContent: string) {
      return new Promise((resolve, reject) => {
        Papa.parse(csvContent, {
          header: true,
          skipEmptyLines: true,
          complete: ({ data }) => {
            this.rawData = data as NewsletterData[]
            this.applyFilters(this.filters)
            resolve(data)
          },
          error: reject
        })
      })
    },

    applyFilters(filters: FilterOptions) {
      this.filters = filters
      
      // Filtrer par date et email
      this.filteredData = this.rawData.filter(row => {
        const rowDate = new Date(row.date)
        const startDate = filters.startDate ? new Date(filters.startDate) : null
        const endDate = filters.endDate ? new Date(filters.endDate) : null
        
        const matchesDate = (!startDate || rowDate >= startDate) && 
                          (!endDate || rowDate <= endDate)
        const matchesEmail = !filters.email || row.Sender === filters.email
        
        return matchesDate && matchesEmail
      })

      this.calculateStats()
      this.calculatePeriodStats()
    },

    calculateStats() {
      const data = this.filteredData
      
      // Total des emails
      this.stats.totalEmails = data.length

      // Emails livrés (status sent, opened ou clicked)
      this.stats.delivered = data.filter(row =>
        row.status === 'sent' ||
        row.status === 'opened' ||
        row.status === 'clicked'
      ).length

      // Autres statistiques
      this.stats.blocked = data.filter(row => row.blocked === 'TRUE').length
      this.stats.softBounce = data.filter(row => row.soft_bounce === 'TRUE').length
      this.stats.hardBounce = data.filter(row => row.hard_bounce === 'TRUE').length
      this.stats.retrying = data.filter(row => row.retrying === 'TRUE').length
      this.stats.opened = data.filter(row => row.opened === 'TRUE').length
      this.stats.clicked = data.filter(row => row.clicked === 'TRUE').length
      this.stats.unsubscribed = data.filter(row => row.unsub === 'TRUE').length
      this.stats.spam = data.filter(row => row.spam === 'TRUE').length
    },

    calculatePeriodStats() {
      const periodMap = new Map<string, PeriodStats>()
      
      this.filteredData.forEach(row => {
        let periodKey: string
        const date = new Date(row.date)
        
        // Déterminer la clé de période selon le type (jour, semaine, mois)
        switch (this.filters.period) {
          case 'week':
            const weekStart = new Date(date)
            weekStart.setDate(date.getDate() - date.getDay())
            periodKey = weekStart.toISOString().split('T')[0]
            break
          case 'month':
            periodKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-01`
            break
          default: // day
            periodKey = date.toISOString().split('T')[0]
        }

        // Initialiser ou mettre à jour les statistiques de la période
        if (!periodMap.has(periodKey)) {
          periodMap.set(periodKey, {
            date: periodKey,
            delivered: 0,
            opened: 0,
            clicked: 0,
            bounced: 0,
            unsubscribed: 0
          })
        }

        const stats = periodMap.get(periodKey)!

        // Mettre à jour les statistiques
        if (['sent', 'opened', 'clicked'].includes(row.status)) stats.delivered++
        if (row.opened === 'TRUE') stats.opened++
        if (row.clicked === 'TRUE') stats.clicked++
        if (row.hard_bounce === 'TRUE' || row.soft_bounce === 'TRUE') stats.bounced++
        if (row.unsub === 'TRUE') stats.unsubscribed++
      })

      // Convertir la Map en tableau trié par date
      this.periodStats = Array.from(periodMap.values())
        .sort((a, b) => a.date.localeCompare(b.date))
    },

    updateFilters(filters: FilterOptions) {
      this.filters = { ...this.filters, ...filters }
      this.applyFilters(this.filters)
    },

    getFilteredData() {
      const filters = this.filters
      if (!filters) return this.rawData

      return this.rawData.filter(row => {
        const rowDate = new Date(row.date)
        const startDate = filters.startDate ? new Date(filters.startDate) : null
        const endDate = filters.endDate ? new Date(filters.endDate) : null
        const emailMatch = !filters.email || row.Sender === filters.email

        return emailMatch && 
               (!startDate || rowDate >= startDate) && 
               (!endDate || rowDate <= endDate)
      })
    }
  }
}) 