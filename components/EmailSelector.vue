<template>
  <Combobox v-model="selectedEmail" @update:modelValue="emitChange" as="div" class="relative w-full sm:w-[250px]">
    <div class="relative">
      <ComboboxInput
        class="w-full flex items-center justify-between px-4 py-2 border border-gray-200 dark:border-navy-700 rounded-lg bg-white dark:bg-navy-800 hover:border-violet-500 focus:outline-none focus:border-violet-500 text-gray-700 dark:text-gray-300"
        :displayValue="(email) => email || 'Tous les expéditeurs'"
        @change="query = $event.target.value"
        placeholder="Rechercher un expéditeur"
      />
      <ComboboxButton class="absolute inset-y-0 right-0 flex items-center px-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
        </svg>
      </ComboboxButton>
    </div>
    <ComboboxOptions class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-navy-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm border border-navy-700">
      <ComboboxOption
        v-slot="{ active, selected }"
        :value="''"
        as="template"
      >
        <li class="relative cursor-pointer select-none py-2 px-4" :class="[active ? 'bg-violet-600 text-white' : 'text-gray-300']">
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
        <li class="relative cursor-pointer select-none py-2 px-4" :class="[active ? 'bg-violet-600 text-white' : 'text-gray-300']">
          <span class="block truncate">{{ email }}</span>
        </li>
      </ComboboxOption>
    </ComboboxOptions>
  </Combobox>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { Combobox, ComboboxInput, ComboboxButton, ComboboxOptions, ComboboxOption } from '@headlessui/vue'
import { filterEmails } from '~/assets/js/filter-utils'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  emails: {
    type: Array,
    default: () => []
  }
});

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
function emitChange(value) {
  emit('update:modelValue', value);
  emit('change', value);
}
</script> 