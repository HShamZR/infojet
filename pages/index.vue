<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
    
    <!-- Section des statistiques -->
    <div v-if="showStats">
      <!-- Sélecteur de période -->
      <div class="flex justify-between items-center mb-8">
        <div class="relative flex-1 max-w-[500px] min-w-[300px] mr-4">
          <button 
            @click="showDatePicker = !showDatePicker"
            class="w-full flex items-center justify-between px-4 py-2 border rounded-lg hover:border-violet-500 focus:outline-none focus:border-violet-500"
          >
            <div class="flex items-center gap-2 truncate">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 flex-shrink-0 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span class="truncate">{{ formattedDateRange }}</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 flex-shrink-0 text-violet-500" :class="{'rotate-180': showDatePicker}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <!-- Menu déroulant du sélecteur de date -->
          <div v-if="showDatePicker" class="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg z-50 w-[600px]">
            <div class="p-4">
              <div class="grid grid-cols-3 gap-2 mb-4">
                <button
                  v-for="(label, period) in quickPeriods"
                  :key="period"
                  @click="setQuickPeriod(period)"
                  class="px-4 py-2 text-center rounded-md hover:bg-gray-100 transition-colors border"
                  :class="{'bg-violet-50 border-violet-500 text-violet-700': isActivePeriod(period), 'border-gray-200': !isActivePeriod(period)}"
                >
                  {{ label }}
                </button>
              </div>

              <!-- Sélecteur de dates personnalisé -->
              <div class="flex items-center gap-4 mb-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Date de début</label>
                  <input
                    type="date"
                    v-model="filters.startDate"
                    @change="applyFilters"
                    class="w-[200px] rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500"
                  >
                </div>
                <div class="flex items-center">
                  <span class="text-gray-500">→</span>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Date de fin</label>
                  <input
                    type="date"
                    v-model="filters.endDate"
                    @change="applyFilters"
                    class="w-[200px] rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500"
                  >
                </div>
              </div>

              <!-- Boutons d'action -->
              <div class="flex justify-between">
                <button
                  @click="resetDateRange"
                  class="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Reset
                </button>
                <button
                  @click="applyDateSelection"
                  class="px-4 py-2 text-white bg-violet-600 rounded-md hover:bg-violet-700"
                >
                  Appliquer
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-4">
          <Combobox v-model="filters.email" @update:modelValue="applyFilters" as="div" class="relative w-[250px]">
            <div class="relative">
              <ComboboxInput
                class="h-10 w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:border-violet-500 focus:outline-none focus:border-violet-500 focus:ring-violet-500"
                :displayValue="(email) => email || 'Tous les expéditeurs'"
                @change="query = $event.target.value"
                placeholder="Rechercher un expéditeur"
              />
              <ComboboxButton class="absolute inset-y-0 right-0 flex items-center px-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                </svg>
              </ComboboxButton>
            </div>
            <ComboboxOptions class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              <ComboboxOption
                v-slot="{ active, selected }"
                :value="''"
                as="template"
              >
                <li class="relative cursor-pointer select-none py-2 px-4" :class="[active ? 'bg-violet-600 text-white' : 'text-gray-900']">
                  <span class="block truncate">Tous les expéditeurs</span>
                </li>
              </ComboboxOption>
              <ComboboxOption
                v-for="email in filteredEmails"
                :key="email"
                :value="email"
                v-slot="{ active, selected }"
                as="template"
              >
                <li class="relative cursor-pointer select-none py-2 px-4" :class="[active ? 'bg-violet-600 text-white' : 'text-gray-900']">
                  <span class="block truncate">{{ email }}</span>
                </li>
              </ComboboxOption>
            </ComboboxOptions>
          </Combobox>
          <button
            @click="downloadPNG"
            class="h-10 px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700 transition-colors text-sm flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Télécharger Image
          </button>
          <button
            @click="downloadCSV"
            class="h-10 px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700 transition-colors text-sm flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Télécharger CSV
          </button>
          <button
            @click="resetStats"
            class="h-10 px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700 transition-colors text-sm"
          >
            Analyser un autre fichier
          </button>
        </div>
      </div>

      <!-- Zone d'export -->
      <div id="export-zone" class="w-full bg-white p-8 rounded-lg shadow-xl">
        <!-- Statistiques détaillées -->
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
          <div class="bg-white p-4">
            <div class="text-gray-500 text-xs mb-1">{{ stats.totalEmails }} emails au total</div>
            <div class="text-3xl font-bold text-violet-500 mb-1">{{ ((stats.delivered / stats.totalEmails) * 100).toFixed(2) }}%</div>
            <div class="text-gray-700 text-sm font-medium">Livrés</div>
            <div class="text-xs text-gray-500 mt-1">{{ stats.delivered }} Emails</div>
            
            <div class="mt-3 space-y-1 text-xs text-gray-500">
              <div>{{ ((stats.blocked / stats.totalEmails) * 100).toFixed(2) }}% Bloqués</div>
              <div>{{ ((stats.hardBounce / stats.totalEmails) * 100).toFixed(2) }}% Rebonds permanents</div>
              <div>{{ ((stats.softBounce / stats.totalEmails) * 100).toFixed(2) }}% Rebonds temporaires</div>
              <div>{{ ((stats.retrying / stats.totalEmails) * 100).toFixed(2) }}% Renvoyés</div>
            </div>
          </div>

          <div class="bg-white p-4">
            <div class="text-3xl font-bold text-green-600 mb-1">
              {{ ((stats.opened / stats.delivered) * 100).toFixed(2) }}%
            </div>
            <div class="text-gray-700 text-sm font-medium">Ouverts</div>
            <div class="text-xs text-gray-500">{{ stats.opened }} Emails</div>
          </div>

          <div class="bg-white p-4">
            <div class="text-3xl font-bold text-violet-500 mb-1">
              {{ ((stats.clicked / stats.opened) * 100).toFixed(2) }}%
            </div>
            <div class="text-gray-700 text-sm font-medium">Cliqués</div>
            <div class="text-xs text-gray-500">{{ stats.clicked }} Emails</div>
          </div>

          <div class="bg-white p-4">
            <div class="text-3xl font-bold text-red-600 mb-1">
              {{ ((stats.unsubscribed / stats.delivered) * 100).toFixed(2) }}%
            </div>
            <div class="text-gray-700 text-sm font-medium">Désabonnements</div>
            <div class="text-xs text-gray-500">{{ stats.unsubscribed }} Emails</div>
          </div>

          <div class="bg-white p-4">
            <div class="text-3xl font-bold text-yellow-600 mb-1">
              {{ ((stats.spam / stats.delivered) * 100).toFixed(2) }}%
            </div>
            <div class="text-gray-700 text-sm font-medium">Spam</div>
            <div class="text-xs text-gray-500">{{ stats.spam }} Emails</div>
          </div>
        </div>

        <!-- Graphique -->
        <div class="bg-white p-6 mt-8 w-full">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium">Graphique</h3>
            <select 
              v-model="chartPeriod" 
              @change="updatePeriod"
              class="h-10 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md"
            >
              <option value="day">Jours</option>
              <option value="week">Semaines</option>
              <option value="month">Mois</option>
            </select>
          </div>
          <div class="h-[400px]">
            <Line
              v-if="lineChartData"
              :data="lineChartData"
              :options="lineChartOptions"
              ref="chartRef"
            />
          </div>

          <!-- En-tête avec la période et l'expéditeur -->
          <div v-if="filters.startDate || filters.email" class="mt-8 text-center text-sm text-gray-600">
            <div v-if="filters.startDate" class="mb-1">
              <span class="font-medium">Période :</span> {{ formattedDateRange }}
            </div>
            <div v-if="filters.email" class="mb-1">
              <span class="font-medium">Expéditeur :</span> {{ filters.email }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!showStats" class="min-h-[calc(100vh-20rem)] flex flex-col items-center justify-center p-0">
      <!-- Zone de dépôt de fichier -->
      <div class="w-[600px]">
        <FileUpload @file-processed="onFileProcessed" />
      </div>

      <!-- Texte de présentation -->
      <div class="w-[600px] text-left mt-8 p-6 border border-gray-200 rounded-lg bg-white">
        <h1 class="text-base font-medium text-gray-800 mb-3">
          InfoJet - Analyseur de statistiques Mailjet
        </h1>
        
        <p class="text-sm text-gray-600 mb-2">
          Importez votre fichier CSV Mailjet pour visualiser instantanément vos statistiques d'envoi : taux d'ouverture, clics, désabonnements et plus encore.
        </p>

        <div class="text-xs text-gray-500 bg-violet-50 p-3 rounded-md">
          <span class="mr-1">ℹ️</span>
          Compatible uniquement avec les fichiers CSV Mailjet au format standard.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Line } from 'vue-chartjs'
import { useCsvStore } from '~/stores/csvStore'
import { useHead } from '@unhead/vue'
import { Combobox, ComboboxInput, ComboboxButton, ComboboxOptions, ComboboxOption } from '@headlessui/vue'

// Imports des modules JavaScript
import { registerChartComponents, getLineChartOptions, createLineChartData } from '~/assets/js/chart-config'
import { formatDateRange, getQuickPeriodDates, isActivePeriod as checkActivePeriod, formatDate, getDefaultDateRange } from '~/assets/js/date-utils'
import { exportToPNG, exportToCSV } from '~/assets/js/export-utils'
import { filterEmails, getDefaultFilters, getQuickPeriods } from '~/assets/js/filter-utils'
import { setupDatePickerEvents } from '~/assets/js/event-handlers'
import { getSeoConfig } from '~/assets/js/seo-config'

// Enregistrement des composants Chart.js
registerChartComponents()

// Store et références
const csvStore = useCsvStore()
const showStats = ref(false)
const chartRef = ref(null)

// Données calculées et réactives
const stats = computed(() => csvStore.stats)
const chartPeriod = ref('day')
const uniqueEmails = computed(() => csvStore.uniqueEmails)
const filters = ref(getDefaultFilters())
const quickPeriods = getQuickPeriods()
const showDatePicker = ref(false)
const query = ref('')

// Emails filtrés en fonction de la recherche
const filteredEmails = computed(() => filterEmails(uniqueEmails.value, query.value))

// Date formatée pour l'affichage
const formattedDateRange = computed(() => formatDateRange(filters.value.startDate, filters.value.endDate))

// Données du graphique
const lineChartData = computed(() => createLineChartData(csvStore.periodStats, chartPeriod.value, formatDate))
const lineChartOptions = getLineChartOptions()

// Gestionnaires d'événements
function onFileProcessed() {
  showStats.value = true
  setDefaultDateRange()
}

function setQuickPeriod(period: string) {
  const dates = getQuickPeriodDates(period)
  if (dates) {
    filters.value.startDate = dates.startDate
    filters.value.endDate = dates.endDate
    applyFilters()
  }
}

function isActivePeriod(period: string): boolean {
  return checkActivePeriod(period, filters.value.startDate, filters.value.endDate)
}

function resetDateRange() {
  filters.value.startDate = ''
  filters.value.endDate = ''
  applyFilters()
}

function updatePeriod() {
  filters.value.period = chartPeriod.value
  if (!filters.value.startDate || !filters.value.endDate) {
    setDefaultDateRange()
  }
  csvStore.updateFilters(filters.value)
}

function applyFilters() {
  if (!filters.value.startDate || !filters.value.endDate) {
    setDefaultDateRange()
  }
  csvStore.updateFilters(filters.value)
}

function setDefaultDateRange() {
  const defaultRange = getDefaultDateRange(csvStore.rawData)
  if (defaultRange) {
    filters.value.startDate = defaultRange.startDate
    filters.value.endDate = defaultRange.endDate
    chartPeriod.value = defaultRange.period
    filters.value.period = defaultRange.period
    applyFilters()
  }
}

function applyDateSelection() {
  applyFilters()
  showDatePicker.value = false
}

function resetStats() {
  showStats.value = false
  filters.value = getDefaultFilters()
  if (csvStore.rawData.length > 0) {
    setDefaultDateRange()
  }
}

async function downloadPNG() {
  await exportToPNG(chartRef.value)
}

function downloadCSV() {
  const filteredData = csvStore.getFilteredData()
  exportToCSV(filteredData)
}

// Cycle de vie du composant
onMounted(() => {
  // Configurer les gestionnaires d'événements
  const cleanup = setupDatePickerEvents({ showDatePicker })
  
  // Initialiser avec les dates par défaut si des données sont disponibles
  if (csvStore.rawData.length > 0) {
    setDefaultDateRange()
  }
  
  // Cleanup function for onUnmounted
  onUnmounted(cleanup)
})

// Configuration SEO
useHead(getSeoConfig())
</script>

<!-- Le CSS est maintenant importé depuis assets/css/main.css --> 