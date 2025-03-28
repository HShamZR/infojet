<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
    
    <!-- Section des statistiques -->
    <div v-if="showStats">
      <!-- Filtres et boutons -->
      <div class="flex justify-between items-center mb-8">
        <DateRangePicker
          v-model:startDate="filters.startDate"
          v-model:endDate="filters.endDate"
          @apply="applyFilters"
        />

        <div class="flex items-center gap-4">
          <EmailSelector
            v-model="filters.email"
            :emails="uniqueEmails"
            @change="applyFilters"
          />
          <ActionButtons
            @download-image="downloadPNG"
            @download-csv="downloadCSV"
            @reset="resetStats"
          />
        </div>
      </div>

      <!-- Zone d'export -->
      <div id="export-zone" class="w-full bg-white p-8 rounded-lg shadow-xl">
        <!-- Statistiques détaillées -->
        <StatsView :stats="stats" />

        <!-- Graphique -->
        <ChartView
          :period-stats="csvStore.periodStats"
          v-model:period-value="chartPeriod"
          :start-date="filters.startDate"
          :end-date="filters.endDate"
          :email="filters.email"
          ref="chartRef"
        />
      </div>
    </div>

    <!-- Message de bienvenue et zone de dépôt de fichier -->
    <div v-if="!showStats" class="min-h-[calc(100vh-20rem)] flex flex-col items-center justify-center p-0">
      <div class="w-[600px]">
        <FileUpload @file-processed="onFileProcessed" />
      </div>
      <WelcomeMessage />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useCsvStore } from '~/stores/csvStore';
import { useHead } from '@unhead/vue';

// Imports des modules JavaScript
import { getDefaultFilters } from '~/assets/js/filter-utils';
import { getDefaultDateRange } from '~/assets/js/date-utils';
import { exportToPNG, exportToCSV } from '~/assets/js/export-utils';
import { getSeoConfig } from '~/assets/js/seo-config';

// Store et références
const csvStore = useCsvStore();
const showStats = ref(false);
const chartRef = ref(null);

// Données calculées et réactives
const stats = computed(() => csvStore.stats);
const chartPeriod = ref('day');
const uniqueEmails = computed(() => csvStore.uniqueEmails);
const filters = ref(getDefaultFilters());

// Gestionnaires d'événements
function onFileProcessed() {
  showStats.value = true;
  setDefaultDateRange();
}

function applyFilters() {
  if (!filters.value.startDate || !filters.value.endDate) {
    setDefaultDateRange();
  }
  filters.value.period = chartPeriod.value;
  csvStore.updateFilters(filters.value);
}

function setDefaultDateRange() {
  const defaultRange = getDefaultDateRange(csvStore.rawData);
  if (defaultRange) {
    filters.value.startDate = defaultRange.startDate;
    filters.value.endDate = defaultRange.endDate;
    chartPeriod.value = defaultRange.period;
    filters.value.period = defaultRange.period;
    applyFilters();
  }
}

function resetStats() {
  showStats.value = false;
  filters.value = getDefaultFilters();
  if (csvStore.rawData.length > 0) {
    setDefaultDateRange();
  }
}

async function downloadPNG() {
  if (chartRef.value) {
    await exportToPNG(chartRef.value.chartRef);
  }
}

function downloadCSV() {
  const filteredData = csvStore.getFilteredData();
  exportToCSV(filteredData);
}

// Surveiller les changements de période du graphique
watch(chartPeriod, (newVal) => {
  filters.value.period = newVal;
  csvStore.updateFilters(filters.value);
});

// Cycle de vie du composant
onMounted(() => {
  // Initialiser avec les dates par défaut si des données sont disponibles
  if (csvStore.rawData.length > 0) {
    setDefaultDateRange();
  }
});

// Configuration SEO
useHead(getSeoConfig());
</script>

<!-- Le CSS est maintenant importé depuis assets/css/main.css --> 