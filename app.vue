<template>
  <div class="min-h-screen flex flex-col bg-gray-50 dark:bg-navy-900">
    <AppHeader />
    
    <main class="flex-1 container mx-auto px-4 sm:px-6 lg:px-8">
      <NuxtPage />
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { injectFavicon } from '~/assets/js/favicon-utils';
import { useThemeStore } from '~/stores/themeStore';
import { storeToRefs } from 'pinia';

const themeStore = useThemeStore();
const { isDark } = storeToRefs(themeStore);

// Injecte le favicon au chargement de l'application
onMounted(() => {
  injectFavicon();
  themeStore.initTheme();
});
</script>

<style>
@import '~/assets/css/typography.css';
@import '~/assets/css/animations.css';
</style>
