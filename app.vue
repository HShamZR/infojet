<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader />
    
    <main>
      <NuxtPage />
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { injectFavicon } from '~/assets/js/favicon-utils';

// Injecte le favicon au chargement de l'application
onMounted(() => {
  injectFavicon();
});
</script>

<style>
@import '~/assets/css/typography.css';
@import '~/assets/css/animations.css';
</style>
