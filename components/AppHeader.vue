<template>
  <div class="w-full">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div class="flex items-center gap-2">
          <NuxtLink to="/" class="flex items-center gap-2 group">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-violet-400 dark:text-violet-400 text-violet-600 group-hover:text-violet-500 dark:group-hover:text-violet-300 transition-colors logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
            </svg>
            <h1 class="font-bold text-gray-900 dark:text-white text-gray-900 group-hover:text-violet-500 dark:group-hover:text-violet-300 transition-colors text-xl sm:text-2xl font-boldonse site-title logo-text">InfoJet</h1>
          </NuxtLink>
        </div>
        <div class="flex items-center gap-4">
          <p class="text-gray-600 dark:text-gray-400 text-gray-600 text-xs sm:text-sm mt-2 sm:mt-0">Vos stats Mailjet, claires et lisibles en quelques secondes.</p>
          <button 
            @click="toggleTheme" 
            class="p-2 rounded-lg dark:hover:bg-navy-700 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500"
            :title="isDark ? 'Passer en mode clair' : 'Passer en mode sombre'"
          >
            <!-- Icône soleil pour le mode clair -->
            <svg 
              v-if="isDark" 
              xmlns="http://www.w3.org/2000/svg" 
              class="h-5 w-5 text-gray-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <!-- Icône lune pour le mode sombre -->
            <svg 
              v-else 
              xmlns="http://www.w3.org/2000/svg" 
              class="h-5 w-5 text-gray-600" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useThemeStore } from '~/stores/themeStore';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

const themeStore = useThemeStore();
const { isDark } = storeToRefs(themeStore);

function toggleTheme() {
  themeStore.toggleTheme();
}

onMounted(() => {
  themeStore.initTheme();
});
</script> 