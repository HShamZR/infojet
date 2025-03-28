<template>
  <footer class="mt-8 py-4 border-t">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center">
        <div class="text-sm text-gray-500">
          © {{ currentYear }} InfoJet par <a href="https://hichamzian.be" class="text-violet-600 hover:text-violet-700">Hicham Zian</a>
        </div>
        <NuxtLink 
          to="/confidentialite" 
          class="text-sm text-violet-600 hover:text-violet-700"
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