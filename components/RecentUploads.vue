<template>
  <div v-if="recentFiles.length > 0" class="mt-8">
    <h3 class="text-lg font-medium text-gray-800 dark:text-white mb-4">Fichiers récents</h3>
    <div class="space-y-3">
      <div v-for="file in recentFiles" :key="file.id" 
        class="bg-white dark:bg-navy-900 p-4 rounded-lg border border-gray-200 dark:border-navy-700 flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <div class="text-violet-600 dark:text-violet-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <div class="text-sm font-medium text-gray-900 dark:text-white">{{ file.name }}</div>
            <div class="text-xs text-gray-500 dark:text-gray-400">
              Importé le {{ formatDate(file.date) }} • {{ formatSize(file.size) }}
            </div>
          </div>
        </div>
        <div class="flex items-center space-x-2">
          <button @click="loadFile(file)" 
            class="text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300 p-2 rounded-full hover:bg-violet-50 dark:hover:bg-navy-800 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
          <button @click="deleteFile(file.id)"
            class="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-2 rounded-full hover:bg-red-50 dark:hover:bg-navy-800 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useCsvStore } from '~/stores/csvStore';

const csvStore = useCsvStore();
const emit = defineEmits(['file-processed']);

interface RecentFile {
  id: string;
  name: string;
  date: number;
  size: number;
  content: string;
}

const recentFiles = ref<RecentFile[]>([]);

// Charger les fichiers récents depuis le localStorage
onMounted(() => {
  const savedFiles = localStorage.getItem('recentFiles');
  if (savedFiles) {
    recentFiles.value = JSON.parse(savedFiles);
  }
});

// Ajouter un nouveau fichier à la liste des fichiers récents
const addRecentFile = (file: File, content: string) => {
  const newFile: RecentFile = {
    id: Date.now().toString(),
    name: file.name,
    date: Date.now(),
    size: file.size,
    content: content
  };

  recentFiles.value.unshift(newFile);
  
  // Garder seulement les 3 fichiers les plus récents
  if (recentFiles.value.length > 3) {
    recentFiles.value.pop();
  }

  // Sauvegarder dans le localStorage
  localStorage.setItem('recentFiles', JSON.stringify(recentFiles.value));
};

// Charger un fichier récent
const loadFile = async (file: RecentFile) => {
  try {
    await csvStore.parseCSV(file.content);
    emit('file-processed');
  } catch (error) {
    console.error('Erreur lors du chargement du fichier:', error);
  }
};

// Supprimer un fichier récent
const deleteFile = (id: string) => {
  recentFiles.value = recentFiles.value.filter(file => file.id !== id);
  localStorage.setItem('recentFiles', JSON.stringify(recentFiles.value));
};

// Formater la date
const formatDate = (timestamp: number) => {
  return new Date(timestamp).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Formater la taille du fichier
const formatSize = (bytes: number) => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

defineExpose({ addRecentFile });
</script> 