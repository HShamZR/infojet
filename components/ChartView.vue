<template>
  <div class="bg-white dark:bg-navy-900 p-6 mt-8 w-full rounded-lg border border-gray-200 dark:border-navy-700 shadow-sm">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <h3 class="text-lg font-medium text-gray-800 dark:text-white">Graphique</h3>
      <select 
        v-model="period" 
        @change="changePeriod"
        class="h-10 px-4 py-2 text-gray-700 dark:text-gray-300 bg-white dark:bg-navy-800 border-gray-300 dark:border-navy-700 rounded-md focus:border-violet-500 focus:ring-violet-500"
      >
        <option value="day">Jours</option>
        <option value="week">Semaines</option>
        <option value="month">Mois</option>
      </select>
    </div>
    <div class="h-[300px] sm:h-[400px]">
      <Line
        v-if="chartData"
        :data="chartData"
        :options="chartOptions"
        ref="chartRef"
      />
    </div>

    <!-- En-tête avec la période et l'expéditeur -->
    <div v-if="startDate || email" class="mt-8 text-center">
      <div v-if="startDate" class="mb-1 text-sm text-gray-600 dark:text-gray-400">
        <span class="font-medium text-gray-700 dark:text-gray-300">Période :</span> {{ formattedDateRange }}
      </div>
      <div v-if="email" class="mb-1 text-sm text-gray-600 dark:text-gray-400">
        <span class="font-medium text-gray-700 dark:text-gray-300">Expéditeur :</span> {{ email }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { Line } from 'vue-chartjs';
import { registerChartComponents, getLineChartOptions, createLineChartData } from '~/assets/js/chart-config';
import { formatDateRange, formatDate } from '~/assets/js/date-utils';
import { useThemeStore } from '~/stores/themeStore';
import { storeToRefs } from 'pinia';

// Register Chart.js components
registerChartComponents();

const themeStore = useThemeStore();
const { isDark } = storeToRefs(themeStore);

const props = defineProps({
  periodStats: {
    type: Object,
    required: true
  },
  periodValue: {
    type: String,
    required: true
  },
  startDate: {
    type: String,
    default: ''
  },
  endDate: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:periodValue']);

// État local
const period = ref(props.periodValue);
const chartRef = ref(null);

// Surveillance des changements de période
watch(() => props.periodValue, (newValue) => {
  period.value = newValue;
});

// Données formatées pour l'affichage
const formattedDateRange = computed(() => formatDateRange(props.startDate, props.endDate));

// Configuration du thème pour le graphique
const chartOptions = computed(() => ({
  ...getLineChartOptions(),
  scales: {
    x: {
      grid: {
        color: isDark.value ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.1)',
      },
      ticks: {
        color: isDark.value ? '#9CA3AF' : '#4B5563'
      }
    },
    y: {
      grid: {
        color: isDark.value ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.1)',
      },
      ticks: {
        color: isDark.value ? '#9CA3AF' : '#4B5563'
      }
    }
  },
  plugins: {
    legend: {
      labels: {
        color: isDark.value ? '#9CA3AF' : '#4B5563'
      }
    }
  }
}));

// Données du graphique avec couleurs adaptées au thème
const chartData = computed(() => {
  const data = createLineChartData(props.periodStats, period.value, formatDate);
  if (data && isDark.value) {
    data.datasets = data.datasets.map(dataset => ({
      ...dataset,
      borderColor: dataset.borderColor.replace('500', '400'),
      backgroundColor: dataset.backgroundColor.replace('500', '400')
    }));
  }
  return data;
});

// Méthodes
function changePeriod() {
  emit('update:periodValue', period.value);
}

// Exposer la référence du graphique
defineExpose({
  chartRef
});
</script> 