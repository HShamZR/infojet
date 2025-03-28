<template>
  <div class="hidden">
    <!-- Composant caché qui sera utilisé uniquement pour la génération du PDF -->
  </div>
</template>

<script setup lang="ts">
import jsPDF from 'jspdf';
import { formatTableData } from '~/assets/js/table-utils';

interface Props {
  stats: {
    delivered: { count: number; rate: number };
    opened: { count: number; rate: number };
    clicked: { count: number; rate: number };
    spam: { count: number; rate: number };
    unsub: { count: number; rate: number };
  };
  chartRef: any;
  email: string;
  dateRange: string;
  periodStats: any[];
  periodType: string;
}

const props = defineProps<Props>();

const generatePDF = async () => {
  // Attendre que le graphique soit complètement rendu
  await new Promise(resolve => setTimeout(resolve, 500));

  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  // Configuration de la police pour les caractères spéciaux
  pdf.setFont("helvetica");
  
  // Fonction pour ajouter le footer sur chaque page
  const addFooter = () => {
    pdf.setFillColor(249, 250, 251);
    pdf.rect(0, 277, 210, 20, 'F');
    pdf.setTextColor(107, 114, 128);
    pdf.setFontSize(9);
    pdf.text('Généré avec InfoJet - https://infojet.hichamzian.be', 15, 288);
  };
  
  // En-tête avec titre et style moderne
  pdf.setFillColor(139, 92, 246); // Violet InfoJet
  pdf.rect(0, 0, 210, 30, 'F');
  
  // Titre avec police Inter à gauche
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(24);
  pdf.setFont("helvetica", "bold");
  pdf.text('InfoJet', 15, 20);
  
  // Sous-titre en blanc à droite
  pdf.setFontSize(12);
  pdf.setFont("helvetica", "normal");
  const subTitle = 'Rapport de statistiques';
  const subTitleWidth = pdf.getTextWidth(subTitle);
  pdf.text(subTitle, 195 - subTitleWidth, 20);

  // Informations de période et expéditeur avec meilleur espacement
  const infoY = 50;
  pdf.setTextColor(107, 114, 128);
  pdf.setFontSize(10);
  pdf.text('PÉRIODE ANALYSÉE', 15, infoY);
  pdf.text('EXPÉDITEUR', 15, infoY + 20);
  
  pdf.setTextColor(17, 24, 39);
  pdf.setFontSize(12);
  pdf.text(props.dateRange, 15, infoY + 8);
  pdf.text(props.email, 15, infoY + 28);

  // Stats globales avec meilleur design
  const { delivered, opened, clicked, spam, unsub } = props.stats;
  const statsY = 90;
  
  // Fonction helper pour dessiner une stat avec son background
  const drawStat = (
    label: string,
    value: number,
    rate: number | null,
    x: number,
    y: number,
    color: [number, number, number]
  ) => {
    // Rectangle de fond gris clair
    pdf.setFillColor(249, 250, 251);
    pdf.rect(x, y - 8, 35, 35, 'F');
    
    // Valeur en grand avec la couleur
    pdf.setTextColor(color[0], color[1], color[2]);
    pdf.setFontSize(16);
    pdf.text(value.toLocaleString('fr-FR'), x + 5, y + 5);
    
    // Label et taux en plus petit
    pdf.setTextColor(107, 114, 128);
    pdf.setFontSize(8);
    pdf.text(label, x + 5, y + 15);
    if (rate !== null) {
      pdf.setFontSize(9);
      pdf.text(`${rate}%`, x + 5, y + 22);
    }
  };

  // Dessiner les stats en 5 colonnes
  const colWidth = 35;
  const colSpacing = 5;
  const startX = 15;
  
  // Toutes les colonnes sur une ligne
  drawStat('livrés', delivered.count, delivered.rate, startX, statsY, [139, 92, 246]); // Violet
  drawStat('ouverts', opened.count, opened.rate, startX + colWidth + colSpacing, statsY, [16, 185, 129]); // Vert
  drawStat('cliqués', clicked.count, clicked.rate, startX + (colWidth + colSpacing) * 2, statsY, [139, 92, 246]); // Violet
  drawStat('désabonnés', unsub.count, null, startX + (colWidth + colSpacing) * 3, statsY, [239, 68, 68]); // Rouge
  drawStat('spam', spam.count, null, startX + (colWidth + colSpacing) * 4, statsY, [239, 68, 68]); // Rouge

  // Graphique avec meilleure intégration
  try {
    if (props.chartRef?.chartRef?.chart) {
      // Désactiver les animations pour la capture
      const chart = props.chartRef.chartRef.chart;
      const originalAnimation = chart.options.animation;
      chart.options.animation = false;
      chart.update('none');

      // Attendre que le graphique soit stable
      await new Promise(resolve => setTimeout(resolve, 100));

      // Capturer le graphique
      const canvas = chart.canvas;
      const chartImage = canvas.toDataURL('image/png', 1.0);
      
      // Ajouter au PDF avec un fond blanc et une bordure gris clair
      pdf.setFillColor(255, 255, 255);
      pdf.rect(15, 150, 180, 80, 'F');
      pdf.setDrawColor(229, 231, 235);
      pdf.rect(15, 150, 180, 80, 'S');
      pdf.addImage(chartImage, 'PNG', 15, 150, 180, 80);

      // Restaurer les animations
      chart.options.animation = originalAnimation;
      chart.update();
    } else {
      console.error('Référence du graphique non trouvée');
      pdf.text('[Graphique non disponible]', 15, 150);
    }
  } catch (error) {
    console.error('Erreur génération graphique :', error);
    pdf.text('[Graphique non disponible]', 15, 150);
  }

  // Tableau de données avec meilleur design
  if (props.periodStats && props.periodStats.length > 0) {
    pdf.addPage();
    const startY = 30;
    
    // Titre du tableau
    pdf.setFillColor(139, 92, 246);
    pdf.rect(0, 0, 210, 30, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(20);
    pdf.text('Données brutes', 15, 20);
    
    // En-têtes du tableau
    const headers = ['Date', 'Livrés', 'Ouverts', 'Cliqués', 'Rebonds', 'Désabonnements'];
    const formattedData = formatTableData(props.periodStats, props.periodType);
    
    // Configuration du tableau
    pdf.setFontSize(10);
    let y = startY + 20;
    const rowHeight = 8;
    const colWidths = [45, 27, 27, 27, 27, 27];
    const startX = 15;
    
    // En-têtes avec design moderne
    pdf.setFillColor(243, 244, 246);
    pdf.rect(startX, y - 5, 180, 10, 'F');
    pdf.setTextColor(107, 114, 128);
    headers.forEach((header, i) => {
      let x = startX + colWidths.slice(0, i).reduce((a, b) => a + b, 0);
      pdf.text(header, x, y);
    });
    
    y += 10;
    
    // Lignes de données avec alternance de couleurs plus subtile
    pdf.setTextColor(55, 65, 81);
    formattedData.forEach((row, index) => {
      if (y > 270) {
        pdf.addPage();
        y = 20;
      }
      
      if (index % 2 === 0) {
        pdf.setFillColor(249, 250, 251);
        pdf.rect(startX, y - 5, 180, 8, 'F');
      }
      
      pdf.text(row.formattedDate, startX, y);
      pdf.text(row.delivered, startX + colWidths[0], y);
      pdf.text(row.opened, startX + colWidths[0] + colWidths[1], y);
      pdf.text(row.clicked, startX + colWidths[0] + colWidths[1] + colWidths[2], y);
      pdf.text(row.bounced, startX + colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3], y);
      pdf.text(row.unsubscribed, startX + colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3] + colWidths[4], y);
      
      y += rowHeight;
    });

    // Ajouter le footer sur chaque page
    for (let i = 1; i <= pdf.getNumberOfPages(); i++) {
      pdf.setPage(i);
      addFooter();
    }
  } else {
    // Si pas de tableau, ajouter le footer sur la première page
    addFooter();
  }

  // Sauvegarde du PDF
  pdf.save(`rapport-${props.email}-${Date.now()}.pdf`);
};

// Exposer la méthode pour pouvoir l'appeler depuis le parent
defineExpose({ generatePDF });
</script>

<style scoped>
.btn {
  transition: background-color 0.2s ease;
}
</style>
  