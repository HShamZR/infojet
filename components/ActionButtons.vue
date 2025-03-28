<template>
  <div class="flex items-center gap-4">
    <button
      @click="downloadImage"
      class="h-10 px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700 transition-colors text-sm flex items-center gap-2"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
      Télécharger Image
    </button>
    <button
      @click="downloadCSV"
      class="h-10 px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700 transition-colors text-sm flex items-center gap-2"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      Télécharger CSV
    </button>
    <button
      @click="reset"
      class="h-10 px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700 transition-colors text-sm"
    >
      Analyser un autre fichier
    </button>
  </div>
</template>

<script setup>
const emit = defineEmits(['downloadImage', 'downloadCSV', 'reset']);

function downloadImage() {
  emit('downloadImage');
}

function downloadCSV() {
  emit('downloadCSV');
}

function reset() {
  emit('reset');
}
</script> 