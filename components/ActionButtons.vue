<template>
  <div class="flex items-center gap-2">
    <Menu as="div" class="relative">
      <MenuButton class="h-10 px-3 sm:px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700 transition-colors text-sm flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-navy-900">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        <span class="whitespace-nowrap">Télécharger</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </MenuButton>

      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <MenuItems class="absolute left-0 sm:right-0 sm:left-auto mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-navy-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div class="py-1">
            <MenuItem v-slot="{ active }">
              <button
                @click="downloadImage"
                :class="[
                  active ? 'bg-violet-600 text-white' : 'text-gray-700 dark:text-gray-300',
                  'group flex w-full items-center px-4 py-2 text-sm gap-2'
                ]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Image PNG
              </button>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <button
                @click="downloadCSV"
                :class="[
                  active ? 'bg-violet-600 text-white' : 'text-gray-700 dark:text-gray-300',
                  'group flex w-full items-center px-4 py-2 text-sm gap-2'
                ]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Fichier CSV
              </button>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <button
                @click="downloadPDF"
                :class="[
                  active ? 'bg-violet-600 text-white' : 'text-gray-700 dark:text-gray-300',
                  'group flex w-full items-center px-4 py-2 text-sm gap-2'
                ]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Rapport PDF
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>

    <button
      @click="reset"
      class="h-10 px-3 sm:px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700 transition-colors text-sm flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-navy-900"
      :title="'Analyser un autre fichier'"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
      <span class="hidden sm:inline whitespace-nowrap">Analyser un autre fichier</span>
    </button>
  </div>
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'

const emit = defineEmits(['downloadImage', 'downloadCSV', 'downloadPDF', 'reset']);

function downloadImage() {
  emit('downloadImage');
}

function downloadCSV() {
  emit('downloadCSV');
}

function downloadPDF() {
  emit('downloadPDF');
}

function reset() {
  emit('reset');
}
</script> 