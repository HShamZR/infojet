<template>
  <div class="max-w-7xl mx-auto p-0">
    <!-- Composant pdfreport caché -->
    <pdfreport
      ref="pdfReportRef"
      :stats="{
        delivered: { count: stats.delivered, rate: Math.round((stats.delivered / stats.totalEmails) * 100) },
        opened: { count: stats.opened, rate: Math.round((stats.opened / stats.totalEmails) * 100) },
        clicked: { count: stats.clicked, rate: Math.round((stats.clicked / stats.totalEmails) * 100) },
        spam: { count: stats.spam, rate: Math.round((stats.spam / stats.totalEmails) * 100) },
        unsub: { count: stats.unsubscribed, rate: Math.round((stats.unsubscribed / stats.totalEmails) * 100) }
      }"
      :chartRef="chartRef"
      :email="filters.email || 'Tous les expéditeurs'"
      :dateRange="`${filters.startDate} → ${filters.endDate}`"
      :periodStats="csvStore.periodStats"
      :periodType="chartPeriod"
      class="hidden"
    />
    
    <!-- Section des statistiques -->
    <div v-if="showStats">
      <!-- Filtres et boutons -->
      <div class="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4 mb-8">
        <DateRangePicker
          v-model:startDate="filters.startDate"
          v-model:endDate="filters.endDate"
          @apply="applyFilters"
          class="w-full lg:w-auto"
        />

        <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <EmailSelector
            v-model="filters.email"
            :emails="uniqueEmails"
            @change="applyFilters"
          />
          <ActionButtons
            @download-image="downloadPNG"
            @downloadCSV="downloadCSV"
            @downloadPDF="downloadPDF"
            @reset="resetStats"
          />
        </div>
      </div>

      <!-- Zone d'export -->
      <div id="export-zone" class="w-full bg-white dark:bg-navy-900 p-4 sm:p-8 rounded-lg border border-gray-200 dark:border-navy-700">
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

        <!-- Tableau de données brutes -->
        <DataTable
          :period-stats="csvStore.periodStats"
          :period-type="chartPeriod"
        />
      </div>
    </div>

    <!-- Message de bienvenue et zone de dépôt de fichier -->
    <div v-if="!showStats" class="min-h-[calc(100vh-20rem)] flex flex-col items-center justify-center p-0">
      <div class="w-full">
        <FileUpload @file-processed="onFileProcessed" />
      </div>
      <WelcomeMessage />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useCsvStore } from '~/stores/csvStore';
import { useHead } from '@unhead/vue';
import pdfreport from '~/components/pdfreport.vue';
import DataTable from '~/components/DataTable.vue';

// Imports des modules JavaScript
import { getDefaultFilters } from '~/assets/js/filter-utils';
import { getDefaultDateRange } from '~/assets/js/date-utils';
import { exportToPNG, exportToCSV } from '~/assets/js/export-utils';
import { getSeoConfig } from '~/assets/js/seo-config';

// Store et références
const csvStore = useCsvStore();
const showStats = ref(false);
const chartRef = ref(null);
const pdfReportRef = ref(null);

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

async function downloadPDF() {
  if (pdfReportRef.value) {
    await pdfReportRef.value.generatePDF();
  }
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