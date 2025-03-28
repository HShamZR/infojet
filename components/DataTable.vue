<template>
  <div class="mt-8 overflow-hidden">
    <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
      Données brutes
      <span class="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">
        ({{ periodStats.length }} périodes)
      </span>
    </h3>
    
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-navy-700">
        <thead class="bg-gray-50 dark:bg-navy-800">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Date
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Livrés
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Ouverts
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Cliqués
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Rebonds
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Désabonnements
            </th>
          </tr>
        </thead>
        <tbody class="bg-white dark:bg-navy-900 divide-y divide-gray-200 dark:divide-navy-700">
          <tr v-for="stat in formattedStats" :key="stat.date" class="hover:bg-gray-50 dark:hover:bg-navy-800">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
              {{ stat.formattedDate }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              {{ stat.delivered }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              {{ stat.opened }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              {{ stat.clicked }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              {{ stat.bounced }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              {{ stat.unsubscribed }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { formatTableData } from '~/assets/js/table-utils';

const props = defineProps({
  periodStats: {
    type: Array,
    required: true
  },
  periodType: {
    type: String,
    required: true
  }
});

const formattedStats = computed(() => {
  return formatTableData(props.periodStats, props.periodType);
});
</script> 