import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'

// Enregistrement des composants nécessaires
export function registerChartComponents() {
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)
}

// Configuration générale du graphique
export const getLineChartOptions = () => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        usePointStyle: true,
        padding: 20,
        font: {
          size: 12
        }
      }
    },
    tooltip: {
      mode: 'index',
      intersect: false,
      callbacks: {
        label: function(context) {
          return `${context.dataset.label}: ${context.parsed.y} emails`
        }
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: function(value) {
          return value + ' emails'
        },
        font: {
          size: 11
        }
      },
      grid: {
        color: '#E5E7EB'
      }
    },
    x: {
      grid: {
        display: false
      },
      ticks: {
        font: {
          size: 11
        }
      }
    }
  },
  interaction: {
    mode: 'nearest',
    axis: 'x',
    intersect: false
  }
})

// Fonction pour créer les données du graphique
export function createLineChartData(periodStats, chartPeriod, formatDateFn) {
  return {
    labels: periodStats.map(stat => formatDateFn(stat.date, chartPeriod)),
    datasets: [
      {
        label: 'Livrés',
        data: periodStats.map(stat => stat.delivered),
        borderColor: '#8B5CF6',
        backgroundColor: '#8B5CF6',
        tension: 0.4,
        fill: false,
        pointRadius: 4
      },
      {
        label: 'Ouverts',
        data: periodStats.map(stat => stat.opened),
        borderColor: '#10B981',
        backgroundColor: '#10B981',
        tension: 0.4,
        fill: false,
        pointRadius: 4
      },
      {
        label: 'Cliqués',
        data: periodStats.map(stat => stat.clicked),
        borderColor: '#8B5CF6',
        backgroundColor: '#8B5CF6',
        tension: 0.4,
        fill: false,
        pointRadius: 4
      },
      {
        label: 'Rebonds',
        data: periodStats.map(stat => stat.hardBounce + stat.softBounce),
        borderColor: '#EF4444',
        backgroundColor: '#EF4444',
        tension: 0.4,
        fill: false,
        pointRadius: 4
      },
      {
        label: 'Désabonnements',
        data: periodStats.map(stat => stat.unsubscribed),
        borderColor: '#F97316',
        backgroundColor: '#F97316',
        tension: 0.4,
        fill: false,
        pointRadius: 4
      }
    ]
  }
} 