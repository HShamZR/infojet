<template>
  <div class="w-[600px]">
    <div
      class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 relative"
      @dragover.prevent
      @drop.prevent="handleDrop"
    >
      <div class="tex-center" v-if="!isLoading">
        <svg class="w-10 h-10 mb-3 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
        </svg>
        <p class="mb-2 text-sm text-gray-500">
          <span class="font-semibold text-violet-600">Cliquez pour télécharger</span>
        </p>
        <p class="text-xs text-gray-500">ou glissez-déposez CSV uniquement</p>
        <input
          type="file"
          ref="fileInput"
          class="hidden"
          accept=".csv"
          @change="handleFileSelect"
        >
        <button
          @click="$refs.fileInput.click()"
          class="mt-2 px-4 py-2 text-sm font-medium text-violet-600 bg-violet-100 rounded-md hover:bg-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          Sélectionnez un fichier
        </button>
      </div>
      <div v-else class="space-y-4">
        <div class="flex items-center justify-center">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-500"></div>
          <span class="ml-2">{{ csvStore.progress.status }}</span>
        </div>
        
        <div v-if="csvStore.progress.total > 0" class="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            class="bg-violet-600 h-2.5 rounded-full transition-all duration-300" 
            :style="{ width: `${Math.round((csvStore.progress.current / csvStore.progress.total) * 100)}%` }"
          ></div>
        </div>
        
        <p class="text-sm text-gray-600" v-if="csvStore.progress.total > 0">
          {{ csvStore.progress.current }} / {{ csvStore.progress.total }} lignes traitées
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCsvStore } from '~/stores/csvStore'

const emit = defineEmits(['file-processed'])
const csvStore = useCsvStore()
const isLoading = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)

const handleFileSelect = async (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files?.length) {
    await processFile(input.files[0])
  }
}

const handleDrop = async (event: DragEvent) => {
  const files = event.dataTransfer?.files
  if (files?.length) {
    await processFile(files[0])
  }
}

const processFile = async (file: File) => {
  if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
    alert('Veuillez sélectionner un fichier CSV valide')
    return
  }

  isLoading.value = true
  try {
    await csvStore.parseCSV(file)
    emit('file-processed')
  } catch (error) {
    alert('Erreur lors du traitement du fichier CSV')
    console.error(error)
  } finally {
    isLoading.value = false
  }
}
</script> 