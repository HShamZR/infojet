<template>
  <footer class="py-4">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col sm:flex-row justify-between items-center gap-2">
        <div class="text-sm text-gray-500 dark:text-gray-400">
          © {{ currentYear }} InfoJet par <a href="https://hichamzian.be" class="text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors">Hicham Zian</a> Designed & developed with ❤️.
        </div>
        <NuxtLink 
          to="/confidentialite" 
          class="text-sm text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors"
        >
          Politique de confidentialité
        </NuxtLink>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Calcule l'année en cours pour le copyright
const currentYear = new Date().getFullYear();
</script> 