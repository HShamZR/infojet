<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">Politique de Confidentialité</h1>
    
    <div class="prose dark:prose-invert prose-violet max-w-none">
      <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100 mt-8 mb-4">Traitement des Données</h2>
      <p class="mb-4 text-gray-600 dark:text-gray-300">
        InfoJet est un outil d'analyse qui traite vos données Mailjet de manière temporaire et locale :
      </p>
      <ul class="list-disc pl-6 mb-6 text-gray-600 dark:text-gray-300">
        <li>Aucune donnée n'est stockée sur nos serveurs</li>
        <li>Le traitement est effectué entièrement dans votre navigateur</li>
        <li>Les données sont effacées automatiquement à la fermeture de votre navigateur</li>
        <li>Nous n'avons accès à aucune information de votre compte Mailjet</li>
      </ul>

      <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100 mt-8 mb-4">Cookies et Traceurs</h2>
      <p class="mb-4 text-gray-600 dark:text-gray-300">
        InfoJet ne collecte aucune donnée personnelle et n'utilise aucun cookie de tracking :
      </p>
      <ul class="list-disc pl-6 mb-6 text-gray-600 dark:text-gray-300">
        <li>Pas de cookies publicitaires</li>
        <li>Pas de traceurs d'analyse</li>
        <li>Pas de stockage local de données</li>
      </ul>

      <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100 mt-8 mb-4">Sécurité</h2>
      <p class="mb-4 text-gray-600 dark:text-gray-300">
        La sécurité de vos données est notre priorité :
      </p>
      <ul class="list-disc pl-6 mb-6 text-gray-600 dark:text-gray-300">
        <li>Traitement local uniquement</li>
        <li>Aucune transmission de données vers des serveurs externes</li>
        <li>Les fichiers CSV ne quittent jamais votre navigateur</li>
      </ul>

      <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100 mt-8 mb-4">Contact</h2>
      <p class="mb-4 text-gray-600 dark:text-gray-300">
        Pour toute question concernant notre politique de confidentialité, vous pouvez nous contacter à l'adresse suivante : <a class="text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300 transition-colors" href="mailto:me@hichamzian.be">me@hichamzian.be</a>
      </p>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Politique de Confidentialité - InfoJet',
  meta: [
    { name: 'description', content: 'Politique de confidentialité d\'InfoJet - Découvrez comment nous protégeons vos données.' }
  ]
})
</script> 