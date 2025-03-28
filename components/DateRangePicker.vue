<template>
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
              v-model="dateRange.startDate"
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
              v-model="dateRange.endDate"
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
</template>

<script setup lang="ts">
import { ref, computed, watch, defineProps, defineEmits } from 'vue';
import { formatDateRange, getQuickPeriodDates, isActivePeriod as checkActivePeriod, getQuickPeriods } from '~/assets/js/date-utils';
import { onClickOutside } from '@vueuse/core';

const props = defineProps<{
  startDate: string;
  endDate: string;
}>();

const emit = defineEmits(['update:startDate', 'update:endDate', 'apply']);

// État local
const showDatePicker = ref(false);
const dateRange = ref({
  startDate: props.startDate,
  endDate: props.endDate
});

// Mettre à jour l'état local quand les props changent
watch(() => props.startDate, (newVal) => {
  dateRange.value.startDate = newVal;
});

watch(() => props.endDate, (newVal) => {
  dateRange.value.endDate = newVal;
});

// Les périodes rapides
const quickPeriods = getQuickPeriods();

// La plage de dates formatée pour l'affichage
const formattedDateRange = computed(() => formatDateRange(dateRange.value.startDate, dateRange.value.endDate));

// Fonctions
function setQuickPeriod(period: string) {
  const dates = getQuickPeriodDates(period);
  if (dates) {
    dateRange.value.startDate = dates.startDate;
    dateRange.value.endDate = dates.endDate;
  }
}

function isActivePeriod(period: string): boolean {
  return checkActivePeriod(period, dateRange.value.startDate, dateRange.value.endDate);
}

function resetDateRange() {
  dateRange.value.startDate = '';
  dateRange.value.endDate = '';
}

function applyDateSelection() {
  emit('update:startDate', dateRange.value.startDate);
  emit('update:endDate', dateRange.value.endDate);
  emit('apply');
  showDatePicker.value = false;
}

// Fermer le sélecteur de date en cliquant à l'extérieur
const datePickerRef = ref(null);
onClickOutside(datePickerRef, () => {
  showDatePicker.value = false;
});
</script> 