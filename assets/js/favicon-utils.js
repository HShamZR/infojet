/**
 * Utilitaire pour gérer le favicon SVG
 * Cette fonction injecte le favicon SVG directement dans le head du document pour une compatibilité maximale
 */
export function injectFavicon() {
  // Crée un élément link pour le favicon
  const faviconLink = document.createElement('link');
  faviconLink.rel = 'icon';
  faviconLink.type = 'image/svg+xml';
  
  // Utilise l'avion en papier en SVG encodé en base64
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>`;
  const encodedSvg = btoa(svgContent);
  faviconLink.href = `data:image/svg+xml;base64,${encodedSvg}`;
  
  // Supprime les favicons existants
  const existingIcons = document.querySelectorAll('link[rel*="icon"]');
  existingIcons.forEach(icon => icon.parentNode?.removeChild(icon));
  
  // Ajoute le nouveau favicon
  document.head.appendChild(faviconLink);
} 