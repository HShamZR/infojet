<template>
  <div class="bg-white p-6 mt-8 w-full">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-lg font-medium">Graphique</h3>
      <select 
        v-model="period" 
        @change="changePeriod"
        class="h-10 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md"
      >
        <option value="day">Jours</option>
        <option value="week">Semaines</option>
        <option value="month">Mois</option>
      </select>
    </div>
    <div class="h-[400px]">
      <Line
        v-if="chartData"
        :data="chartData"
        :options="chartOptions"
        ref="chartRef"
      />
    </div>

    <!-- En-tête avec la période et l'expéditeur -->
    <div v-if="startDate || email" class="mt-8 text-center text-sm text-gray-600">
      <div v-if="startDate" class="mb-1">
        <span class="font-medium">Période :</span> {{ formattedDateRange }}
      </div>
      <div v-if="email" class="mb-1">
        <span class="font-medium">Expéditeur :</span> {{ email }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { Line } from 'vue-chartjs';
import { registerChartComponents, getLineChartOptions, createLineChartData } from '~/assets/js/chart-config';
import { formatDateRange, formatDate } from '~/assets/js/date-utils';

// Register Chart.js components
registerChartComponents();

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

// Données du graphique
const chartData = computed(() => createLineChartData(props.periodStats, period.value, formatDate));
const chartOptions = getLineChartOptions();

// Méthodes
function changePeriod() {
  emit('update:periodValue', period.value);
}

// Exposer la référence du graphique
defineExpose({
  chartRef
});
</script> 