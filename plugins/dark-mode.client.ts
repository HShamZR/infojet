import { watch, onMounted } from 'vue'
import { useThemeStore } from '~/stores/themeStore'

export default defineNuxtPlugin({
  name: 'dark-mode',
  setup() {
    const themeStore = useThemeStore()

    // Fonction pour mettre à jour la classe dark sur l'élément HTML
    const updateDarkMode = () => {
      if (process.client) {
        if (themeStore.isDark) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      }
    }

    // Observer les changements du thème
    watch(() => themeStore.isDark, () => {
      updateDarkMode()
    }, { immediate: true })

    // Appliquer le thème initial
    onMounted(() => {
      themeStore.initTheme()
      updateDarkMode()
    })
  }
}) 