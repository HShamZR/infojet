import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDark: true
  }),
  
  actions: {
    toggleTheme() {
      this.isDark = !this.isDark;
      // Sauvegarder la préférence dans le localStorage
      localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
    },
    
    initTheme() {
      // Récupérer la préférence sauvegardée ou utiliser le thème par défaut (sombre)
      const savedTheme = localStorage.getItem('theme');
      this.isDark = savedTheme ? savedTheme === 'dark' : true;
    }
  }
}); 