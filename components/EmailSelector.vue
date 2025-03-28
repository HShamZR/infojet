<template>
  <Combobox v-model="selectedEmail" @update:modelValue="emitChange" as="div" class="relative w-[250px]">
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
</template>

<script setup lang="ts">
import { ref, computed, watch, defineProps, defineEmits } from 'vue'
import { Combobox, ComboboxInput, ComboboxButton, ComboboxOptions, ComboboxOption } from '@headlessui/vue'
import { filterEmails } from '~/assets/js/filter-utils'

const props = defineProps<{
  modelValue: string;
  emails: string[];
}>();

const emit = defineEmits(['update:modelValue', 'change']);

// État local
const selectedEmail = ref(props.modelValue);
const query = ref('');

// Mettre à jour l'état local quand les props changent
watch(() => props.modelValue, (newVal) => {
  selectedEmail.value = newVal;
});

// Filtrer les emails en fonction de la recherche
const filteredEmails = computed(() => filterEmails(props.emails, query.value));

// Émettre les changements
function emitChange(value: string) {
  emit('update:modelValue', value);
  emit('change', value);
}
</script> 