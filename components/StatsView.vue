<template>
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
</template>

<script setup>
defineProps({
  stats: {
    type: Object,
    required: true
  }
});
</script> 