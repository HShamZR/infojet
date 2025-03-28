import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDark: false
  }),
  
  actions: {
    toggleTheme() {
      if (process.client) {
        this.isDark = !this.isDark;
        // Sauvegarder la préférence dans le localStorage
        localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
      }
    },
    
    initTheme() {
      if (process.client) {
        try {
          // Récupérer la préférence sauvegardée ou utiliser la préférence système
          const savedTheme = localStorage.getItem('theme');
          if (savedTheme) {
            this.isDark = savedTheme === 'dark';
          } else {
            // Utiliser la préférence système si aucune préférence n'est sauvegardée
            const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
            this.isDark = !prefersLight;
            // Sauvegarder la préférence initiale
            localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
          }
        } catch (error) {
          console.error('Erreur lors de l\'accès au localStorage:', error);
        }
      }
    }
  }
}); 