<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header avec logo et tagline -->
      <div class="flex flex-col mb-12">
        <div class="flex items-center gap-2">
          <NuxtLink to="/" class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-violet-500 logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
            </svg>
            <h1 class="font-bold text-gray-900 hover:text-violet-600 font-boldonse site-title logo-text">InfoJet</h1>
          </NuxtLink>
        </div>
        <p class="text-gray-500 text-xs mt-1 ml-10">Vos stats Mailjet, claires et lisibles en quelques secondes.</p>
      </div>
    </div>

    <main>
      <NuxtPage />
    </main>

    <!-- Pied de page -->
    <footer class="mt-8 py-4 border-t">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center">
          <div class="text-sm text-gray-500">
            © {{ new Date().getFullYear() }} InfoJet par <a href="https://hichamzian.be" class="text-violet-600 hover:text-violet-700">Hicham Zian</a>
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
  </div>
</template>

<script setup lang="ts">
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Boldonse&display=swap');

.font-boldonse {
  font-family: 'Boldonse', sans-serif;
}

.site-title {
  font-size: 20px;
  letter-spacing: 1px;
  text-transform: lowercase;
}

/* Animations pour l'icône et le texte du logo */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInUp {
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.logo-text {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
  animation-fill-mode: forwards;
}

.logo-icon {
  animation: slideInUp 0.8s ease-out 0.4s forwards;
  opacity: 0;
  animation-fill-mode: forwards;
}
</style>
