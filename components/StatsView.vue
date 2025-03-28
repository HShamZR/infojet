<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 w-full">
    <div class="bg-white dark:bg-navy-900 p-4 rounded-lg border border-gray-200 dark:border-navy-700 shadow-sm">
      <div class="text-gray-500 dark:text-gray-400 text-xs mb-1">{{ stats.totalEmails }} emails au total</div>
      <div class="text-3xl font-bold text-violet-600 dark:text-violet-400 mb-1">{{ ((stats.delivered / stats.totalEmails) * 100).toFixed(2) }}%</div>
      <div class="text-gray-700 dark:text-gray-300 text-sm font-medium">Livrés</div>
      <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ stats.delivered }} Emails</div>
      
      <div class="mt-3 space-y-1 text-xs text-gray-500 dark:text-gray-400">
        <div>{{ ((stats.blocked / stats.totalEmails) * 100).toFixed(2) }}% Bloqués</div>
        <div>{{ ((stats.hardBounce / stats.totalEmails) * 100).toFixed(2) }}% Rebonds permanents</div>
        <div>{{ ((stats.softBounce / stats.totalEmails) * 100).toFixed(2) }}% Rebonds temporaires</div>
        <div>{{ ((stats.retrying / stats.totalEmails) * 100).toFixed(2) }}% Renvoyés</div>
      </div>
    </div>

    <div class="bg-white dark:bg-navy-900 p-4 rounded-lg border border-gray-200 dark:border-navy-700 shadow-sm">
      <div class="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
        {{ ((stats.opened / stats.delivered) * 100).toFixed(2) }}%
      </div>
      <div class="text-gray-700 dark:text-gray-300 text-sm font-medium">Ouverts</div>
      <div class="text-xs text-gray-500 dark:text-gray-400">{{ stats.opened }} Emails</div>
    </div>

    <div class="bg-white dark:bg-navy-900 p-4 rounded-lg border border-gray-200 dark:border-navy-700 shadow-sm">
      <div class="text-3xl font-bold text-violet-600 dark:text-violet-400 mb-1">
        {{ ((stats.clicked / stats.opened) * 100).toFixed(2) }}%
      </div>
      <div class="text-gray-700 dark:text-gray-300 text-sm font-medium">Cliqués</div>
      <div class="text-xs text-gray-500 dark:text-gray-400">{{ stats.clicked }} Emails</div>
    </div>

    <div class="bg-white dark:bg-navy-900 p-4 rounded-lg border border-gray-200 dark:border-navy-700 shadow-sm">
      <div class="text-3xl font-bold text-red-600 dark:text-red-400 mb-1">
        {{ ((stats.unsubscribed / stats.delivered) * 100).toFixed(2) }}%
      </div>
      <div class="text-gray-700 dark:text-gray-300 text-sm font-medium">Désabonnements</div>
      <div class="text-xs text-gray-500 dark:text-gray-400">{{ stats.unsubscribed }} Emails</div>
    </div>

    <div class="bg-white dark:bg-navy-900 p-4 rounded-lg border border-gray-200 dark:border-navy-700 shadow-sm">
      <div class="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-1">
        {{ ((stats.spam / stats.delivered) * 100).toFixed(2) }}%
      </div>
      <div class="text-gray-700 dark:text-gray-300 text-sm font-medium">Spam</div>
      <div class="text-xs text-gray-500 dark:text-gray-400">{{ stats.spam }} Emails</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  stats: {
    type: Object,
    required: true
  }
});
</script> 